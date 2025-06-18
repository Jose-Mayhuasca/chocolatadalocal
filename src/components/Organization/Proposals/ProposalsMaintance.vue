<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header del dashboard -->
            <div class="relative bg-white rounded-xl shadow-md p-0 mb-8 border border-blue-50 overflow-hidden">
                <!-- Fondo de imagen -->
                <div class="absolute inset-0 z-0">
                    <img
                        class="w-full h-[200px] md:h-[250px] object-cover"
                        src="/imagenes/bgindexone.jpg"
                        alt="fondo"
                    />
                    <div class="absolute inset-0 bg-white/70"></div>
                </div>
                <!-- Contenido del header -->
                <div class="relative z-10 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-blue-900">Propuestas</h1>
                        <p class="text-neutral-600 mt-1">Administra tus propuestas de voluntariado</p>
                    </div>
                    <button
                        @click="OpenProposalNew()"
                        class="flex items-center gap-2 font-semibold shadow-md rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0 text-white px-6 py-3 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        <i class="pi pi-plus"></i>
                        Nueva Propuesta
                    </button>
                </div>
            </div>

            <!-- Tarjeta de la tabla -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-blue-50">
                <!-- Filtro como tarjeta interna -->
                <div class="bg-gradient-to-r from-blue-50 to-teal-50 p-6 border-b border-blue-100">
                    <div class="flex flex-col md:flex-row md:items-center gap-4">
                        <div class="relative flex-1">
                            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                            <input
                                v-model="filters['global'].value"
                                placeholder="Buscar propuestas..."
                                class="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                            />
                        </div>
                        <div class="flex gap-2">
                            <button class="font-medium hover:bg-gray-50 text-blue-700 border border-blue-200 px-4 py-2 transition rounded-lg">
                                <i class="pi pi-filter mr-2"></i>
                                Filtros
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tabla personalizada con Tailwind -->
                <div class="overflow-x-auto">
                    <div class="table-scroll"> <!-- Nuevo contenedor para scroll vertical -->
                        <table class="w-full">
                            <thead class="bg-blue-50">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Acciones</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">#</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Título</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Descripción</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Dirección</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-blue-100">
                                <tr v-for="(item, index) in paginatedItems" :key="index" class="hover:bg-blue-50 transition-colors duration-150 min-h-96">
                                    <td class="px-6 py-4 whitespace-nowrap text-center min-h-full">
                                        <div class="flex justify-center gap-2">
                                            <button 
                                                @click="EditProposal(item.idVoluntariado)"
                                                class="p-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 transition-all duration-200 hover:shadow-sm mr-2"
                                            >
                                                <i class="pi pi-pencil"></i>
                                            </button>
                                            <button 
                                                @click="UpdateStatusProposal(item)"
                                                class="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all duration-200 hover:shadow-sm "
                                            >
                                                <i class="pi pi-power-off"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ item.idVoluntariado }}</td>
                                    <td class="px-6 py-4">{{ item.tituloPropuesta }}</td>
                                    <td class="px-6 py-4">{{ item.descripcionPropuesta }}</td>
                                    <td class="px-6 py-4">{{ item.direccion }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex justify-center">
                                            <span 
                                                v-if="item.estado" 
                                                class="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                            >
                                                <span class="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                                                Activo
                                            </span>
                                            <span 
                                                v-else 
                                                class="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                                            >
                                                <span class="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                                                Inactivo
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Paginación personalizada -->
                <div class="bg-white px-6 py-4 border-t border-blue-100 flex items-center justify-between">
                    <div class="text-blue-600 font-medium text-sm">
                        Mostrando {{ oListPropuestas.length }} registros
                    </div>
                    <div class="flex items-center gap-2">
                        <button 
                            class="p-2 rounded-lg border border-blue-200 hover:bg-blue-50 text-blue-600 disabled:opacity-50"
                            :disabled="currentPage === 1"
                            @click="currentPage--"
                        >
                            <i class="pi pi-chevron-left"></i>
                        </button>
                        
                        <button 
                            v-for="page in totalPages" 
                            :key="page"
                            @click="currentPage = page"
                            class="w-10 h-10 rounded-lg border flex items-center justify-center"
                            :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-200 text-blue-600 hover:bg-blue-50'"
                        >
                            {{ page }}
                        </button>
                        
                        <button 
                            class="p-2 rounded-lg border border-blue-200 hover:bg-blue-50 text-blue-600 disabled:opacity-50"
                            :disabled="currentPage === totalPages"
                            @click="currentPage++"
                        >
                            <i class="pi pi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="bg-blue-50 rounded-lg px-4 py-2 border border-blue-100">
                        <span class="text-blue-700 text-sm font-medium">Filas por página</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProposalsService from '../../../services/ProposalsService';

const oListPropuestas = ref([]);
const router = useRouter();
const filters = ref({
    global: { value: '', matchMode: 'contains' }
});
const currentPage = ref(1);
const rowsPerPage = ref(5);

// Computed para paginación
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return oListPropuestas.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(oListPropuestas.value.length / rowsPerPage.value);
});

//#region Eventos
onMounted(() => {
    Initialize();
});

//#region Metodos
const idUser = localStorage.getItem('userId');

const Initialize = () => {
    LoadPropuestas();
}

const LoadPropuestas = async () => {
    console.log("idUserLocalStorage:",idUser);
    if (!idUser) {
        console.error('No se encontró idUser en localStorage');
        return;
    }
    const response = await ProposalsService.GetProposalsService(idUser);
    console.log("loadPropuestas:",response);
    if (response.status == 200) {
        oListPropuestas.value = response.data;
    }
}

const OpenProposalNew = () => {
    router.push({ path: `/portal/Organizacion/Propuestas/Nuevo` });
}

const EditProposal = (idVoluntariado) => {
    router.push({ path: `/portal/Organizacion/Propuestas/Editar/${idVoluntariado}` });
}

const UpdateStatusProposal = async (proposal) => {
    const request = {
        idVoluntariado: proposal.idVoluntariado,
        estado: !proposal.estado
    };

    const response = await ProposalsService.UpdateStatusProposalsService(request);

    if (response.status === 200) {
        console.log(`Propuesta ${request.estado ? 'activada' : 'desactivada'} correctamente`);
        LoadPropuestas();
    }
}
</script>

<style scoped>
/* Estilos adicionales específicos */
table {
    min-width: 100%;
}

th, td {
    padding: 1rem 1.5rem;
}

tbody tr:last-child {
    border-bottom: none;
}

.table-scroll {
    max-height: 800px; /* Ajusta la altura según lo que necesites */
    overflow-y: auto;
}
</style>