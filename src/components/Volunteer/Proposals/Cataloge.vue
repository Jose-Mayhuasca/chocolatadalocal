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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="vol in filteredCatalogo" :key="vol.idVoluntariado"
          class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
          <div class="relative">
            <img src="/public/imagenes/ban1.jpg" alt="Voluntariado" class="w-full h-48 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <span class="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Presencial
            </span>
          </div>
          <div class="flex-1 flex flex-col p-5">
            <div class="flex items-center mb-1">
              <span class="font-semibold text-sm text-blue-500">{{ vol.razonSocial }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
              {{ vol.tituloPropuesta }}
            </h3>
            <p class="text-sm text-gray-500 mb-2 line-clamp-2">
              {{ vol.descripcionPropuesta }}
            </p>
            <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
              <span class="flex items-center">
                <i class="pi pi-calendar mr-1"></i>
                {{ formatDateRange(vol.fechaInicio, vol.fechaFinal) }}
              </span>
              <span class="flex items-center">
                <i class="pi pi-map-marker mr-1"></i>
                {{ vol.direccion }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <RouterLink :to="`/portal/Voluntario/Propuestas/Detalle/${vol.idVoluntariado}`"
                class="inline-flex items-center gap-1 text-blue-600 hover:text-amber-500 text-sm font-medium transition">
                <i class="pi pi-eye"></i>
                Ver detalles
              </RouterLink>
              <button @click="InscribeVolunteer(vol.idVoluntariado)"
                class="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition">
                <i class="pi pi-user-plus"></i>
                Inscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast personalizado -->
      <div v-if="toast.show" :class="[
        'fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300',
        toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]">
        <i :class="toast.type === 'success' ? 'pi pi-check-circle text-2xl' : 'pi pi-times-circle text-2xl'"></i>
        <span class="font-semibold">{{ toast.message }}</span>
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

const toast = ref({
  show: false,
  message: '',
  type: 'success' // 'success' | 'error'
});

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false }, 3000);
}

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
    showToast('Faltan datos para la inscripción.', 'error');
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
      showToast('¡Inscripción exitosa!', 'success');
      await LoadRegistrations(idUsuario);
      await LoadPropuestas();
    } else {
      showToast('Error al inscribirse en la propuesta.', 'error');
    }
  } catch (error) {
    showToast('Excepción al inscribirse.', 'error');
    console.error('Excepción al inscribirse:', error);
  }
}

</script>
