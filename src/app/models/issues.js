import mongoose, { Schema } from 'mongoose'

const issueSchema = new Schema({
    projectId: {
        type: Number,
        required: [true, 'Project ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    relevance: {
        type: String,
        required: [true, 'Relevance is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const Report = mongoose.models.Report || mongoose.model('Report', issueSchema)

export default Report