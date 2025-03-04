import Welcome from "../pages/Admin/Welcome";
import Stats from "../pages/Admin/Stats";
import Add from "../pages/Admin/Add";
import Alert from "./_test/Alert";
import Table from "../pages/Admin/Table";
function Admin() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Welcome />
        <Alert />
        <div className="flex justify-center">
          <span className="bg-customWhite flex items-center justify-center p-4 rounded-md border-2 border-customBlack text-red-600 font-bold w-1/2">
            Toto zatím slouží jako testovací prostředí
          </span>
        </div>

        <div className="flex gap-5 w-full">
          <Stats />
          <Add />
        </div>

        <Table />
      </div>
    </>
  );
}

export default Admin;
