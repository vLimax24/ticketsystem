import mongoose, { Schema, ObjectId } from 'mongoose'

interface ReportModel {
    _id: ObjectId;
    projectId: number;
    name: string;
    email: string;
    senderEmail: string;
    status: string;
    description: string;
    relevance: string;
    date: Date;
}

const issueSchema = new Schema<ReportModel>({
    projectId: {
        type: Number,
        required: [true, 'Project ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    senderEmail: {
        type: String,
        required: [false, 'Email is required'],
    },
    status: {
        type: String,
        default: "PENDING",
        required: [true, 'Status is required']
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

const Report = mongoose.models.Report || mongoose.model<ReportModel>('Report', issueSchema)

export default Report