<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Nueva Propuesta</h1>
            </div>

            <div class="flex flex-col space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Campo Título -->
                    <div class="relative">
                        <input id="txtTitle" v-model="oPropuestas.tituloPropuesta" maxlength="45"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                        <label for="txtTitle"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Título
                        </label>
                    </div>

                    <div class="relative md:col-span-2"></div>

                    <!-- Campo Descripción -->
                    <div class="relative md:col-span-2">
                        <textarea id="txtDescription" rows="2" v-model="oPropuestas.descripcionPropuesta"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"></textarea>
                        <label for="txtDescription"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Descripción
                        </label>
                    </div>

                    <!-- Campo Dirección -->
                    <div class="relative md:col-span-2">
                        <textarea id="txtDirection" rows="2" v-model="oPropuestas.direccion"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"></textarea>
                        <label for="txtDirection"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Dirección
                        </label>
                    </div>

                    <div class="relative"></div>

                    <!-- Campo Fecha Inicio -->
                    <div class="relative">
                        <input id="txtInitDate" v-model="oPropuestas.fechaInicio" type="date"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                        <label for="txtInitDate"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Fecha Inicio
                        </label>
                    </div>

                    <!-- Campo Fecha Final -->
                    <div class="relative">
                        <input id="txtFinalDate" v-model="oPropuestas.fechaFinal" type="date"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                        <label for="txtFinalDate"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Fecha Final
                        </label>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 my-6"></div>

            <!-- Sección Requisitos -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Requisitos</h1>
            </div>

            <div class="flex flex-col space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Campo Descripción Requisitos -->
                    <div class="relative md:col-span-2">
                        <textarea id="txtDescriptionRequirements" rows="4" v-model="oPropuestas.descripcionRequisito"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"></textarea>
                        <label for="txtDescriptionRequirements"
                            class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Descripción
                        </label>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 my-6"></div>

            <!-- Botones de Acción -->
            <div class="flex justify-start space-x-3">
                <button @click="SaveProposals"
                    class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <i class="pi pi-save mr-2"></i>
                    Guardar
                </button>
                <button @click="BackTo"
                    class="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <i class="pi pi-arrow-left mr-2"></i>
                    Atrás
                </button>
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
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProposalsService from '../../../services/ProposalsService';

const route = useRoute();
const router = useRouter();

const oPropuestas = ref({
    idVoluntariado: 0,
    estado: 'true'
});

const fechaInicio = ref(null);

const toast = ref({
    show: false,
    message: '',
    type: 'error' // 'success' | 'error'
});

function showToast(message, type = 'error') {
    toast.value = { show: true, message, type };
    setTimeout(() => { toast.value.show = false }, 3000);
}

onMounted(() => {
    Initialize();
});

const Initialize = () => {
    const idVoluntariado = route.params.id;

    if (!idVoluntariado || idVoluntariado === "null") {
        console.log("Creando nueva propuesta, no se cargan datos.");
        return;
    }

    LoadPropuestasDetalle(idVoluntariado);
};

const BackTo = () => {
    router.push('/portal/Organizacion/Propuestas');
}

const LoadPropuestasDetalle = async (idVoluntariado) => {
    const response = await ProposalsService.GetProposalsDetailService(idVoluntariado);
    console.log('Response from GetProposalsDetailService:', response);
    if (response.status == 200) {
        console.log('Propuestas loaded successfully:', response.data);
        const propuesta = response.data[0];

        // Transformar fechas antes de asignarlas
        propuesta.fechaInicio = new Date(propuesta.fechaInicio).toISOString().slice(0, 10);
        propuesta.fechaFinal = new Date(propuesta.fechaFinal).toISOString().slice(0, 10);

        oPropuestas.value = propuesta;
    }
}

function validateFields() {
    const p = oPropuestas.value;
    if (
        !p.tituloPropuesta ||
        !p.descripcionPropuesta ||
        !p.direccion ||
        !p.fechaInicio ||
        !p.fechaFinal ||
        !p.descripcionRequisito
    ) {
        return false;
    }
    return true;
}

const SaveProposals = async () => {
    const idVoluntariado = oPropuestas.value.idVoluntariado;

    if (!idVoluntariado || idVoluntariado === 0) {
        await CreateProposals();
    } else {
        await UpdateProposals();
    }
};

const UpdateProposals = async () => {
    if (!validateFields()) {
        showToast('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }

    const { ...model } = oPropuestas.value;

    const request = {
        ...model
    };

    console.log('Request to UpdateProposalsService:', request);

    const response = await ProposalsService.UpdateProposalsDetailService(request);
    console.log('Response from UpdateProposalsService:', response);
    if (response.status == 200) {
        console.log('Propuesta updated successfully:', response.data);
        router.push('/portal/Organizacion/Propuestas');
    } else {
        console.error('Error updating propuesta:', response);
    }
}

const CreateProposals = async () => {
    if (!validateFields()) {
        showToast('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }

    const idOrganizacion = localStorage.getItem('userId');

    if (!idOrganizacion) {
        console.error('Error: No se encontró idOrganizacion en localStorage.');
        return;
    }

    const { idVoluntariado, ...model } = oPropuestas.value;

    const request = {
        idOrganizacion,
        ...model
    };

    console.log('Request to CreateProposalsService:', request);

    const response = await ProposalsService.CreateProposalsService(request);
    console.log('Response from CreateProposalsService:', response);
    if (response.status == 200) {
        console.log('Propuesta created successfully:', response.data);
        router.push('/portal/Organizacion/Propuestas');
    } else {
        console.error('Error creating propuesta:', response);
    }
}
</script>

<style scoped>
/* Estilos personalizados para los inputs con tipo date */
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
    filter: invert(0.3);
}

/* Transición suave para los labels flotantes */
label {
    transition: all 0.2s ease-out;
}
</style>