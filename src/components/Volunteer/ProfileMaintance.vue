<template>
    <div
        class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen flex justify-center items-start">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
            <!-- Toolbar Superior -->
            <div class="flex items-center gap-3 mb-8">
                <i class="pi pi-user text-blue-400 text-3xl"></i>
                <h1 class="text-3xl font-bold text-blue-900">Datos de Perfil</h1>
            </div>

            <form @submit.prevent="saveProfile">
                <div class="flex flex-col space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Campo DNI -->
                        <div class="relative">
                            <input id="dni" v-model="oVolunteer.idUsuario" :disabled="isReadOnly" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="dni" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.idUsuario ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                D.N.I.
                            </label>
                        </div>
                        <!-- Campo Nombres -->
                        <div class="relative">
                            <input id="nombre" v-model="oVolunteer.nombre" :disabled="isReadOnly" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="nombre" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.nombre ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Nombres
                            </label>
                        </div>
                        <!-- Campo Apellidos -->
                        <div class="relative">
                            <input id="apellido" v-model="oVolunteer.apellido" :disabled="isReadOnly" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="apellido" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.apellido ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Apellidos
                            </label>
                        </div>
                        <!-- Campo Teléfono -->
                        <div class="relative">
                            <input id="telefono" v-model="oVolunteer.telefono" :disabled="isReadOnly" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="telefono" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.telefono ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Teléfono
                            </label>
                        </div>
                        <!-- Campo Distrito -->
                        <div class="relative">
                            <select id="distrito" v-model="oVolunteer.idDistrito" :disabled="isReadOnly" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50">
                                <option value="" disabled>Selecciona un distrito</option>
                                <option v-for="distrito in oListDistrict" :key="distrito.idDistrito"
                                    :value="distrito.idDistrito">
                                    {{ distrito.nombreDistrito }}
                                </option>
                            </select>
                            <label for="distrito" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.idDistrito ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Distrito
                            </label>
                        </div>
                        <!-- Campo Dirección -->
                        <div class="relative md:col-span-2">
                            <textarea id="direccion" rows="2" v-model="oVolunteer.direccion" :disabled="isReadOnly"
                                required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
                                placeholder=" "></textarea>
                            <label for="direccion" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oVolunteer.direccion ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Dirección
                            </label>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-200 my-8"></div>

                <!-- Botones de Acción -->
                <div class="flex justify-end space-x-3">
                    <button v-if="!isReadOnly" type="submit"
                        class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold shadow transition">
                        <i class="pi pi-save mr-2"></i>
                        Guardar
                    </button>
                    <button v-if="!isReadOnly" @click="BackTo"
                        class="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-semibold shadow transition">
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
import ProfileVolunteerService from '../../services/ProfileVolunteerService.js';
import DistrictService from '../../services/DistricService.js';

const route = useRoute();
const router = useRouter();

const oVolunteer = ref({});
const oListDistrict = ref([]);

const isReadOnly = ref(true);
const editProfile = localStorage.getItem('editProfile');

onMounted(() => {
    Initialize();
});

const Initialize = () => {
    const idVolunteer = localStorage.getItem('userId');
    LoadProfile(idVolunteer);
    LoadDistricts();
};

const BackTo = () => {
    localStorage.removeItem('editProfile');
    router.push('/portal/Voluntario/Configuracion');
}

const LoadDistricts = async () => {
    const response = await DistrictService.GetDistrictService();
    console.log("distritos: ", response.data);
    if (response.status == 200) {
        oListDistrict.value = response.data;
    }
}

const LoadProfile = async (idVolunteer) => {
    const response = await ProfileVolunteerService.GetProfileVolunteerService(idVolunteer);
    console.log("loadProfile: ", response);
    if (response.status == 200) {
        oVolunteer.value = response.data[0];
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
        const response = await ProfileVolunteerService.UpdateProfileVolunteerService(oVolunteer.value);
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