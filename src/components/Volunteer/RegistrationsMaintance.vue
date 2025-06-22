<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow-lg p-8">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-blue-900 flex items-center gap-2">
                    <i class="pi pi-list"></i>
                    Inscripciones Realizadas
                    <span class="ml-2 text-base font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {{ totalRegistrations }}
                    </span>
                </h1>
            </div>

            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    v-for="inscripcion in oListRegistrations"
                    :key="inscripcion.idInscripcion"
                    class="relative bg-white p-6 rounded-xl shadow-md border-l-8 transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    :class="{
                        'border-blue-500': inscripcion.estadoInscripcion === 'Aceptado',
                        'border-yellow-400': inscripcion.estadoInscripcion === 'Pendiente',
                        'border-red-500': inscripcion.estadoInscripcion === 'Rechazado'
                    }"
                >
                    <h2 class="text-lg font-bold text-gray-800 mb-2 truncate">{{ inscripcion.tituloPropuesta }}</h2>

                    <div class="flex items-center gap-2 mb-2">
                        <span
                            v-if="inscripcion.estadoInscripcion === 'Aceptado'"
                            class="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold"
                        >
                            <i class="pi pi-check-circle mr-1"></i> Aceptado
                        </span>
                        <span
                            v-else-if="inscripcion.estadoInscripcion === 'Pendiente'"
                            class="inline-flex items-center px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold"
                        >
                            <i class="pi pi-clock mr-1"></i> Pendiente
                        </span>
                        <span
                            v-else
                            class="inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold"
                        >
                            <i class="pi pi-times-circle mr-1"></i> Rechazado
                        </span>
                    </div>

                    <p class="text-sm text-gray-600 mb-1">
                        <span class="font-medium text-gray-700">Inscrito el:</span>
                        {{ formatDate(inscripcion.fechaInscripcion) }}
                    </p>

                    <div class="mt-6 flex justify-end">
                        <RouterLink
                            :to="`/portal/Voluntario/Propuestas/Detalle/${inscripcion.idVoluntariado}`"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                        >
                            <i class="pi pi-eye"></i> Ver detalles
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RegistrationService from '../../services/RegistrationService';

const oListRegistrations = ref([]);
const totalRegistrations = ref(0);
const idUser = localStorage.getItem('userId');

//#region Eventos
onMounted(() => {
    Initialize();
});

const Initialize = () => {
    LoadRegistrations(idUser);
};

const LoadRegistrations = async (idUser) => {
    try {
        const response = await RegistrationService.GetRegistrationsService(idUser);
        console.log("loadInscriptions:", response.data);
        if (response.status === 200) {
            oListRegistrations.value = response.data;
            totalRegistrations.value = oListRegistrations.value.length;
            console.log("totalRegistros:", totalRegistrations.value);
        }
    } catch (error) {
        console.error("Error al cargar las inscripciones:", error);
    }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Fecha no disponible";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


</script>