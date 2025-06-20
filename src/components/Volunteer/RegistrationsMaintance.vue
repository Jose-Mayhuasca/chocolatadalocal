<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Inscripciones Realizadas <span
                        class="ml-2 text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {{ totalRegistrations }}</span> </h1>
            </div>

            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="inscripcion in oListRegistrations" :key="inscripcion.idInscripcion"
                    class="bg-white p-4 rounded-lg shadow">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">{{ inscripcion.tituloPropuesta }}</h2>

                    <p class="text-sm text-gray-600 mb-1">
                        <span class="font-medium text-gray-700">Estado:</span> {{ inscripcion.estadoInscripcion }}
                    </p>

                    <p class="text-sm text-gray-600">
                        <span class="font-medium text-gray-700">Inscrito el:</span>
                        {{ formatDate(inscripcion.fechaInscripcion) }}
                    </p>

                    <div class="mt-4 flex justify-end">
                        <RouterLink :to="`/portal/Voluntario/Propuestas/Detalle/${inscripcion.idVoluntariado}`"
                            class="text-sm text-blue-600 hover:underline">
                            Ver detalles
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