import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="pt-14 lg:pt-0 lg:ml-64 min-h-screen w-full">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
