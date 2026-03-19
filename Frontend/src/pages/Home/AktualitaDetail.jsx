import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function AktualitaDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Načítám...</div>;
  if (!event) return <div>Aktualita nenalezena</div>;

  // Přihlášený závodníci, fotografie, text, výsledky...

  return (
    <>
      <div className="devider">{event.title}</div>

      <div className="grid gap-5 lg:grid-cols-2 md:grid-cols-1">
        <div className="card">
          <img
            src={event.photo}
            alt={event.title}
            className="w-52 rounded-2xl"
          />
          <p className="text-customGreen">{event.date_start}</p>
          <p>{event.body}</p>
          <p>napsal: {event.author}</p>
        </div>
      </div>
    </>
  );
}

export default AktualitaDetail;
