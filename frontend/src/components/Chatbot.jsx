import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '🤖 Hi bruh! I\'m your Campus Hustle AI assistant. How can I help you today? Ask me about roadmaps, courses, or anything else! 🚀' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-greeting on first visit
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('chatbot_visited');
        if (!hasVisited) {
            const timer = setTimeout(() => {
                setShowWelcome(true);
                setTimeout(() => {
                    setShowWelcome(false);
                }, 5000);
            }, 2000);

            sessionStorage.setItem('chatbot_visited', 'true');
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '❌ Sorry, I encountered an error. Please try again.'
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Connection error. Please check your internet and try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <style>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-wave {
                    animation: wave 2s infinite;
                    transform-origin: 70% 70%;
                    display: inline-block;
                }
            `}</style>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {/* Welcome Bubble */}
                <div className={`w-72 bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-white rounded-2xl px-4 py-3 shadow-2xl shadow-[#7000FF]/50 transition-all duration-500 ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl flex-shrink-0 inline-block animate-wave">🤖</span>
                        <p className="text-sm font-medium">Hi bruh! Need help? I'm here for you!</p>
                    </div>
                    <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-[#00D1FF] to-[#7000FF] transform rotate-45"></div>
                </div>

                {/* Chat Window */}
                <div className={`w-80 sm:w-96 bg-[#0A0A0B]/95 backdrop-blur-xl border border-[#7000FF]/30 rounded-2xl shadow-2xl shadow-[#7000FF]/20 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                    }`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#7000FF] to-[#00D1FF] p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                <span className="inline-block animate-wave">🤖</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-white font-bold text-sm">Campus AI</h3>
                                <p className="text-white/80 text-xs">Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors flex-shrink-0"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-3 py-2 break-words ${msg.role === 'user'
                                    ? 'bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-white'
                                    : 'bg-[#1A1A1E] text-gray-200 border border-gray-800'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#1A1A1E] rounded-2xl px-4 py-2 border border-gray-800">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                        <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-800">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-[#1A1A1E] border border-gray-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-[#00D1FF] transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-white px-3 py-2 rounded-xl hover:shadow-lg hover:shadow-[#7000FF]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 bg-gradient-to-r from-[#7000FF] to-[#00D1FF] rounded-full shadow-2xl shadow-[#7000FF]/50 flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
                >
                    <span className="text-3xl inline-block">{isOpen ? '✕' : <span className="inline-block animate-wave">🤖</span>}</span>
                    {/* Notification Dot */}
                    {!isOpen && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A0A0B] animate-pulse"></div>
                    )}
                </button>
            </div>
        </>
    );
};

export default Chatbot;
