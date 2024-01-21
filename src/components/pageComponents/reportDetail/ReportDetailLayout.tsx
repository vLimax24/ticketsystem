import React, { ReactNode } from "react";

interface ReportDetailLayoutProps {
  children: ReactNode;
}

const ReportDetailLayout: React.FC<ReportDetailLayoutProps> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4 col-start-2 ">{children}</div>
    </div>
  );
};

export default ReportDetailLayout;
