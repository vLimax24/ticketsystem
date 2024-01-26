// models/AuditLog.js

import mongoose from 'mongoose';

let AuditLogModel:any;

try {
  // Try to get the existing model
  AuditLogModel = mongoose.model('AuditLog');
} catch (e) {
  // If the model doesn't exist, create a new one
  const auditLogSchema = new mongoose.Schema({
    reportId: { type: String, required: true },
    actions: { type: Array, required: true },
    timestamp: { type: String, required: true },
  });

  AuditLogModel = mongoose.model('AuditLog', auditLogSchema);
}

export default AuditLogModel;
