import { useState, useEffect } from "react";
import { authService } from "../../utils/auth"; // Import auth service

function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Přidán loading stav

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        // Předpokládám, že authService je naimportovaný odjinud
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Chyba při načítání uživatele", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []); // Přidáno prázdné pole závislostí, aby se useEffect spustil jen jednou

  // Ošetření stavu, kdy se data ještě načítají nebo uživatel není přihlášen
  if (loading) return <div>Načítám...</div>;
  if (!user) return null;

  return (
    <div className="bg-customWhite h-8 flex justify-between content-center p-6 rounded-md font-bold w-full">
      <div className="justify-center align-middle content-center flex items-center">
        {/* Použití optional chaining (?.) pro jistotu */}
        <span className="">Zdravíme, {user.login}! 👋</span>
      </div>
      <div className="justify-center align-middle content-center gap-2 flex items-center">
        <span className="text-customGreen"></span>
      </div>
    </div>
  );
}

export default Welcome;
