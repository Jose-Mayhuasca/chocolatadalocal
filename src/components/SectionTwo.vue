<template>
    <div class="max-w-screen-xl mx-auto py-30 my-20">    
        <div class="flex flex-row w-full gap-6">
            <!-- Primera columna -->
            <div class="w-1/2 flex flex-col justify-between my-20 pr-40">
                <div class="text-gray-800 text-6xl font-bold">
                    Alianzas con propósito
                </div>
                <div class="text-gray-700 text-lg font-medium">
                    <div>
                    Cuando nos unimos, el cambio se multiplica. En CausaViva construimos alianzas sólidas con organizaciones que comparten nuestros valores y compromiso, para juntos generar un impacto real y duradero en las comunidades.
                    </div>
                    <div class="mt-4">
                    Cada alianza abre una puerta para llevar oportunidades y esperanza a quienes más lo necesitan.
                    </div>
                </div>

                <!-- Contenedor padre con la clase group -->
                <div class="flex items-center justify-end w-fit">
                    <a
                        href="https://creamas.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group flex items-center cursor-pointer text-gray-700 text-md font-bold transition bg-linear-to-bl from-yellow-400/90 to-yellow-500 hover:bg-gradient-to-bl hover:from-yellow-400/80 hover:to-yellow-500/90 rounded-full px-4 py-2"
                    >
                        <span class="transition duration-300">Ver más</span>
                        <div class="transition-transform transform duration-300 ml-1 group-hover:translate-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Segunda columna en cuadrícula -->
            <div class="w-1/2 grid grid-cols-2 grid-rows-2 gap-4">
                <!-- Boton Vidas Tocadas -->
                <div class="flex flex-col justify-end items-end m-4">
                    <a
                        href="https://creamas.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer w-36 h-36 transition bg-linear-to-bl from-yellow-400/90 to-yellow-500 hover:bg-gradient-to-bl hover:from-yellow-400/80 hover:to-yellow-500/90 rounded-2xl p-4 flex flex-col justify-between items-end group"
                    >
                        <div class="flex items-center text-neutral-800 transition-transform transform duration-400 group-hover:translate-x-2 group-hover:-translate-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
                                <path d="M7 7h10v10"/>
                                <path d="M7 17 17 7"/>
                            </svg>
                        </div>
                        <div class="flex flex-col justify-end items-end">
                            <div class="flex flex-row items-center">
                                <div class="bg-neutral-800 h-[2px] w-16 my-2 mx-1"></div>
                                <div class="text-neutral-800 text-lg font-semibold">30k+</div>
                            </div>
                            <div class="text-neutral-800 text-md font-semibold">Vidas Tocadas</div>
                        </div>
                    </a>
                </div>

                <!-- Arriba derecha -->
                <div class="flex items-end justify-start">
                    <img class="w-70 h-70 object-cover rounded-2xl" src="/public/imagenes/crea2.jpg" />
                </div>         

                <!-- Abajo izquierda -->
                <div class="flex items-end justify-end">
                    <img class="w-80 h-80 object-cover rounded-2xl" src="/public/imagenes/crea1.jpg" />
                </div>

                <!-- Abajo izquierda ("Crea+") -->
                <div class="flex justify-start items-end p-4">                                  
                        <Creaplus class="w-55 h-auto text-blue-700 hover:text-blue-600" href="#Creaplus" />                                         
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Creaplus from '../icons/Creaplus.vue';

export default {
  name: 'SectionTwo',
  components: {
    Creaplus,
  },

};
</script>