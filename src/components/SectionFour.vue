<template>
<div class="max-w-screen-xl mx-auto py-20 my-20 lg:my-40">
  <!-- Hero Banner con overlay -->
  <div class="relative rounded-2xl overflow-hidden my-10 shadow-2xl">
    <img
      class="w-full h-[400px] md:h-[500px] object-cover"
      src="/public/imagenes/bgindexone.jpg"
      alt="Voluntarios de Causa Viva trabajando en comunidad"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40 rounded-xl"></div>
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6 md:px-20"
    >
      <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        Transformamos realidades a través del <span class="text-yellow-400">voluntariado comprometido</span>
      </h2>
      <p class="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
        Conectamos corazones solidarios con comunidades que necesitan apoyo
      </p>
      <div class="flex items-center justify-center w-fit group">
        <a
          href="#nuestra-historia"
          class="flex items-center cursor-pointer text-neutral-900 text-md font-bold transition-all bg-gradient-to-bl from-yellow-400 to-yellow-500 hover:from-yellow-400/90 hover:to-yellow-500/90 rounded-full px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
        >
          <span class="transition duration-300">Conoce nuestra historia</span>
          <div
            class="transition-transform transform duration-300 ml-2 group-hover:translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        </a>
      </div>
    </div>
  </div>

  <!-- Sección de valores diferenciales -->
  <div class="grid md:grid-cols-2 gap-12 my-20 px-5">
    <!-- Item 1 - Misión -->
    <div class="flex flex-col sm:flex-row gap-6 group">
      <div class="relative flex-shrink-0">
        <img
          class="w-full sm:w-40 h-40 rounded-xl object-cover shadow-md group-hover:shadow-lg transition duration-300"
          src="/public/imagenes/ban1.jpg"
          alt="Equipo de voluntarios en acción"
        />
        <div class="absolute -inset-2 border-2 border-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Nuestra Misión</h3>
        <p class="text-gray-600">
          Crear puentes solidarios entre quienes pueden ayudar y quienes más lo necesitan. En Causa Viva movilizamos más de <strong>500 voluntarios anuales</strong> en proyectos de impacto social directo, especialmente enfocados en adultos mayores y comunidades vulnerables.
        </p>
      </div>
    </div>

    <!-- Item 2 - Metodología -->
    <div class="flex flex-col sm:flex-row gap-6 group">
      <div class="relative flex-shrink-0">
        <img
          class="w-full sm:w-40 h-40 rounded-xl object-cover shadow-md group-hover:shadow-lg transition duration-300"
          src="/public/imagenes/ban2.jpg"
          alt="Taller educativo con adultos mayores"
        />
        <div class="absolute -inset-2 border-2 border-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Cómo lo hacemos</h3>
        <p class="text-gray-600">
          Trabajamos con un modelo de <strong>intervención integral</strong>:
          Diagnóstico comunitario, diseño participativo de soluciones y seguimiento continuo. Nuestros programas en casas de reposo incluyen terapia recreativa, acompañamiento emocional y mejora de espacios físicos.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script></script>
