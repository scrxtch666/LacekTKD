import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isSameDay } from 'date-fns';
import { cs } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';



function Calendar({ tournaments, onDateSelect }) {
  const [selected, setSelected] = useState(new Date());

  // Extrahujeme dny, kdy se konají turnaje, pro zvýraznění v kalendáři
  const eventDays = tournaments.map(t => new Date(t.start_date));
  console.log("Dny s akcí:", eventDays);

  const handleSelect = (day) => {
    if (day) {
      setSelected(day);
      onDateSelect(day); // Tímto pošleš informaci pravé straně
    }
  };

  return (
    <div className="bg-customWhite p-6 rounded-2xl shadow-md w-full border border-[#e8dfd3] h-64">
      {/* Horní info sekce */}
     

      <div className="mb-2">
        <h2 className="text-lg font-bold text-gray-700">
          {format(selected, 'MMMM yyyy', { locale: cs })}
        </h2>
      </div>

      {/* Samotný kalendář */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        locale={cs}
        modifiers={{ hasEvent: eventDays }}
        // Definice stylů pro dny s akcí (tečka nebo barva)
        modifiersStyles={{
          hasEvent: { 
            fontWeight: 'bold', 
            color: '#16a34a', // Zelená barva pro dny s turnajem
            borderBottom: '2px solid #16a34a' 
          },
          selected: {
            backgroundColor: '#16a34a',
            color: 'white'
          }
        }}
        styles={{
          caption: { display: 'none' }, // Schováme defaultní hlavičku, máme vlastní
          head_cell: { color: '#9ca3af', fontWeight: '500', fontSize: '0.8rem' },
          button: { borderRadius: '8px' }
        }}
        className="mx-auto"
      />

      {/* Legenda (volitelné) */}
      <div className="mt-6 pt-4 border-t border-[#e8dfd3] flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-customGreen"></div>
        <span className="text-xs text-gray-600 font-medium">Dny s turnajem / akcí</span>
      </div>
    </div>
  );
}

export default Calendar;