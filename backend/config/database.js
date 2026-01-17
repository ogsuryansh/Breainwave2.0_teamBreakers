import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        // Set connection timeout and other options
        const options = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, options)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
        return conn
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`)
        console.warn('⚠️  Server will continue running without database connection.')
        console.warn('⚠️  Some features may not work until DB is connected.')

        // Don't exit the process - allow server to run without DB
        // This is useful for development and debugging
        return null
    }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...')
})

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message)
})
