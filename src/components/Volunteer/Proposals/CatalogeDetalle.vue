<script setup>
// import FooterSection from "../components/FooterSection.vue";
// import NavbarUsuario from "../components/NavbarUsuario.vue";


</script>

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
                        <h1 class="text-3xl md:text-4xl font-bold text-white mt-4 mb-2">Apoyo escolar en zonas rurales</h1>
                        <div class="flex items-center text-white mb-6">
                            <div class="flex items-center mr-4">
                                <i class="fas fa-calendar-alt mr-2"></i>
                                <span>15 Mar - 15 Jun (3 meses)</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                <span>Lima, Perú</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <img src="https://via.placeholder.com/40" alt="Unicef" class="w-10 h-10 rounded-full mr-3">
                            <div>
                                <p class="text-white font-semibold">Unicef</p>
                                <p class="text-green-200 text-sm">Organización verificada <i class="fas fa-check-circle ml-1"></i></p>
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
                        
                        <button class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4">
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
                        <p class="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue lacus.</p>
                        <p class="text-gray-700">Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.</p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Requisitos</h2>
                        <ul class="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Mayor de 18 años</li>
                            <li>Disponibilidad los fines de semana</li>
                            <li>Experiencia previa en enseñanza (deseable)</li>
                            <li>Compromiso por los 3 meses del programa</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Beneficios</h2>
                        <ul class="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Certificado de participación</li>
                            <li>Capacitación inicial</li>
                            <li>Experiencia en trabajo comunitario</li>
                            <li>Posibilidad de continuar en otros proyectos</li>
                        </ul>
                    </div>
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
                        <p class="text-gray-700">Av. Javier Prado 1234, San Isidro, Lima</p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Organización</h2>
                        <div class="flex items-center mb-4">
                            <img src="https://via.placeholder.com/60" alt="Unicef" class="w-16 h-16 rounded-full mr-4">
                            <div>
                                <p class="font-semibold">Unicef</p>
                                <p class="text-green-600 text-sm">Verificada <i class="fas fa-check-circle ml-1"></i></p>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-4">UNICEF trabaja en 190 países y territorios para salvar las vidas de los niños, defender sus derechos y ayudarles a alcanzar su máximo potencial.</p>
                        <a href="#" class="text-green-600 font-semibold hover:underline">Ver más voluntariados de esta organización</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer (igual que en la página principal) -->
    </div>

    <FooterSection />
</template>
