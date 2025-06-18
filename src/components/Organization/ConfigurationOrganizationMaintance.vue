<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Configuracion</h1>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
                <!-- TITULO -->
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">Datos del perfil</h1>
                </div>

                <!-- Botones de Acción -->
                <div class="flex justify-start space-x-3">
                    <button @click="editProfile(idOrganizacion)"
                        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <i class="pi pi-pencil mr-2"></i>
                        Editar
                    </button>
                </div>
            </div>

            <div class="border-t border-gray-200 my-6"></div>

            <div class="bg-white rounded-lg shadow p-6">
                <!-- TITULO -->
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">Contraseña</h1>
                </div>

                <form @submit.prevent="handleUpdatePassword">
                    <div class="flex flex-col space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Campo Contraseña Actual -->
                            <div class="relative">
                                <input id="txtTitle" v-model="oNewPassword.currentPassword" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                                <label for="txtTitle"
                                    class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                    Contraseña Actual
                                </label>
                            </div>

                            <!-- Espacio -->
                            <div class="relative md:col-span-2"></div>

                            <!-- Campo Confirmar Nueva -->
                            <div class="relative">
                                <input id="txtTitle" v-model="oNewPassword.newPassword" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                                <label for="txtTitle"
                                    class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                    Confirmar Nueva
                                </label>
                            </div>

                            <!-- Espacio -->
                            <div class="relative md:col-span-2"></div>

                            <!-- Campo Confirmar Contraseña -->
                            <div class="relative">
                                <input id="txtTitle" v-model="oNewPassword.confirmPassword" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer" />
                                <label for="txtTitle"
                                    class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                    Confirmar Contraseña
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de Acción -->
                    <div class="flex justify-start space-x-3 mt-5">
                        <button type="submit"
                            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <i class="pi pi-save mr-2"></i>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProfileOrganizationService from '../../services/ProfileOrganizationService.js';
import LoginService from '../../services/LoginService.js';

const router = useRouter();
const idOrganizacion = localStorage.getItem('userId');

const oPasswordCurrent = ref();
const oNewPassword = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const data = ref({
    idOrganizacion: '',
    contrasenia: ''
});

onMounted(() => {
    Initialize();
});

const Initialize = () => {
};

const editProfile = (idOrganizacion) => {
    localStorage.setItem('editProfile', "1");
    router.push(`/portal/Organizacion/Perfil/Editar/${idOrganizacion}`);
}

async function loadPassword() {
    try {
        if (!idOrganizacion) {
            console.error('Error: No se encontró un ID de organización en localStorage.');
            return null;
        }

        const response = await LoginService.OrganizationLogin(idOrganizacion);
        if (response.status === 200 && response.data) {
            console.log('Password loaded successfully:', response.data.password);
            oPasswordCurrent.value = response.data.password;
            return true;
        } else {
            console.error('Error en la respuesta del servidor:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error al cargar la contraseña:', error);
        return false;
    }
}

async function validationFields() {
    const passwordLoaded = await loadPassword();
    if (!passwordLoaded) {
        console.error('Error al cargar la contraseña, validación detenida.');
        return 0;
    }

    if (oNewPassword.value.currentPassword !== oPasswordCurrent.value) {
        console.error('Las contraseña ingresada no coincide con la contraseña actual');
        return 0;
    } else {
        console.log('La contraseña coincide');
        if (oNewPassword.value.newPassword !== oNewPassword.value.confirmPassword) {
            console.error('La contraseña nueva no coinciden con la confirmacion');
            return 0;
        }
        else {
            console.log('La contraseña nueva coincide con la confirmacion');
            return 1;
        }
    }
}

async function updatePassword() {
    try {
        const response = await ProfileOrganizationService.UpdatePasswordOrganizationService(data.value);
        console.log('Contraseña Actualizada:', response);
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
    }
}

async function emptyInputs() {
    oNewPassword.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
}

const handleUpdatePassword = async () => {
    const isValid = await validationFields();
    if (!isValid) {
        console.error('Complete correctamente los campos.');
        return;
    }

    if (validationFields() === 0) {
        console.error('Complete correctamente los campos');
    } else {
        console.log('Estructura de datos, enviados:', {
            idOrganizacion: String(idOrganizacion),
            contrasenia: oNewPassword.value.confirmPassword
        });
        data.value = {
            idOrganizacion: String(idOrganizacion),
            contrasenia: oNewPassword.value.confirmPassword
        };
        await updatePassword();
        emptyInputs();
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