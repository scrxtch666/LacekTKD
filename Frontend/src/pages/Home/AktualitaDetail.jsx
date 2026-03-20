import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Images } from "lucide-react";

// Lightbox pouze pro zobrazení – bez mazání
const PhotoGallery = ({ photos }) => {
  const [lightbox, setLightbox] = useState(null);

  if (!photos?.length) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_path}
            alt=""
            onClick={() => setLightbox(photo.img_path)}
            className="h-24 w-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
          />
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
};

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

  return (
    <>
      <div className="devider">{event.title}</div>

      <div className="grid gap-5 lg:grid-cols-2 md:grid-cols-1">
        <div className="card space-y-3">
          {event.photo && (
            <img
              src={event.photo}
              alt={event.title}
              className="w-full rounded-2xl object-cover"
            />
          )}
          <p className="text-customGreen">{event.date_start}</p>
          <p>{event.body}</p>
          {event.author && (
            <p className="text-sm text-gray-400">napsal: {event.author}</p>
          )}
        </div>
      </div>

      {event.photos?.length > 0 && (
        <div className="card mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Images size={15} /> Fotogalerie
          </p>
          <PhotoGallery photos={event.photos} />
        </div>
      )}
    </>
  );
}

export default AktualitaDetail;