<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Propuestas Activas</h1>
            </div>

            <!-- Contenedor de tarjetas -->
            <div class="flex flex-col space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Iteración sobre las propuestas -->
                    <div v-for="propuesta in oListPropuestas" :key="propuesta.idVoluntariado"
                        class="relative bg-white rounded-lg shadow-md p-4">
                        <h2 class="text-xl font-bold text-gray-800">{{ propuesta.tituloPropuesta }}</h2>
                        <p class="text-gray-600">{{ propuesta.descripcionPropuesta }}</p>
                        <p class="text-gray-600">Fecha Inicio: {{ formatDate(propuesta.fechaInicio) }}</p>
                        <p class="text-gray-600">Fecha Fin: {{ formatDate(propuesta.fechaFinal) }}</p>

                        <button @click="seeApplicants(propuesta.idVoluntariado)"
                            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Ver Postulantes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProposalsService from '../../../services/ProposalsService';

const route = useRoute();
const router = useRouter();

const oListPropuestas = ref([]);

//#region Eventos
onMounted(() => {
    Initialize();
});

//#region Métodos
const idUser = localStorage.getItem('userId');

const Initialize = () => {
    LoadPropuestas();
};

const LoadPropuestas = async () => {
    console.log("idUserLocalStorage:", idUser);
    if (!idUser) {
        console.error('No se encontró idUser en localStorage');
        return;
    }
    try {
        const response = await ProposalsService.GetProposalsService(idUser);
        console.log("loadPropuestas:", response.data);
        if (response.status === 200) {
            oListPropuestas.value = response.data;
        }
    } catch (error) {
        console.error("Error al cargar propuestas:", error);
    }
};

const seeApplicants = (idVoluntariado) => {
    router.push(`/portal/Organizacion/Inscritos/Postulantes/${idVoluntariado}`);
};

const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible"; // Manejo de datos nulos o vacíos
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
};


</script>

<style scoped>
/* Estilos para mejorar la apariencia de las tarjetas */
</style>
