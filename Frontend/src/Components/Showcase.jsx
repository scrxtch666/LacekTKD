import { useState } from "react";



function Showcase() {
  const [count, setCount] = useState(0);

  return (
    <>
      
       <div class="w-full max-h-96 object-cover h-96 overflow-hidden rounded-2xl bg-customBlack">
        
        <img src="../src/assets/Showcase/main.jpg" alt="" class="w-full h-fit brightness-50 opacity-75 -z-20" />
        <figcaption class="absolute px-4 text-lg text-white top-32">
    <div>
      <p class="text-3xl">Sportovní klub</p>
        <p class="text-5xl font-mono">Taekwondo <span class="text-customGreen text-5xl font-mono">Lacek</span></p>
        <p>Taekwondo - rychleji, výš, silněji, ...</p>
        </div>
  </figcaption>
       </div>
       
       


      
    </>
  );
}

export default Showcase;
