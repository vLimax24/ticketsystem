import React from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";


const AuditLogDownload = ({ reportId }) => {
  const handleDownload = async () => {
    try {
      // Fetch audit log data with the matching reportId from the backend API
      const response = await axios.get(`/api/auditLog/${reportId}`);
      const auditLogData = response.data;

      // Flatten the nested structure
      const flattenedData = auditLogData.flatMap(item => {
        return item.actions.map(action => ({
          _id: item._id,
          reportId: item.reportId,
          action: action.action,
          timestamp: action.timestamp,
        }));
      });

      // Convert the flattened data to Excel format using XLSX
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Audit Log');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Create a Blob and trigger file download using FileSaver
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'audit_log.xlsx');
    } catch (error) {
      console.error('Error downloading audit log:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="w-full flex justify-center items-center px-5 py-10"
      variant={'outline'}
    >
      <FileSpreadsheet size={20} className="mr-5" />
      <p className="font-semibold">Download Audit Log</p>
    </Button>
  );
};

export default AuditLogDownload;
