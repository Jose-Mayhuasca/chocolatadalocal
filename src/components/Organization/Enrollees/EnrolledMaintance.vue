<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-2xl shadow-xl p-8">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-blue-900 flex items-center gap-2">
                    <i class="pi pi-briefcase text-blue-400 text-2xl"></i>
                    Propuestas Activas
                    <span class="ml-2 text-base font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {{ totalPropuestas }}
                    </span>
                </h1>
            </div>

            <!-- Contenedor de tarjetas -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="propuesta in oListPropuestas" :key="propuesta.idVoluntariado"
                    class="relative bg-white rounded-xl shadow-md border-l-8 border-blue-400 flex flex-col p-6 transition-all duration-200 hover:scale-105 hover:shadow-xl">
                    <h2 class="text-lg font-bold text-gray-800 mb-1 truncate">{{ propuesta.tituloPropuesta }}</h2>
                    <p class="text-gray-600 mb-2 line-clamp-2">{{ propuesta.descripcionPropuesta }}</p>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span class="flex items-center">
                            <i class="pi pi-calendar mr-1"></i>
                            {{ formatDate(propuesta.fechaInicio) }} - {{ formatDate(propuesta.fechaFinal) }}
                        </span>
                    </div>
                    <div class="flex-1"></div>
                    <button @click="seeApplicants(propuesta.idVoluntariado)"
                        class="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition">
                        <i class="pi pi-users"></i>
                        Ver Postulantes
                    </button>
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

const totalPropuestas = ref(0); // contador de propuestas activas

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
            oListPropuestas.value = response.data.filter(p => p.estado === true);
            totalPropuestas.value = oListPropuestas.value.length;
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
