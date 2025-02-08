import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Kontrola, zda je reference k divu platná
    if (!mapRef.current) return;

    // Funkce pro inicializaci mapy
    const initializeMap = () => {
      // Kontrola, zda je API načtené
      if (!window.SMap) {
        console.error('Mapy API není načtené');
        return;
      }

      // Inicializace mapy
      const center = window.SMap.Coords.fromWGS84(15.2179083, 49.4278672);
      const map = new window.SMap(mapRef.current, center, 15);
      
      // Přidání základních ovládacích prvků
      map.addDefaultLayer(window.SMap.DEF_BASE).enable();
      map.addDefaultControls();

      // Přidání vrstvy pro značky
      const layer = new window.SMap.Layer.Marker();
      map.addLayer(layer);
      layer.enable();

      // Přidání značky na mapu
      const marker = new window.SMap.Marker(center, "marker");
      layer.addMarker(marker);
    };

    // Kontrola, zda už je API načtené
    if (window.SMap) {
      initializeMap();
    } else {
      // Načtení Mapy.cz API
      const script = document.createElement("script");
      script.src = "https://api.mapy.cz/loader.js";
      script.async = true;
      script.onload = () => {
        window.Loader.async = true;
        window.Loader.load(null, { suggest: true }, initializeMap);
      };
      document.body.appendChild(script);
    }

    // Cleanup funkce
    return () => {
      const mapScript = document.querySelector('script[src="https://api.mapy.cz/loader.js"]');
      if (mapScript) {
        mapScript.remove();
      }
    };
  }, [mapRef]); // Závislost na mapRef

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 bg-gray-200" 
      style={{
        minHeight: '400px',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}
    />
  );
};

export default Map;