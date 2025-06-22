<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-2xl shadow-xl p-8">
            <!-- Toolbar Superior -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-2">
                <div>
                    <h1 class="text-3xl font-bold text-blue-900 flex items-center gap-3">
                        <i class="pi pi-chart-bar text-amber-400 text-4xl"></i>
                        Dashboard de Voluntario
                    </h1>
                    <p class="text-gray-500 mt-2 text-base">Visualiza el estado y evolución de tus postulaciones.</p>
                </div>
            </div>

            <!-- Contenedor de gráficos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Comparación por estado de inscripción -->
                <div class="bg-white shadow-md p-6 rounded-xl border-l-8 border-amber-400 flex flex-col">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="pi pi-inbox text-amber-400 text-2xl"></i>
                        <h2 class="text-lg font-semibold text-gray-700">Estado de Inscripciones</h2>
                    </div>
                    <Chart type="bar" :data="chartEstadoInscripcionData" :options="chartOptions"
                        style="min-height:260px" />
                </div>

                <!-- Evolución de propuestas -->
                <div class="bg-white shadow-md p-6 rounded-xl border-l-8 border-violet-500 flex flex-col">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="pi pi-chart-line text-violet-500 text-2xl"></i>
                        <h2 class="text-lg font-semibold text-gray-700">Evolución de Propuestas</h2>
                    </div>
                    <Chart type="line" :data="chartEvolucionData" :options="chartOptions" style="min-height:260px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import RegistrationService from '../../services/RegistrationService';

const chartEstadoInscripcionData = ref();
const chartEvolucionData = ref();
const chartOptions = ref();
const oListRegistrations = ref([]);
const idUser = localStorage.getItem('userId');

onMounted(async () => {
    await LoadRegistrations(idUser);
    chartEstadoInscripcionData.value = setChartEstadoInscripcionData();
    chartEvolucionData.value = setChartEvolucionData();
    chartOptions.value = setChartOptions();
});

const LoadRegistrations = async () => {
    try {
        const response = await RegistrationService.GetRegistrationsService(idUser);
        console.log("loadInscriptions:", response.data);
        if (response.status === 200) {
            oListRegistrations.value = response.data;
        }
    } catch (error) {
        console.error("Error al cargar las inscripciones:", error);
    }
};

// Gráfico de comparación de propuestas activas e inactivas
const setChartEstadoInscripcionData = () => {
    const pendientes = oListRegistrations.value.filter(reg => reg.estadoInscripcion === "Pendiente").length;
    const aceptadas = oListRegistrations.value.filter(reg => reg.estadoInscripcion === "Aceptado").length;

    return {
        labels: ["Pendientes", "Aceptadas"],
        datasets: [
            {
                label: "Postulaciones",
                data: [pendientes, aceptadas],
                backgroundColor: ["rgba(251, 191, 36, 0.3)", "rgba(34, 197, 94, 0.3)"],
                borderColor: ["rgb(251, 191, 36)", "rgb(34, 197, 94)"],
                borderWidth: 1
            }
        ]
    };
};


// Gráfico de evolución de propuestas (ejemplo con fechas)
const setChartEvolucionData = () => {
    const fechas = oListRegistrations.value.map(propuesta => formatDate(propuesta.fechaInicio));
    const cantidades = oListRegistrations.value.map((_, index) => index + 1);

    return {
        labels: fechas,
        datasets: [
            {
                label: "Evolución de Propuestas",
                data: cantidades,
                borderColor: "rgb(139, 92, 246)",
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                borderWidth: 2
            }
        ]
    };
};

// Opciones generales del gráfico
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
};

// Función para formatear fechas
const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
};
</script>