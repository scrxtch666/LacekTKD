function LatestEvents() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/events/latest")
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Načítám...</div>;

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map((event) => (
          <EventCardLatest key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default LatestEvents;