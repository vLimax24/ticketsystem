interface ReportModel {
    _id: string;
    email: string;
    // Add more fields as needed
}

// Type for an array of ReportModel instances
type ReportType = ReportModel[];
export type { ReportType };