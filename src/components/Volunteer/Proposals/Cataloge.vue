<template>
  <div class="max-w-screen-xl mx-auto">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    <div class="">
      <!-- Filtros -->
      <div class="py-8 px-4 md:px-10 bg-gray-50 rounded-xl"> <!-- Contenedor con fondo y bordes redondeados -->
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Filtrar voluntariados</h3> <!-- Título de sección -->
        <div class="flex flex-wrap gap-4 items-end"> <!-- Alineación vertical al fondo -->
          <!-- Campo de búsqueda mejorado -->
          <div class="flex-1 min-w-[250px]">
            <label class="block text-sm font-medium text-gray-600 mb-1">Buscar</label>
            <div class="relative">
              <input v-model="searchTerm" type="text" placeholder="Ej: Educación, Lima..."
                class="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Botón con icono -->
          <button
            class="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition flex items-center gap-2 h-[42px]">
            <i class="fas fa-filter"></i> Filtrar
          </button>
        </div>
      </div>
    </div>

    <!-- Listado de Voluntariados -->
    <div class="py-8 px-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Voluntariados disponibles
        <span class="ml-2 text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          {{ totalPropuestas }}</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18">
        <div v-for="vol in filteredCatalogo" :key="vol.idVoluntariado" class="overflow-hidden">
          <div class="relative overflow-hidden rounded-lg">
            <img src="/dist/assets/ban1-cg6rbYsS.jpg" alt="Voluntariado"
              class="w-full h-48 object-cover hover:scale-105 transition duration-300" />
            <div class="absolute top-2 right-2 bg-teal-400/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Presencial
            </div>
          </div>

          <div class="pt-2">
            <div class="flex items-center">
              <span class="font-semibold text-sm text-blue-500">{{ vol.razonSocial }}</span>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 my-1 leading-tight">
              {{ vol.tituloPropuesta }}
            </h3>
            <p class="text-sm text-gray-500 line-clamp-2">
              {{ vol.descripcionPropuesta }}
            </p>

            <div class="pt-4 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-500">
              <span class="flex items-center">
                <i class="pi pi-calendar mr-1"></i>
                {{ formatDateRange(vol.fechaInicio, vol.fechaFinal) }}
              </span>
              <span class="flex items-center">
                <i class="pi pi-map-marker mr-1"></i>
                {{ vol.direccion }}
              </span>
            </div>

            <div class="flex items-center flex-wrap justify-between py-3">
              <RouterLink :to="`/portal/Voluntario/Propuestas/Detalle/${vol.idVoluntariado}`"
                class="block text-neutral-800 text-sm hover:text-amber-500">
                <span class="flex items-end justify-end group hover:cursor-pointer">
                  <span class="group-hover:text-blue-500 hover:underline hover:decoration duration-200">Ver
                    detalles</span>
                </span>
              </RouterLink>
              <button @click="InscribeVolunteer(vol.idVoluntariado)"
                class="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm px-6 py-2 rounded-lg transition">
                Inscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="px-4 py-8">
      <div class="flex justify-center">
        <nav class="inline-flex rounded-md shadow">
          <a href="#" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <i class="fas fa-chevron-left"></i>
          </a>
          <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-amber-500 font-medium">1</a>
          <a href="#" class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">2</a>
          <a href="#" class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">3</a>
          <a href="#" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <i class="fas fa-chevron-right"></i>
          </a>
        </nav>
      </div>
    </div>
  </div>



</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from "vue-router";
import { useRouter, useRoute } from 'vue-router';
import CatalogeService from '../../../services/CatalogeService.js';
import RegistrationService from '../../../services/RegistrationService.js';

const oListCatalogo = ref([]);
const registeredIds = ref([]);
const totalPropuestas = ref(0);
const idUsuario = localStorage.getItem('userId');

const searchTerm = ref('');
const filteredCatalogo = computed(() =>
  oListCatalogo.value.filter(propuesta =>
    propuesta.tituloPropuesta.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);


//#region Eventos
onMounted(() => {
  Initialize();
});

const Initialize = () => {
  LoadRegistrations(idUsuario);
  LoadPropuestas();
};

const LoadPropuestas = async () => {
  try {
    const response = await CatalogeService.GetCatalogeService(0);
    if (response.status === 200) {
      oListCatalogo.value = response.data.filter(p =>
        p.estado === true && !registeredIds.value.includes(p.idVoluntariado)
      );
      console.log("Catalogo activo:", oListCatalogo.value);
      totalPropuestas.value = oListCatalogo.value.length;
    }
  } catch (error) {
    console.error("Error al cargar propuestas:", error);
  }
};

const LoadRegistrations = async (idUsuario) => {
  try {
    const response = await RegistrationService.GetRegistrationsService(idUsuario);
    if (response.status === 200) {
      registeredIds.value = response.data.map(item => item.idVoluntariado);
      console.log("IDs inscritos:", registeredIds.value);
    }
  } catch (error) {
    console.error("Error al cargar las inscripciones:", error);
  }
};

const formatDateRange = (start, end) => {
  const opts = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return `${new Date(start).toLocaleDateString("es-ES", opts)} - ${new Date(end).toLocaleDateString("es-ES", opts)}`;
};

async function InscribeVolunteer(idVoluntariado) {
  if (!idUsuario || !idVoluntariado) {
    console.error('Faltan datos para la inscripción.');
    return;
  }

  const request = {
    idUsuario: String(idUsuario),
    idVoluntariado: idVoluntariado
  };

  try {
    const response = await CatalogeService.CreateInscriptionVolunteerService(request);
    console.log('response inscribe:', response);
    if (response.status === 200) {
      console.log('Inscripción exitosa:', response.data);
      await LoadRegistrations(idUsuario);
      await LoadPropuestas();
    } else {
      console.error('Error al inscribirse en el voluntariado:', response);
    }
  } catch (error) {
    console.error('Excepción al inscribirse:', error);
  }
}

</script>
