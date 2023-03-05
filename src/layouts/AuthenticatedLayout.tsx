import { FC } from "react";
import Navbar from "~/components/Navbar";

const AuthenticatedLayout: FC<{ children: any }> = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
