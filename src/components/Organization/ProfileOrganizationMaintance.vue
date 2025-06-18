<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Datos de Perfil</h1>
            </div>

            <form @submit.prevent="saveProfile">
                <div class="flex flex-col space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Campo RUC -->
                        <div class="relative">
                            <input id="txtTitle" v-model="oOrganization.idOrganizacion" :disabled="isReadOnly" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                            <label for="txtTitle"
                                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                R.U.C.
                            </label>
                        </div>
                        <!-- Campo Razon Social -->
                        <div class="relative">
                            <input id="txtTitle" v-model="oOrganization.razonSocial" :disabled="isReadOnly" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                            <label for="txtTitle"
                                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                Razon Social
                            </label>
                        </div>

                        <!-- Espacio -->
                        <div class="relative"></div>

                        <!-- Campo Telefono -->
                        <div class="relative">
                            <input id="txtTitle" v-model="oOrganization.telefono" :disabled="isReadOnly" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                            <label for="txtTitle"
                                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                Telefono
                            </label>
                        </div>

                        <!-- Campo Distrito -->
                        <div class="relative">
                            <select id="txtDistrito" v-model="oOrganization.idDistrito" :disabled="isReadOnly" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer">
                                <option value="" disabled>Selecciona un distrito</option>
                                <option v-for="distrito in oListDistrict" :key="distrito.idDistrito" :value="distrito.idDistrito">
                                    {{ distrito.nombreDistrito }}
                                </option>
                            </select>
                            <label for="txtDistrito"
                                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                Distrito
                            </label>
                        </div>

                        <div class="relative"></div>

                        <!-- Campo Dirección -->
                        <div class="relative md:col-span-2">
                            <textarea id="txtDirection" rows="2" v-model="oOrganization.direccion"
                                :disabled="isReadOnly" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"></textarea>
                            <label for="txtDirection"
                                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                Dirección
                            </label>
                        </div>


                    </div>
                </div>

                <div class="border-t border-gray-200 my-6"></div>

                <!-- Botones de Acción -->
                <div class="flex justify-start space-x-3">
                    <button v-if="!isReadOnly" type="submit"
                        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <i class="pi pi-save mr-2"></i>
                        Guardar
                    </button>
                    <button v-if="!isReadOnly" @click="BackTo"
                        class="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <i class="pi pi-arrow-left mr-2"></i>
                        Atrás
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProfileOrganizationService from '../../services/ProfileOrganizationService.js';
import DistrictService from '../../services/DistricService.js';

const route = useRoute();
const router = useRouter();

const oOrganization = ref({});
const oListDistrict = ref([]);

const isReadOnly = ref(true);
const editProfile = localStorage.getItem('editProfile');

onMounted(() => {
    Initialize();
});

const Initialize = () => {
    const idOrganizacion = localStorage.getItem('userId');
    console.log("idOrganizacion", idOrganizacion);
    LoadProfile(idOrganizacion);
    LoadDistricts();
};

const BackTo = () => {
    localStorage.removeItem('editProfile');
    router.push('/portal/Organizacion/Configuracion');
}

const LoadDistricts = async () => {
    const response = await DistrictService.GetDistrictService();
    console.log("distritos: ",response.data);
    if (response.status == 200) {
        oListDistrict.value = response.data;
    }
}

const LoadProfile = async (idOrganizacion) => {
    const response = await ProfileOrganizationService.GetProfileOrganizationService(idOrganizacion);
    console.log("load profile: ",response.data);
    if (response.status == 200) {
        oOrganization.value = response.data[0];
        activeInputs(editProfile);
    }
}

function activeInputs(editProfile) {
    if (editProfile === "1") {
        isReadOnly.value = false;
    }
}

const saveProfile = async () => {
    try {
        const response = await ProfileOrganizationService.UpdateProfileOrganizationService(oOrganization.value);
        console.log('Perfil actualizado:', response);
        isReadOnly.value = true;
        localStorage.removeItem('editProfile');
        BackTo();
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
};

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