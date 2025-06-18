<template>
<div class="max-w-screen-xl mx-auto">  
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    rel="stylesheet"
  />
  <div class="">
    <!-- Filtros -->
    <div class="py-8 px-4 md:px-10 bg-gray-50 rounded-xl"> <!-- Contenedor con fondo y bordes redondeados -->
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Filtrar voluntariados</h3> <!-- Título de sección -->
      <div class="flex flex-wrap gap-4 items-end"> <!-- Alineación vertical al fondo -->
        <!-- Selectores con etiquetas -->
        <div class="flex-1 min-w-[180px]">
          <label class="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
          <select class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <!-- Opciones... -->
          </select>
        </div>
        
        <!-- Repetir para otros selectores -->

        <!-- Campo de búsqueda mejorado -->
        <div class="flex-1 min-w-[250px]">
          <label class="block text-sm font-medium text-gray-600 mb-1">Buscar</label>
          <div class="relative">
            <input
              type="text"
              placeholder="Ej: Educación, Lima..."
              class="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- Botón con icono -->
        <button class="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition flex items-center gap-2 h-[42px]">
          <i class="fas fa-filter"></i> Filtrar
        </button>
      </div>
    </div>
  </div>

  <!-- Listado de Voluntariados -->
  <div class="py-8 px-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Voluntariados disponibles
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18">
      <!-- Cards generadas dinámicamente -->
      <div v-for="vol in voluntariados" :key="vol.id" class="overflow-hidden">
        <div class="relative">
          <div class="relative overflow-hidden rounded-lg">
            <img
              :src="vol.imagen"
              alt="Voluntariado"
              class="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
            <div
              class="absolute top-2 right-2 bg-teal-400/80 text-white text-xs font-semibold px-2 py-1 rounded-md"
            >
              {{ vol.detalles.modalidad }}
            </div>
          </div>
        </div>
        <div class="pt-2">
          <div class="flex items-center">
            <span class="font-semibold text-sm text-blue-500">{{
              vol.organizacion.nombre
            }}</span>
            <span v-if="vol.organizacion.verificada" class="">
              <!-- Verificación -->
              <svg
                class="w-4 h-4 ml-1 text-teal-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 my-1 leading-tight">
            {{ vol.titulo }}
          </h3>
          <p class="text-sm text-gray-500 line-clamp-2">
            {{ vol.descripcion }}
          </p>

          <div
            class="pt-4 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-500"
          >
            <span class="flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ formatDateRange(vol.fechas.inicio, vol.fechas.fin) }}
            </span>
            <span class="flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ vol.detalles.ubicacion }}
            </span>
          </div>

          <div class="pt-4">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span
                >{{ vol.estadisticas.voluntarios_inscritos }} voluntarios</span
              >
              <span>
                {{
                  Math.round(
                    (vol.estadisticas.voluntarios_inscritos /
                      vol.estadisticas.voluntarios_requeridos) *
                      100
                  )
                }}% completado
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div
                class="bg-linear-to-bl from-teal-400/90 to-teal-500 h-1.5 rounded-full"
                :style="{
                  width:
                    (vol.estadisticas.voluntarios_inscritos /
                      vol.estadisticas.voluntarios_requeridos) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
          </div>

          <div class="flex items-center flex-wrap justify-between py-3 ">
            <RouterLink
              to="/portafolio/detalle"
              class="block text-neutral-800 text-sm hover:text-amber-500 "
            >
              <span class="flex items-end justify-end group hover:cursor-pointer">
                <span class="group-hover:text-blue-500 hover:underline hover:decoration duration-200">Ver detalles</span>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right transition-transform duration-200 ease-in-out group-hover:translate-x-1 group-hover:stroke-blue-500">
                  <path d="m9 18 6-6-6-6"/>
                </svg> -->
              </span>
            </RouterLink>
            <RouterLink 
              to="/portafolio/detalle">
              <button
                class="cursor-pointer bg-linear-to-bl from-yellow-400/90 to-yellow-500 hover:bg-gradient-to-bl hover:from-yellow-400/80 hover:to-yellow-500/90 text-ntral-800 text-sm  px-6 py-2 rounded-lg transition"
              >
                Inscribirse
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Paginación -->
  <div class="px-4 py-8">
    <div class="flex justify-center">
      <nav class="inline-flex rounded-md shadow">
        <a
          href="#"
          class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          <i class="fas fa-chevron-left"></i>
        </a>
        <a
          href="#"
          class="px-3 py-2 border-t border-b border-gray-300 bg-white text-amber-500 font-medium"
          >1</a
        >
        <a
          href="#"
          class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >2</a
        >
        <a
          href="#"
          class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >3</a
        >
        <a
          href="#"
          class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          <i class="fas fa-chevron-right"></i>
        </a>
      </nav>
    </div>
  </div>
</div>



</template>

<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      voluntariados: [
        {
          id: 1,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/ban1.jpg",
          organizacion: {
            nombre: "Unicef",
            verificada: true,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Presencial",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 50,
            voluntarios_inscritos: 42,
          },
          enlace: "/voluntariado/1",
        },
        {
          id: 2,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/bgindexone.jpg",
          organizacion: {
            nombre: "Proa",
            verificada: true,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Hibrido",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 30,
            voluntarios_inscritos: 20,
          },
          enlace: "/voluntariado/2",
        },
        {
          id: 3,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/crea2.jpg",
          organizacion: {
            nombre: "Crea+",
            verificada: true,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Remoto",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 40,
            voluntarios_inscritos: 35,
          },
          enlace: "/voluntariado/3",
        },
        {
          id: 4,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/pasillo.jpg",
          organizacion: {
            nombre: "Destellos",
            verificada: false,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Presencial",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 50,
            voluntarios_inscritos: 42,
          },
          enlace: "/voluntariado/4",
        },
        {
          id: 5,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/ban2.jpg",
          organizacion: {
            nombre: "Destellos",
            verificada: false,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Remoto",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 30,
            voluntarios_inscritos: 26,
          },
          enlace: "/voluntariado/5",
        },
        {
          id: 6,
          titulo: "Apoyo escolar en zonas rurales",
          imagen: "/causaviva/imagenes/ban1.jpg",
          organizacion: {
            nombre: "ONG Astaletum",
            verificada: false,
          },
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.",
          fechas: {
            inicio: "2025-03-15",
            fin: "2025-06-15",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Lima, Perú",
            modalidad: "Hibrido",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 30,
            voluntarios_inscritos: 26,
          },
          enlace: "/voluntariado/6",
        },
        {
          id: 7,
          titulo: "Reforestación urbana",
          imagen: "/causaviva/imagenes/ban1.jpg",
          organizacion: {
            nombre: "EcoVida",
            verificada: true,
          },
          descripcion:
            "Participa en jornadas de plantación de árboles y recuperación de áreas verdes en la ciudad.",
          fechas: {
            inicio: "2025-04-01",
            fin: "2025-07-01",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Arequipa, Perú",
            modalidad: "Hibrido",
            categoria: "Medio Ambiente",
          },
          estadisticas: {
            voluntarios_requeridos: 25,
            voluntarios_inscritos: 18,
          },
          enlace: "/voluntariado/7",
        },
        {
          id: 8,
          titulo: "Voluntariado in comedor social",
          imagen: "/causaviva/imagenes/visita.jpg",
          organizacion: {
            nombre: "Manos Solidarias",
            verificada: false,
          },
          descripcion:
            "Ayuda en la preparación y distribución de alimentos para personas en situación vulnerable.",
          fechas: {
            inicio: "2025-05-10",
            fin: "2025-08-10",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Cusco, Perú",
            modalidad: "Presencial",
            categoria: "Salud",
          },
          estadisticas: {
            voluntarios_requeridos: 20,
            voluntarios_inscritos: 12,
          },
          enlace: "/voluntariado/8",
        },
        {
          id: 9,
          titulo: "Talleres virtuales de inglés",
          imagen: "/causaviva/imagenes/crea1.jpg",
          organizacion: {
            nombre: "Educando Juntos",
            verificada: true,
          },
          descripcion:
            "Imparte clases virtuales de inglés básico a niños y jóvenes de zonas rurales.",
          fechas: {
            inicio: "2025-06-01",
            fin: "2025-09-01",
            duracion: "3 meses",
          },
          detalles: {
            ubicacion: "Virtual",
            modalidad: "Remoto",
            categoria: "Educación",
          },
          estadisticas: {
            voluntarios_requeridos: 15,
            voluntarios_inscritos: 10,
          },
          enlace: "/voluntariado/9",
        },
      ],
    };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString("es-PE", { month: "short" });
      return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
    },
    formatDateRange(inicio, fin) {
      return `${this.formatDate(inicio)} - ${this.formatDate(fin)}`;
    },
  },
};
</script>
