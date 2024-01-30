import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        role: {
            type: String,
            default: "USER",
            required: [true, 'Role is required']
        },
        provider: {
            type: String,
            required: [true, 'Provider is required']
        },
    },
    { timestamps: true}
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User