<template>
    <div class="w-full py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        <div class="bg-white rounded-lg shadow p-6">
            <!-- Toolbar Superior -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Dashboards</h1>
            </div>

            <!-- Contenedor de gráficos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Comparación por estado de inscripción -->
                <div class="card bg-white shadow-md p-4 rounded-lg">
                    <h2 class="text-lg font-semibold text-gray-700 mb-3">Estado de Inscripciones</h2>
                    <Chart type="bar" :data="chartEstadoInscripcionData" :options="chartOptions" />
                </div>

                <!-- Otro gráfico (ejemplo: Evolución de propuestas) -->
                <div class="card bg-white shadow-md p-4 rounded-lg">
                    <h2 class="text-lg font-semibold text-gray-700 mb-3">Evolución de Propuestas</h2>
                    <Chart type="line" :data="chartEvolucionData" :options="chartOptions" />
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