import { useState, useEffect } from "react";
import { authService } from "../../utils/auth";
import { use } from "react";

function AdminMe() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Načítám...</div>;
  if (!user) return <div>Nepodařilo se načíst uživatele</div>;

  return (
    <div className="space-y-4">
      <div className="devider">Můj účet</div>

      <div className="bg-customWhite rounded-lg shadow p-6 space-y-3">
        <div>
          <span className="text-sm text-gray-500">Login</span>
          <p className="font-semibold">{user.login}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Profilová fotografie</span>
          <img src={user.img_path} alt={user.login} />
        </div>
        <div>
          <span className="text-sm text-gray-500">Aktuální váha</span>
          <p className="font-semibold">{user.actual_weight_category} Kg</p>
        </div>
         <div>
          <span className="text-sm text-gray-500">Celé jméno</span>
          <p className="font-semibold">{user.name} {user.surname} </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Narození</span>
          <p className="font-semibold">{user.birth} </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Telefon</span>
          <p className="font-semibold">{user.phone}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Email</span>
          <p className="font-semibold">{user.email || "Neuvedeno"}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Role</span>
          <p className="font-semibold">{user.role}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminMe;