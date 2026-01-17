import https from 'https';
import util from 'util';

const ENDPOINT_ID = 'predefined-openai-gpt4.1-nano';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        console.log(`💬 Chat request: ${message.substring(0, 50)}...`);

        const API_KEY = process.env.ONDEMAND_API_KEY;

        if (!API_KEY) {
            console.error("❌ ONDEMAND_API_KEY is missing!");
            return res.json({
                success: true,
                reply: "I'm here to help! I can assist you with:\n\n" +
                    "✅ Course recommendations\n" +
                    "✅ Career advice\n" +
                    "✅ Study tips\n" +
                    "✅ Roadmap guidance\n" +
                    "✅ Tech trends\n\n" +
                    "What would you like to know?"
            });
        }

        const prompt = `You are a helpful AI assistant for "Campus Hustle" - a platform that helps students with academic and career planning. 

User question: ${message}

Provide a helpful, concise, and friendly response. Keep it under 150 words. Be encouraging and supportive. If asked about campus hustle features, mention roadmap generation, personalized learning paths, and career guidance.`;

        const requestData = JSON.stringify({
            query: prompt,
            endpointId: ENDPOINT_ID,
            responseMode: "sync",
            maxTokens: 300
        });

        const options = {
            hostname: 'api.on-demand.io',
            path: `/chat/v1/sessions/${Date.now()}/query`, // Use dynamic session ID
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Content-Type': 'application/json',
                'Content-Length': requestData.length
            }
        };

        const apiResponse = await new Promise((resolve, reject) => {
            const apiReq = https.request(options, (apiRes) => {
                let body = '';

                apiRes.on('data', (chunk) => {
                    body += chunk;
                });

                apiRes.on('end', () => {
                    if (apiRes.statusCode !== 200) {
                        console.error(`API failed with ${apiRes.statusCode}`);
                        reject(new Error('API request failed'));
                        return;
                    }

                    try {
                        const response = JSON.parse(body);
                        if (response.data && response.data.answer) {
                            resolve(response.data.answer.trim());
                            console.warn("API returned invalid structure:", JSON.stringify(response));
                            reject(new Error('Invalid API response structure'));
                        }
                    } catch (error) {
                        console.error("JSON Parse Error:", util.inspect(error));
                        reject(error);
                    }
                });
            });

            apiReq.on('error', reject);
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
