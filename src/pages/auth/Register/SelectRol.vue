<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <h2 class="text-2xl font-bold text-center text-blue-900 mb-6">Seleccione su tipo de usuario</h2>
            <div class="flex flex-col gap-6">
                <button type="button" @click="newRegister('Organizacion')"
                    class="flex items-center gap-4 w-full px-6 py-5 bg-blue-50 border border-blue-200 rounded-xl shadow hover:bg-blue-100 hover:scale-105 transition-all duration-200">
                    <i class="pi pi-building text-blue-600 text-3xl"></i>
                    <span class="flex-1 text-lg font-semibold text-blue-800 text-left">Organización</span>
                    <i class="pi pi-angle-right text-blue-400 text-xl"></i>
                </button>
                <button type="button" @click="newRegister('Voluntario')"
                    class="flex items-center gap-4 w-full px-6 py-5 bg-amber-50 border border-amber-200 rounded-xl shadow hover:bg-amber-100 hover:scale-105 transition-all duration-200">
                    <i class="pi pi-user text-amber-500 text-3xl"></i>
                    <span class="flex-1 text-lg font-semibold text-amber-700 text-left">Voluntario</span>
                    <i class="pi pi-angle-right text-amber-400 text-xl"></i>
                </button>
            </div>
            <p class="mt-6 text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-blue-600 hover:underline font-semibold">Iniciar
                    Sesión</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Variable reactiva para almacenar el rol seleccionado
const rol = ref('')
const router = useRouter()

function newRegister(selectedRol: string) {
    rol.value = selectedRol;
    let route = "";
    if (selectedRol === 'Organizacion') {
        route = '/registro-organizacion'
    }
    else if (selectedRol === 'Voluntario') {
        route = '/registro-voluntario'
    }
    router.push(route) // Redirige a la página
}

// Función para establecer el rol según el botón presionado
function setRol(selectedRol: string) {
    rol.value = selectedRol
    handleSubmitRol()
}

// Función para manejar el envío del formulario
function handleSubmitRol() {
    console.log('Enviando rol seleccionado:', {
        rol: rol.value,
    })

    // Aquí podrías agregar validación o enviar a una API, etc.
}
</script>