import { useState, useEffect } from "react";
import { Check, X, User, Mail } from "lucide-react";
import config from "../../../config";

const API = config.API_URL;
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function AdminTreninky() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(`${API}/api/trainings`, { headers: authHeader() })
      .then((res) => res.json())
      .then((data) => {
        setTrainings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Načítám...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="devider">Tréninky</div>

      <div className="card flex flex-col gap-2">
        {trainings.map((training, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-2 text-sm"
          >
            <span className="whitespace-nowrap">Den: 
              {training.day_start} - {training.day_end}
            </span>
            <span className="text-xs font-medium text-gray-500">
             Skupina: {training.type}
            </span>
            <span className="whitespace-nowrap">
            Začátek  {training.time_start} Konec: {training.time_end}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTreninky;
