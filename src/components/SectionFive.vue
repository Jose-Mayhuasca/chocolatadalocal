<template>
<div class="relative">
  <section
    class="py-9 lg:py-35 w-full table relative bg-center bg-cover"
    :style="{ backgroundImage: `url('/causaviva/imagenes/pasillo.jpg')` }"
    id="home"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="max-w-screen-xl mx-auto relative">
      <div
        class="flex flex-col lg:flex-row w-full h-full items-stretch gap-10 lg:gap-40"
      >
        <!-- Columna Izquierda -->
        <div class="w-full lg:w-1/2 flex flex-col items-center">
          <div class="w-full h-full p-6 bg-white rounded-2xl flex flex-col">
            <div class="w-full flex justify-between mb-14">
              <div class="text-gray-700 text-md font-medium">Mayo 2025</div>
              <div class="text-gray-700 text-md font-medium">Voluntariado Social</div>
            </div>
            <div class="w-full rounded-xl">
              <img
                class="h-55 w-100 object-cover rounded-xl"
                src="/public/imagenes/visita.jpg"
                alt="Voluntarios de Causa Viva compartiendo con adultos mayores"
              />
            </div>

            <div class="w-full flex flex-col">
              <div class="w-full text-gray-700 text-sm ml-2 mt-1">
                Foto: Voluntarios en Casa de Reposo "Los Jardines"
              </div>
              <div class="text-gray-800 text-4xl font-bold mt-10">
                Día de Alegría y Compañía
              </div>
              <div class="w-full h-[2px] bg-gray-800 my-2"></div>
              <div class="flex flex-col justify-between items-end">
                <div class="w-100 text-gray-700 text-md my-10 font-medium">
                  Nuestros voluntarios llevaron música, juegos recreativos y conversación 
                  a los residentes de la casa de reposo. Compartimos historias, bailes 
                  tradicionales y ayudamos a revitalizar sus espacios comunes con pintura 
                  y jardinería terapéutica.
                </div>
                <div class="flex items-center justify-end w-full">
                  <div
                    class="group flex items-center cursor-pointer text-gray-800 text-md font-bold transition hover:text-gray-700"
                  >
                    <span class="transition duration-300">Ver galería completa</span>
                    <div
                      class="transition-transform transform duration-300 ml-1 group-hover:translate-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 22 22"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha -->
        <div
          class="w-full lg:w-1/2 flex flex-col justify-end lg:justify-end py-28 px-6"
        >
          <div class="mt-auto">
            <div class="w-full text-white text-3xl font-bold">
              Causa Viva: Transformando vidas a través del voluntariado
            </div>
            <div class="w-full text-white text-lg my-10 font-medium">
              En nuestra última visita, llevamos esperanza y compañía a adultos 
              mayores que necesitan atención especial. Cada sonrisa cuenta y cada 
              momento compartido crea un impacto duradero.
            </div>
            <div class="text-white text-4xl font-bold">
              Nuestro impacto en números
            </div>
            <div class="w-full h-[2px] bg-white my-2"></div>
            <div class="flex justify-start items-center w-full mt-12 gap-10">
              <div class="flex flex-col items-start font-bold">
                <div class="text-white text-5xl count-up" data-target="320">0+</div>
                <div class="text-white text-md">Horas de voluntariado</div>
              </div>
              <div class="flex flex-col items-start font-bold">
                <div class="text-white text-5xl count-up" data-target="120">0+</div>
                <div class="text-white text-md">Adultos beneficiados</div>
              </div>
              <div class="flex flex-col items-start font-bold">
                <div class="text-white text-5xl count-up" data-target="74">0+</div>
                <div class="text-white text-md">Voluntarios participantes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div></template>

<script>
// No importes imágenes de public

export default {
  name: "SectionFive",
  // Elimina la propiedad 'pasillo' del data
  mounted() {
    const countUpElements = document.querySelectorAll('.count-up');
    
    const animateCountUp = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 4000; // 4 segundos
      const stepTime = 30; // ms por paso
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        element.textContent = Math.floor(current) + '+';
      }, stepTime);
    };

    // Animar al hacer scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countUpElements.forEach(el => observer.observe(el));
  }
};
</script>
