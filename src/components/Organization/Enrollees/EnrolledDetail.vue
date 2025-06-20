<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">

            <!-- Header del módulo -->
            <div class="relative bg-white rounded-xl shadow-md p-0 border border-blue-50 overflow-hidden">
                <div class="absolute inset-0 z-0">
                    <img class="w-full h-[200px] md:h-[250px] object-cover" src="/imagenes/bgindexone.jpg"
                        alt="fondo" />
                    <div class="absolute inset-0 bg-white/70"></div>
                </div>
                <div class="relative z-10 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-blue-900">Postulantes</h1>
                        <p class="text-neutral-600 mt-1">Gestiona las inscripciones para esta propuesta</p>
                    </div>
                    <button @click="BackTo"
                        class="flex items-center gap-2 font-semibold shadow-md rounded-xl bg-gray-200 text-gray-800 px-6 py-3 hover:bg-gray-300 transition">
                        <i class="pi pi-arrow-left"></i> Atrás
                    </button>
                </div>
            </div>

            <!-- Información del requisito -->
            <div class="bg-white rounded-xl shadow-md mb-8 p-6 border border-blue-50">
                <h2 class="text-lg font-semibold text-blue-800 mb-2">Requisitos de la propuesta</h2>
                <p class="text-gray-700">{{ oListInscritos[0]?.descripcion }}</p>
            </div>

            <!-- Tabla de postulantes -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-blue-50">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-blue-50">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Acciones</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    #</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Nombre</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Estado</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-blue-100">
                            <tr v-for="(item, index) in paginatedItems" :key="index" class="hover:bg-blue-50">
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <div class="flex justify-center gap-2">
                                        <button @click="AcceptEnrolled(item.idInscripcion)"
                                            class="p-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 transition duration-200 hover:shadow-sm">
                                            <i class="pi pi-check"></i>
                                        </button>
                                        <button @click="RejectEnrolled(item.idInscripcion)"
                                            class="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 transition duration-200 hover:shadow-sm">
                                            <i class="pi pi-times"></i>
                                        </button>
                                    </div>
                                </td>
                                <td class="px-6 py-4">{{ item.idInscripcion }}</td>
                                <td class="px-6 py-4">{{ item.nombres }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex justify-start">
                                        <span v-if="item.estadoInscripcion === 'Aceptado'"
                                            class="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
                                            <span class="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                                            Aceptado
                                        </span>
                                        <span v-else-if="item.estadoInscripcion === 'Pendiente'"
                                            class="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20">
                                            <span class="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                                            Pendiente
                                        </span>
                                        <span v-else-if="item.estadoInscripcion === 'Rechazado'"
                                            class="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
                                            <span class="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                                            Rechazado
                                        </span>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Paginación -->
                <div class="bg-white px-6 py-4 border-t border-blue-100 flex items-center justify-between">
                    <div class="text-blue-600 font-medium text-sm">
                        Mostrando {{ oListInscritos.length }} postulantes
                    </div>
                    <div class="flex items-center gap-2">
                        <button :disabled="currentPage === 1" @click="currentPage--"
                            class="p-2 rounded-lg border border-blue-200 hover:bg-blue-50 text-blue-600 disabled:opacity-50">
                            <i class="pi pi-chevron-left"></i>
                        </button>
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            class="w-10 h-10 rounded-lg border flex items-center justify-center"
                            :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-200 text-blue-600 hover:bg-blue-50'">
                            {{ page }}
                        </button>
                        <button :disabled="currentPage === totalPages" @click="currentPage++"
                            class="p-2 rounded-lg border border-blue-200 hover:bg-blue-50 text-blue-600 disabled:opacity-50">
                            <i class="pi pi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import EnrolledDetailService from '../../../services/EnrolledDetailService';

const route = useRoute();
const router = useRouter();

const oListInscritos = ref([]);
const idVoluntariado = route.params.id;

onMounted(() => {
    Initialize();
});

const Initialize = () => {
    LoadPropuestaDetail(idVoluntariado);
};

const BackTo = () => {
    router.push('/portal/Organizacion/Inscritos');
}

const currentPage = ref(1);
const rowsPerPage = ref(5);

// Computed para paginación
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return oListInscritos.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(oListInscritos.value.length / rowsPerPage.value);
});

const LoadPropuestaDetail = async (idVoluntariado) => {
    try {
        const response = await EnrolledDetailService.GetEnrolledDetailService(idVoluntariado);
        console.log("load postulantes:", response.data);
        if (response.status === 200) {
            oListInscritos.value = response.data;
        }
    } catch (error) {
        console.error("Error al cargar propuestas:", error);
    }
};

const AcceptEnrolled = async (idInscripcion) => {
    const request = {
        idInscripcion: idInscripcion,
        idEstadoP: 2
    }

    try {
        const response = await EnrolledDetailService.UpdateStatusEnrolledService(request);
        if (response.status === 200) {
            console.log("✅ Se aceptó al postulante correctamente.");            
            await LoadPropuestaDetail(idVoluntariado);
        }
    } catch (error) {
        console.error("❌ Error al aceptar al postulante:", error);
    }
}

const RejectEnrolled = async (idInscripcion) => {
    const request = {
        idInscripcion: idInscripcion,
        idEstadoP: 3
    }
    console.log("Request enviado (Rechazar):", request);

    try {
        const response = await EnrolledDetailService.UpdateStatusEnrolledService(request);
        if (response.status === 200) {
            console.log("⚠️ Se rechazó al postulante correctamente.");
            await LoadPropuestaDetail(idVoluntariado);
        }
    } catch (error) {
        console.error("❌ Error al rechazar al postulante:", error);
    }
}

</script>