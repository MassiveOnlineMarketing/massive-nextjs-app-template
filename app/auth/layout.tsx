import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-full grid items-center dark:bg-p-1100">{children}</div>;
};

export default AuthLayout;
