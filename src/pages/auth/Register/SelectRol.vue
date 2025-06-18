<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-gray-800">Seleccione su tipo de usario</h2>
            <form @submitRol.prevent="handleSubmitRol" class="space-y-6">
                <!-- <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" id="name" v-model="name" required class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" id="email" v-model="email" required class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" v-model="password" required class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                </div> -->
                <!-- <button type="submitRol" id="organization"  class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Organizacion</button>
                <button type="submitRol" class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Voluntario</button> -->

                <button type="button" @click="newRegister('Organizacion')"
                    class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Organizacion
                </button>
                <button type="button" @click="newRegister('Voluntario')"
                    class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Voluntario
                </button>
            </form>
            <p class="mt-4 text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-blue-600 hover:underline">Iniciar Sesión</router-link>
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
  if(selectedRol === 'Organizacion') {
    route = '/registro-organizacion'
  } 
  else if(selectedRol === 'Voluntario') {
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