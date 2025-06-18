<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="user" class="block mb-2 text-sm font-medium text-gray-700">Usuario(DNI/RUC)</label>
          <input type="number" id="user" v-model="user" required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" id="password" v-model="password" required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        <button type="submit" class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Iniciar
          Sesión</button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        ¿No tienes una cuenta?
        <router-link to="/register" class="text-blue-600 hover:underline">Crear Cuenta</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";
import LoginService from '../../services/LoginService';

const user = ref<string>('')
const password = ref<string>('')

const router = useRouter();

function handleSubmit() {

  console.log('Iniciando sesión con:', {
    user: String(user.value),
    password: password.value
  })

  const rol = selectedRol();
  if (rol === 'Invalid') {
    alert('El DNI o RUC ingresado es inválido.')
  }
  else if (rol === 'DNI') {
    console.log('Iniciando sesión como usuario con Voluntario/DNI');
    loginVolunteer();
  } else if (rol === 'RUC') {
    console.log('Iniciando sesión como organización con Organizacion/RUC');
    loginOrganization();
  }

}

function selectedRol() {
  const wordscount = String(user.value).length;
  if (wordscount === 8) {
    return 'DNI'
  } else if (wordscount === 11) {
    return 'RUC'
  } else {
    return 'Invalid'
  }
}

async function loginOrganization() {
  try {
    const response = await LoginService.OrganizationLogin(String(user.value));
    console.log('Obteniendo datos de la API:', response.data);
    if (response.data.password === password.value) {
      console.log('Contraseña correcta, redirigiendo...');
      localStorage.setItem('userId', response.data.login);
      router.push({ path: `/portal` });
    } else {
      console.error('Contraseña incorrecta');
      alert('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al loguear organización:', error);
  }
}

async function loginVolunteer() {
  try {
    const response = await LoginService.VolunteerLogin(String(user.value));
    console.log('Obteniendo datos de la API:', response.data);
    if (response.data.password === password.value) {
      console.log('Contraseña correcta, redirigiendo...');
      localStorage.setItem('userId', response.data.login);
      router.push({ path: `/portal` });
    } else {
      console.error('Contraseña incorrecta');
      alert('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al loguear voluntario:', error);
  }
}

</script>
