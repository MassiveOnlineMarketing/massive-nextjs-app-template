import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="theme-bg-w h-screen w-full grid items-center">{children}</div>;
};

export default AuthLayout;
