<template>
    <NavbarUsuario />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <div class="bg-gray-50 ">
        <!-- Navbar (igual que en la página principal) -->

        <!-- Hero Section del Voluntariado -->
        <div class="bg-green-700 py-20 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-2/3 mb-8 md:mb-0">
                        <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Educación</span>
                        <h1 class="text-3xl md:text-4xl font-bold text-white mt-4 mb-2">
                            {{ oPropuesta?.tituloPropuesta }}
                        </h1>
                        <div class="flex items-center text-white mb-6">
                            <div class="flex items-center mr-4">
                                <i class="fas fa-calendar-alt mr-2"></i>
                                <span>{{ formatDateRange(oPropuesta?.fechaInicio, oPropuesta?.fechaFinal) }}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                <span>{{ oPropuesta?.direccion }}</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <img alt="Unicef" class="w-10 h-10 rounded-full mr-3">
                            <div>
                                <p class="text-white font-semibold">{{ oPropuesta?.razonSocial }}</p>
                                <p class="text-green-200 text-sm">Organización verificada <i
                                        class="fas fa-check-circle ml-1"></i></p>
                            </div>
                        </div>
                    </div>
                    <div class="md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Únete a este voluntariado</h3>

                        <div class="mb-6">
                            <div class="flex justify-between text-sm text-gray-600 mb-1">
                                <span>42 voluntarios inscritos</span>
                                <span>84% completado</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 84%"></div>
                            </div>
                        </div>

                        <button @click="InscribeVolunteer(oPropuesta.idVoluntariado)"
                            class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4">
                            Inscribirme ahora
                        </button>

                        <div class="flex items-center text-gray-600 mb-2">
                            <i class="fas fa-users mr-2"></i>
                            <span>Presencial - Grupo</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-clock mr-2"></i>
                            <span>3 horas por semana</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div class="max-w-6xl mx-auto px-4 py-12">
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Columna izquierda -->
                <div class="md:w-2/3">
                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
                        <p class="text-gray-700 mb-4">{{ oPropuesta?.descripcionPropuesta }}</p>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Requisitos</h2>
                        <p class="text-gray-700 mb-4">{{ oPropuesta?.descripcionRequisito }}</p>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Beneficios</h2>
                        <ul class="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Certificado de participación</li>
                            <li>Capacitación inicial</li>
                            <li>Experiencia en trabajo comunitario</li>
                            <li>Posibilidad de continuar en otros proyectos</li>
                        </ul>
                    </div>
                    <button @click="BackTo"
                        class="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <i class="pi pi-arrow-left mr-2"></i>
                        Atrás
                    </button>
                </div>

                <!-- Columna derecha -->
                <div class="md:w-1/3">
                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Ubicación</h2>
                        <div class="h-48 bg-gray-200 rounded-lg mb-4">
                            <!-- Mapa placeholder -->
                            <div class="flex items-center justify-center h-full text-gray-500">
                                <i class="fas fa-map-marked-alt text-4xl"></i>
                            </div>
                        </div>
                        <p class="text-gray-700">{{ oPropuesta?.direccion }}</p>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Organización</h2>
                        <div class="flex items-center mb-4">
                            <img alt="Unicef" class="w-16 h-16 rounded-full mr-4">
                            <div>
                                <p class="font-semibold">{{ oPropuesta?.razonSocial }}</p>
                                <p class="text-green-600 text-sm">Verificada <i class="fas fa-check-circle ml-1"></i>
                                </p>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4">UNICEF trabaja en 190 países y territorios para salvar las vidas
                            de los niños, defender sus derechos y ayudarles a alcanzar su máximo potencial.</p>
                        <a href="#" class="text-green-600 font-semibold hover:underline">Ver más voluntariados de esta
                            organización</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer (igual que en la página principal) -->
    </div>

    <FooterSection />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CatalogeService from '../../../services/CatalogeService';

const route = useRoute();
const router = useRouter();
const oPropuesta = ref(null);
const idUsuario = localStorage.getItem('userId');


onMounted(() => {
    Initialize();
});

const Initialize = () => {
    const idVoluntariado = route.params.id;

    if (!idVoluntariado || idVoluntariado === "null") {
        console.log("No se encontro la propuesta.");
        return;
    }

    LoadPropuestasDetalle(idVoluntariado);
};

const LoadPropuestasDetalle = async (idVoluntariado) => {
    const response = await CatalogeService.GetCatalogeService(idVoluntariado);
    if (response.status === 200) {
        oPropuesta.value = response.data[0];
        console.log("propuesta detail:", oPropuesta);
    }
}

const formatDateRange = (start, end) => {
    if (!start || !end) return "Fechas no disponibles";
    const opts = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return `${new Date(start).toLocaleDateString("es-PE", opts)} - ${new Date(end).toLocaleDateString("es-PE", opts)}`;
};

async function InscribeVolunteer(idVoluntariado) {
    if (!idUsuario || !idVoluntariado) {
        console.error('Faltan datos para la inscripción.');
        return;
    }

    const request = {
        idUsuario: String(idUsuario),
        idVoluntariado: idVoluntariado
    };

    try {
        const response = await CatalogeService.CreateInscriptionVolunteerService(request);
        console.log('response inscribe:', response);
        if (response.status === 200) {
            console.log('Inscripción exitosa:', response.data);
            router.push('/portal/Voluntario/Propuestas');
        } else {
            console.error('Error al inscribirse en el voluntariado:', response);
        }
    } catch (error) {
        console.error('Excepción al inscribirse:', error);
    }
}

const BackTo = () => {
    router.push('/portal/Voluntario/Propuestas');
}

</script>
