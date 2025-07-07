<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
      <div class="flex flex-col items-center gap-2 mb-4">
        <i class="pi pi-user-lock text-blue-500 text-4xl"></i>
        <h2 class="text-2xl font-bold text-center text-blue-900">Iniciar Sesión</h2>
        <p class="text-gray-500 text-sm text-center">Accede a tu cuenta de voluntario u organización</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="user" class="block mb-2 text-sm font-medium text-gray-700">Usuario (DNI/RUC)</label>
          <input id="user" v-model="user" required type="text" inputmode="numeric" maxlength="11" pattern="\d{8}|\d{11}"
            @input="user = user.replace(/\D/g, '').slice(0, 11)"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
          <p v-if="user.length > 0 && user.length !== 8 && user.length !== 11" class="text-sm text-red-600 mt-1">
            El usuario debe tener 8 (DNI) u 11 dígitos (RUC)
          </p>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" id="password" v-model="password" required maxlength="25"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition" />
        </div>
        <button type="submit"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <i class="pi pi-sign-in"></i>
          Iniciar Sesión
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        ¿No tienes una cuenta?
        <router-link to="/register" class="text-blue-600 hover:underline font-semibold">Crear Cuenta</router-link>
      </p>
      <p class="mt-4 text-sm text-center text-gray-600">
        <a class="text-blue-600 hover:underline font-semibold cursor-pointer" @click="openWhatsApp">Olvidé mi
          contraseña</a>
      </p>

      <!-- Toast personalizado -->
      <div v-if="toast.show" :class="[
        'fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 min-w-[280px] max-w-md',
        toast.type === 'success' ? 'bg-green-100 border border-green-300 text-green-800' :
          toast.type === 'error' ? 'bg-red-100 border border-red-300 text-red-800' :
            toast.type === 'warning' ? 'bg-yellow-100 border border-yellow-300 text-yellow-800' :
              'bg-blue-100 border border-blue-300 text-blue-800'
      ]" transition>
        <i :class="[
          'text-xl',
          toast.type === 'success' ? 'pi pi-check-circle text-green-600' :
            toast.type === 'error' ? 'pi pi-times-circle text-red-600' :
              toast.type === 'warning' ? 'pi pi-exclamation-triangle text-yellow-600' :
                'pi pi-info-circle text-blue-600'
        ]"></i>
        <div class="flex-1">
          <p class="font-semibold text-sm">{{ toast.message }}</p>
        </div>
        <button @click="toast.show = false" class="text-gray-400 hover:text-gray-600 transition">
          <i class="pi pi-times"></i>
        </button>
      </div>


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

const toast = ref({
  show: false,
  message: '',
  type: 'success' // 'success' | 'error'
});

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false }, 3000);
}

//redireccionamiento a soporte
const wspNumber = ref('51951703662');
const wspMessage = ref('Hola, necesito ayuda para recuperar mi contraseña en CausaViva.');

function openWhatsApp() {
  const url = `https://wa.me/${wspNumber.value}?text=${encodeURIComponent(wspMessage.value)}`;
  window.open(url, '_blank');
}

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
    console.log('Intentando iniciar sesión como Voluntario/DNI');
    loginVolunteer();
  } else if (rol === 'RUC') {
    console.log('Intentando iniciar sesión como Organizacion/RUC');
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
    // console.log('Buscando datos:', response);

    if (response.status === 200) {
      if (response.data.password === password.value) {
        showToast('¡Ingreso exitoso!', 'success');
        localStorage.setItem('userId', response.data.login);
        setTimeout(() => {
          router.push({ path: `/portal/Organizacion/Propuestas` });
        }, 1200);
      }
      else {
        showToast('Contraseña incorrecta. Inténtalo de nuevo.', 'error');
      }
    }
    else {
      showToast('Usuario no existe. Inténtalo de nuevo.', 'error');
    }
  } catch (error) {
    console.error('Error al loguear con organización:', error);
  }
}

async function loginVolunteer() {
  try {
    const response = await LoginService.VolunteerLogin(String(user.value));
    // console.log('Obteniendo datos de la API:', response.data);

    if (response.status === 200) {
      if (response.data.password === password.value) {
        showToast('¡Ingreso exitoso!', 'success');
        localStorage.setItem('userId', response.data.login);
        setTimeout(() => {
          router.push({ path: `/portal/Voluntario/Propuestas` });
        }, 1200);
      }
      else {
        showToast('Contraseña incorrecta. Inténtalo de nuevo.', 'error');
      }
    }
    else {
      showToast('Usuario no existe. Inténtalo de nuevo.', 'error');
    }
  } catch (error) {
    console.error('Error al loguear voluntario:', error);
  }
}

</script>
