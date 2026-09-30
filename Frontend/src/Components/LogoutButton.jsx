import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    navigate("/", { replace: true });

    window.location.reload();
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-8 h-8 logout-button text-red-700 bg-red-200 font-medium rounded-full p-2 flex items-center justify-center border border-red-400"
    >
     <LogOut/>
    </button>
  );
};

export default LogoutButton;