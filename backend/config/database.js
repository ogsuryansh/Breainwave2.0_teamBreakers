import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`)
        // Don't exit - let the app run without DB for basic features
        throw error
    }
}
