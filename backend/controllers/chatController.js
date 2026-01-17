import https from 'https';
import util from 'util';

const ENDPOINT_ID = 'predefined-openai-gpt4.1-nano';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || message.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        console.log(`💬 Chat request: ${message.substring(0, 50)}...`);
        const API_KEY = process.env.ONDEMAND_API_KEY;

        if (!API_KEY) {
            return res.json({
                success: true,
                reply: "I'm here to help! (API Key missing) Ask me about roadmaps."
            });
        }

        // STEP 1: Create a Session
        const sessionOptions = {
            hostname: 'api.on-demand.io',
            path: '/chat/v1/sessions',
            method: 'POST',
            headers: { 'apikey': API_KEY }
        };

        const sessionId = await new Promise((resolve, reject) => {
            const req = https.request(sessionOptions, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    if (res.statusCode === 201 || res.statusCode === 200) {
                        try {
                            const data = JSON.parse(body);
                            resolve(data.data.id); // Extract Session ID
                        } catch (e) { reject(new Error("Failed to parse session ID")); }
                    } else {
                        reject(new Error(`Session creation failed: ${res.statusCode} ${body}`));
                    }
                });
            });
            req.on('error', reject);
            req.end();
        });

        console.log(`✅ Session Created: ${sessionId}`);

        // STEP 2: Query the Session
        const requestData = JSON.stringify({
            query: message,
            endpointId: ENDPOINT_ID,
            responseMode: "sync",
            maxTokens: 300
        });

        const options = {
            hostname: 'api.on-demand.io',
            path: `/chat/v1/sessions/${Date.now()}/query`,
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestData)
            }
        };

        console.log(`📡 Sending request to: https://${options.hostname}${options.path}`);

        const apiResponse = await new Promise((resolve, reject) => {
            const apiReq = https.request(options, (apiRes) => {
                let body = '';

                apiRes.on('data', (chunk) => {
                    body += chunk;
                });

                apiRes.on('end', () => {
                    if (apiRes.statusCode !== 200) {
                        console.error(`❌ API Failed. Status: ${apiRes.statusCode}`);
                        try {
                            const errorBody = JSON.parse(body);
                            console.error("❌ Error Details:", util.inspect(errorBody, { depth: null, colors: true }));
                        } catch (e) {
                            console.error("❌ Raw Error Body:", body);
                        }
                        reject(new Error(`API request failed with status ${apiRes.statusCode}`));
                        return;
                    }

                    try {
                        const response = JSON.parse(body);
                        if (response.data && response.data.answer) {
                            resolve(response.data.answer.trim());
                        } else {
                            console.warn("⚠️ Valid Status 200 but invalid structure:", JSON.stringify(response));
                            if (response.message) console.warn("Msg:", response.message);
                            resolve("I'm having a bit of trouble understanding, could you rephrase?"); // Fallback instead of error
                        }
                    } catch (error) {
                        console.error("❌ JSON Parse Error:", util.inspect(error));
                        reject(error);
                    }
                });
            });

            apiReq.on('error', (e) => {
                console.error("❌ Network/Request Error:", e);
                reject(e);
            });

            apiReq.write(requestData);
            apiReq.end();
        });

        res.json({
            success: true,
            reply: apiResponse
        });

    } catch (error) {
        console.error('❌ Chat error:', error);

        // Fallback response
        res.json({
            success: true,
            reply: "I apologize, but I'm having trouble processing that right now. " +
                "I can help you with roadmap planning, course selection, and career guidance. " +
                "Try asking about your study path or career goals! 🚀"
        });
    }
};
