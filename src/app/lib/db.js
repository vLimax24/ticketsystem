import mongoose from 'mongoose'

const connect = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log('Connected to MongoDB')
        }
        
    } catch (error) {
        console.log(error)
    }
}

export default connect;