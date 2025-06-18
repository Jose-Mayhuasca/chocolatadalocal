<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Lista de Postulantes</h1>
            </div>
            <!-- Mostrar requisitos de la propuesta -->
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Requisitos:</h2>
                <p class="text-gray-600">{{ oPropuesta.descripcionRequisito }}</p>
            </div>

            <!-- Tabla personalizada con Tailwind -->
            <div class="overflow-x-auto">
                <div class="table-scroll"> <!-- Nuevo contenedor para scroll vertical -->
                    <table class="w-full">
                        <thead class="bg-blue-50">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Confirmar</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    #</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Nombre Completo</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    DNI</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Dirección</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Estado</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-blue-100">
                            <tr v-for="(item, index) in paginatedItems" :key="index"
                                class="hover:bg-blue-50 transition-colors duration-150 min-h-96">
                                <td class="px-6 py-4 whitespace-nowrap text-center min-h-full">
                                    <div class="flex justify-center gap-2">
                                        <button @click="EditProposal(item.idVoluntariado)"
                                            class="p-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 transition-all duration-200 hover:shadow-sm mr-2">
                                            <i class="pi pi-pencil"></i>
                                        </button>
                                        <button @click="UpdateStatusProposal(item)"
                                            class="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all duration-200 hover:shadow-sm ">
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
                                        <span v-if="item.estado"
                                            class="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            <span class="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                                            Activo
                                        </span>
                                        <span v-else
                                            class="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
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

            <!-- Botones de Acción -->
            <div class="flex justify-start space-x-3">
                <button @click="BackTo"
                    class="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <i class="pi pi-arrow-left mr-2"></i>
                    Atrás
                </button>
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

const oPropuesta = ref([]);
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

const LoadPropuestaDetail = async () => {
    try {
        const response = await ProposalsService.GetProposalsDetailService(idVoluntariado);
        console.log("loadPropuesta:", response.data);
        if (response.status === 200) {
            oPropuesta.value = response.data[0];
            console.log("oPropuesta:", oPropuesta.value);
        }
    } catch (error) {
        console.error("Error al cargar propuestas:", error);
    }
};



</script>