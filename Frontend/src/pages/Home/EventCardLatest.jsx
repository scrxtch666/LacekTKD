import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventCardLatest = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/events/latest")
      .then((response) => response.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setNews([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>;
  }

  if (news.length === 0) {
    return (
      <div className="card w-full p-10 text-center border-2 border-dashed">
        <p className="text-gray-500">
          Momentálně nejsou naplánovány žádné akce.
        </p>
      </div>
    );
  }

  return (
    <>
      {news.map((event) => (
        <div
          key={event.id}
          onClick={() => navigate(`/aktualita/${event.id}`)}
          className="max-w-sm overflow-hidden bg-pink-50 rounded-2xl shadow-xl"
        >
          <div className="relative">
            {event.cover_photo ? (
              <img
                src={event.cover_photo}
                alt={event.title}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-customGreen flex items-center justify-center text-white text-2xl font-bold">
                {event.title}
              </div>
            )}
          </div>

          <div className="px-4 py-2 bg-customWhite">
            <div className="">
              <span className="text-customGreen text-sm font-medium flex justify-between gap-5">
                <p className="text-customBlack">{event.title}</p>
                <p>{event.date_start}</p>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCardLatest;
