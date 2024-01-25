import React, { ReactNode } from "react";

interface ReportDetailLayoutProps {
  children: ReactNode;
}

const ReportDetailLayout: React.FC<ReportDetailLayoutProps> = ({
  children,
}) => {
  return (
    <div className="gap-4">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ReportDetailLayout;
