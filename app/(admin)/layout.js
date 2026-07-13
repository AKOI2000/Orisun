import { Toaster } from "react-hot-toast";
import { DashboardProvider } from "@/app/_context/DashboardContext";
import Sidebar from "@/app/_components/Sidebar";
import DashboardHead from "@/app/_components/DashboardHead";
import "@/app/index.css";

export default function AdminLayout({ children }) {
  return (
    <>
       <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "1.6rem",
            padding: "1.2rem 2rem",
            minWidth: "300px",
          },
        }}
      />
      <DashboardProvider>
        <div className="admin-shell">
          <Sidebar />
          <div className="admin-shell__body">
            <DashboardHead />
            <main className="admin-shell__main">{children}</main>
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
