<template>
  <div class="flex flex-col items-center w-full">
    <!-- Contenedor de fondo que ocupa todo el ancho -->
    <div class="w-full relative bg-center bg-cover">
      <img
        src="/imagenes/pasillo.jpg"  
        alt="Fondo de voluntariado"
        class="w-full h-full object-cover absolute inset-0 z-0"
      />
      <div class="absolute inset-0 bg-black opacity-60 z-1"></div>
      
      <!-- Contenido centrado con max-width -->
      <div class="max-w-screen-xl mx-auto relative z-10">
        <!-- Navbar -->
        <nav class="flex items-center justify-between w-full px-4 lg:px-0 pt-10">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <Causa class="text-gray-100" width="100" /> <!-- Cambié a texto claro -->
          </div>

          <!-- Menú central -->
          <div class="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center">
            <ul class="flex space-x-6 text-white"> <!-- Texto blanco para mejor contraste -->
              <!-- Menu items -->
            </ul>
          </div>

          <!-- Iconos -->
          <div class="flex items-center space-x-4">
            <button
              @click="toggleMenu"
              class="lg:hidden text-white focus:outline-none"
            >
              <span class="sr-only">Abrir menú</span>
              <i class="fas fa-bars text-xl"></i>
            </button>
            <div class="text-white hover:text-amber-300 transition cursor-pointer ml-4">
              <i class="fas fa-user-circle text-2xl"></i>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="text-center py-20 px-6 w-full">
          <div class="max-w-3xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-semibold leading-tight mb-4 text-white">
              Explora oportunidades de <span class="text-amber-400">voluntariado</span>
            </h1>
            <p class="mt-4 text-lg text-gray-200 mb-8"> <!-- Texto gris claro -->
              Inspira, colabora y haz la diferencia :D
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import Causa from "../icons/Causa.vue";

export default {
  name: "SectionOne",
  components: {
    Causa,
  },
  created() {
    document.documentElement.classList.add("light");
    document.documentElement.setAttribute("dir", "ltr");

    var bodyElement = document.body;
    bodyElement.classList.add(
      "font-rubik",
      "text-base",
      "text-slate-900",
      "dark:text-white",
      "dark:bg-slate-900"
    );

    window.addEventListener("scroll", (ev) => {
      ev.preventDefault();
      const navbar = document.getElementById("navbar");
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        navbar.classList.add("is-sticky");
      } else {
        navbar.classList.remove("is-sticky");
      }

      var mybutton = document.getElementById("back-to-top");
      if (mybutton != null) {
        if (
          document.body.scrollTop > 500 ||
          document.documentElement.scrollTop > 500
        ) {
          mybutton.classList.add("block");
          mybutton.classList.remove("hidden");
        } else {
          mybutton.classList.add("hidden");
          mybutton.classList.remove("block");
        }
      }
    });
  },
  methods: {
    ScrollIntoView(elem) {
      this.active = elem;
      let ele = document.querySelector(elem);
      ele.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    toggleMenu() {
      let ele = document.getElementById("menu-collapse");
      ele.classList.toggle("hidden");
    },
  },
};
</script>
