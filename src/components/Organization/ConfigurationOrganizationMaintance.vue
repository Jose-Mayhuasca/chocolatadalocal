<template>
    <div
        class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen flex justify-center items-start">
        <div class="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
            <!-- Toolbar Superior -->
            <div class="flex items-center gap-3 mb-10">
                <h1 class="text-3xl font-bold text-blue-900"><i class="pi pi-cog text-blue-500 text-4xl"></i>
                    Configuración de la Organización</h1>
            </div>

            <!-- Sección Perfil -->
            <section class="mb-10">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-gray-700 flex items-center gap-2">
                        <i class="pi pi-building text-blue-400"></i>
                        Datos del perfil
                    </h2>
                    <button @click="editProfile(idOrganizacion)"
                        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow transition">
                        <i class="pi pi-pencil mr-2"></i>
                        Editar
                    </button>
                </div>
                <hr class="border-gray-200 mb-2" />
            </section>

            <!-- Sección Contraseña -->
            <section>
                <div class="flex items-center gap-2 mb-4">
                    <i class="pi pi-lock text-amber-400"></i>
                    <h2 class="text-xl font-semibold text-gray-700">Cambiar contraseña</h2>
                </div>
                <form @submit.prevent="handleUpdatePassword" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Contraseña actual -->
                        <div class="relative">
                            <input type="password" id="currentPassword" v-model="oNewPassword.currentPassword" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="currentPassword" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oNewPassword.currentPassword ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Contraseña actual
                            </label>
                        </div>
                        <!-- Nueva contraseña -->
                        <div class="relative">
                            <input type="password" id="newPassword" v-model="oNewPassword.newPassword" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="newPassword" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oNewPassword.newPassword ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Nueva contraseña
                            </label>
                        </div>
                        <!-- Confirmar contraseña -->
                        <div class="relative md:col-span-2">
                            <input type="password" id="confirmPassword" v-model="oNewPassword.confirmPassword" required
                                class="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder=" " />
                            <label for="confirmPassword" :class="[
                                'absolute left-4 bg-white px-1 text-sm text-gray-500 pointer-events-none transition-all',
                                oNewPassword.confirmPassword ? '-top-3 text-xs text-blue-500' : 'top-1'
                            ]">
                                Confirmar nueva contraseña
                            </label>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-4">
                        <button type="submit"
                            class="flex items-center px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 font-semibold shadow transition">
                            <i class="pi pi-save mr-2"></i>
                            Guardar
                        </button>
                    </div>
                </form>
            </section>
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