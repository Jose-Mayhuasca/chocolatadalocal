<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div class="w-full max-w-lg p-10 space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <div class="flex flex-col items-center gap-2 mb-4">
                <i class="pi pi-building text-blue-500 text-4xl"></i>
                <h2 class="text-2xl font-bold text-center text-blue-900">Crear Cuenta de Organización</h2>
                <p class="text-gray-500 text-sm text-center">Completa los datos para registrar tu organización</p>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="ruc" class="block mb-2 text-sm font-medium text-gray-700">R.U.C.</label>
                        <input id="ruc" v-model="ruc" required type="text" inputmode="numeric" maxlength="11"
                            pattern="\d{11}" @input="ruc = ruc.replace(/\D/g, '').slice(0, 11)"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                        <p v-if="ruc.length > 0 && ruc.length < 11" class="text-sm text-red-600 mt-1">
                            Debe ingresar los 11 dígitos
                        </p>
                    </div>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Razón Social</label>
                        <input type="text" id="name" v-model="name" required maxlength="25"
                            @input="name = name.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s]/g, '')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div>
                        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-700">Teléfono</label>
                        <input id="phoneNumber" v-model="phoneNumber" required type="text" inputmode="numeric"
                            maxlength="9" pattern="\d{9}"
                            @input="phoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 9)"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                        <p v-if="phoneNumber.length > 0 && phoneNumber.length < 9" class="text-sm text-red-600 mt-1">
                            Debe ingresar los 9 dígitos
                        </p>
                    </div>
                    <div>
                        <label for="direction" class="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
                        <input type="text" id="direction" v-model="direction" required maxlength="30"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                    </div>
                    <div class="md:col-span-2">
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
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" id="password" v-model="password" required maxlength="25"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
                        <!-- Barra de fuerza de contraseña personalizada -->
                        <div class="w-full mt-2" v-if="password.length > 0">
                            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-2 rounded-full transition-all duration-300" :class="[
                                    passwordStrength === 0 ? 'bg-gray-300 w-0' :
                                        passwordStrength < 50 ? 'bg-red-400' :
                                            passwordStrength < 75 ? 'bg-yellow-400' :
                                                'bg-green-500'
                                ]" :style="{ width: passwordStrength + '%' }"></div>
                            </div>
                            <p class="text-xs mt-1 font-semibold" :class="{
                                'text-red-600': passwordStrength < 50,
                                'text-yellow-600': passwordStrength >= 50 && passwordStrength < 75,
                                'text-green-600': passwordStrength >= 75
                            }">
                                Seguridad:
                                {{ passwordStrength === 0 ? 'Muy débil' :
                                    passwordStrength === 25 ? 'Débil' :
                                        passwordStrength === 50 ? 'Aceptable' :
                                            passwordStrength === 75 ? 'Buena' :
                                                'Muy buena'
                                }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-700">Confirmar
                            Contraseña</label>
                        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required maxlength="25"  :class="[
                            'w-full px-4 py-3 border rounded-lg focus:outline-none transition bg-gray-50',
                            passwordConfirm && !passwordMatch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-400'
                        ]" />
                        <p v-if="passwordConfirm && !passwordMatch" class="text-sm text-red-600 mt-1">
                            Las contraseñas no coinciden
                        </p>
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

            <Dialog v-model:visible="showSuccessDialog" modal header="¡Registro exitoso!" :closable="false"
                :style="{ width: '350px' }">
                <template #container="{ closeCallback }">
                    <div
                        class="bg-white rounded-2xl shadow-2xl border border-blue-200 p-6 flex flex-col items-center gap-4">
                        <i class="pi pi-check-circle text-green-500 text-5xl"></i>
                        <p class="text-center text-lg text-gray-700">¡Tu cuenta ha sido creada correctamente!</p>
                        <button
                            class="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            @click="goToLogin">
                            Iniciar Sesión
                        </button>
                    </div>
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from "vue-router";
import RegisterOrganizationService from '../../../services/RegisterOrganizationService';
import DistrictService from '../../../services/DistricService.js';

// Variables reactivas para el formulario
const ruc = ref<string>('')
const name = ref<string>('')
// const email = ref<string>('')
const phoneNumber = ref<string>('')
const direction = ref<string>('')
const district = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')

const passwordStrength = computed(() => {
    const val = password.value;
    let strength = 0;

    if (/[a-z]/.test(val)) strength += 25;       // minúsculas
    if (/[A-Z]/.test(val)) strength += 25;       // mayúsculas
    if (/[0-9]/.test(val)) strength += 25;       // números
    if (/[^A-Za-z0-9]/.test(val)) strength += 25; // símbolos

    return strength;
});

const showSuccessDialog = ref(false);

const oListDistrict = ref([]);

const data = ref({
    idOrganizacion: '',
    razonSocial: '',
    telefono: '',
    direccion: '',
    idDistrito: '',
    password: ''
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
            idOrganizacion: String(ruc.value),
            razonSocial: name.value,
            telefono: String(phoneNumber.value),
            direccion: direction.value,
            idDistrito: district.value,
            contrasenia: passwordConfirm.value
        });
        data.value = {
            idOrganizacion: String(ruc.value),
            razonSocial: name.value,
            telefono: String(phoneNumber.value),
            direccion: direction.value,
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

const passwordMatch = computed(() => passwordConfirm.value === password.value);

function goToLogin() {
    showSuccessDialog.value = false;
    router.push({ path: `/login` });
}

async function registrar() {
    try {
        showSuccessDialog.value = true;
        const response = await RegisterOrganizationService.CreateRegisterOrganizationService(
            JSON.stringify(data.value)
        );
        console.log('Organización registrada:', response.data);
        // router.push({ path: `/login` });
    } catch (error) {
        console.error('Error al registrar organización:', error);
    }
}

</script>
