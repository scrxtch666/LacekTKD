function Showcase() {
  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-96 overflow-hidden rounded-2xl bg-customBlack">
        <img
          src="../src/assets/Showcase/main.jpg"
          alt="Showcase background"
          className="w-full h-full object-cover brightness-50 opacity-75"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="px-4 md:px-8 lg:px-12 text-white">
            <p className="text-xl md:text-2xl lg:text-3xl mb-2 font-sans">
              Sportovní klub
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-mono">
              Taekwondo <span className="text-customGreen font-sans">Lacek</span>
            </p>
            <p className="text-base md:text-lg mt-2 font-sans">
              Taekwondo - rychleji, výš, silněji, ...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showcase;
