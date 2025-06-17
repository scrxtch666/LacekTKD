import Carousel from "./Carousel";
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* fixed to dá přes celou obrazovku, ale není to až dole */}
      <footer class="bg-white dark:bg-customBlack text-black w-full z-20 bottom-0 start-0 border-b border-gray-200 dark:border-gray-600 mt-5">
        <div class="mx-auto w-full max-w-screen-xl p-6 py-6 lg:py-8">
          <h3 class="text-customWhite font-bold opacity-45 flex justify-center ">
            SPONZOŘI
          </h3>
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0"></div>
            <script src="https://cdn.jsdelivr.net/npm/flowbite@2.3.0/dist/flowbite.min.js"></script>
            {/* Přehlídka sponorů ve footeru */}
            <Carousel />
            {/*  */}
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {currentYear}
              <a href="/" class="hover:underline font-bold px-1">
                scrxtch
              </a>
              all rights reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="https://www.facebook.com/profile.php?id=100063625778484"
                target="_blank"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.3.0/dist/flowbite.min.js"></script>
      <script>
        document.getElementById("year").textContent = new Date().getFullYear();
      </script>
    </>
  );
}

export default Footer;
