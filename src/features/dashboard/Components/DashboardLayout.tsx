import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <div>
      <div className=" px-3 md:px-0">{children}</div>
    </div>
  );
}

export default DashboardLayout;
