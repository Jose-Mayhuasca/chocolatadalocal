<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div class="w-full max-w-lg p-10 space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <div class="flex flex-col items-center gap-2 mb-4">
                <span></span>
                <i class="pi pi-user-plus text-blue-500 text-4xl"></i>
                <h2 class="text-2xl font-bold text-center text-blue-900">Crear Cuenta de Voluntario</h2>
                <p class="text-gray-500 text-sm text-center">Completa los datos para registrarte como voluntario</p>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="dni" class="block mb-2 text-sm font-medium text-gray-700">D.N.I.</label>
                        <input type="number" id="dni" v-model="dni" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Nombres</label>
                        <input type="text" id="name" v-model="name" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="lastname" class="block mb-2 text-sm font-medium text-gray-700">Apellidos</label>
                        <input type="text" id="lastname" v-model="lastname" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-700">Teléfono</label>
                        <input type="number" id="phoneNumber" v-model="phoneNumber" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="district" class="block mb-2 text-sm font-medium text-gray-700">Distrito</label>
                        <select id="txtDistrito" v-model="district" :disabled="isReadOnly" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition">
                            <option value="" disabled>Selecciona un distrito</option>
                            <option v-for="distrito in oListDistrict" :key="distrito.idDistrito"
                                :value="distrito.idDistrito">
                                {{ distrito.nombreDistrito }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="direction" class="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
                        <input type="text" id="direction" v-model="direction" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" id="password" v-model="password" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-700">Confirmar
                            Contraseña</label>
                        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                </div>
                <button type="submit"
                    class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                    <i class="pi pi-user-plus"></i>
                    Registrar
                </button>
            </form>
            <p class="mt-4 text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-blue-600 hover:underline font-semibold">Iniciar
                    Sesión</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import RegisterVolunteerService from '../../../services/RegisterVolunteerService';
import DistrictService from '../../../services/DistricService.js';

// Variables reactivas para el formulario
const dni = ref<string>('')
const name = ref<string>('')
const lastname = ref<string>('')
const phoneNumber = ref<string>('')
const direction = ref<string>('')
const district = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')

const oListDistrict = ref([]);

const data = ref({
    idUsuario: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    idDistrito: '',
    contrasenia: ''
});

const router = useRouter();

onMounted(() => {
    Initialize();
});

const Initialize = () => {
    LoadDistricts();
};

const LoadDistricts = async () => {
    const response = await DistrictService.GetDistrictService();
    console.log("distritos: ", response.data);
    if (response.status == 200) {
        oListDistrict.value = response.data;
    }
}

function handleSubmit() {
    if (validationFields() === 0) {
        console.error('Complete bien los campos');
    } else {
        console.log('Datos Correctos, enviando datos:', {
            idUsuario: String(dni.value),
            nombre: name.value,
            apellido: lastname.value,
            direccion: direction.value,
            telefono: String(phoneNumber.value),
            idDistrito: district.value,
            contrasenia: passwordConfirm.value
        });
        data.value = {
            idUsuario: String(dni.value),
            nombre: name.value,
            apellido: lastname.value,
            direccion: direction.value,
            telefono: String(phoneNumber.value),
            idDistrito: district.value,
            contrasenia: passwordConfirm.value
        };
        registrar();
    }
}

function validationFields() {
    if (password.value !== passwordConfirm.value) {
        console.error('Las contraseñas no coinciden');
        return 0;
    } else {
        console.log('Las contraseñas coinciden');
        return 1;
    }
}

async function registrar() {
    try {
        const response = await RegisterVolunteerService.CreateRegisterVolunteerService(
            JSON.stringify(data.value) // Serializa los datos a formato JSON explícitamente
        );
        console.log('Voluntario registrado:', response.data);
        router.push({ path: `/login` });
    } catch (error) {
        console.error('Error al registrar voluntario:', error);
    }
}

</script>