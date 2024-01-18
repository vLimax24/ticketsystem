import React, { ReactNode } from "react";

interface ReportDetailLayoutProps {
  children: ReactNode;
}

const ReportDetailLayout: React.FC<ReportDetailLayoutProps> = ({
  children,
}) => {
  return (
    <div className="grid grid-col-4 gap-4">
        {children}
    </div>
  );
};

export default ReportDetailLayout;
