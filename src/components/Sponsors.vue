<script setup lang="ts">

// Importa los SVG personalizados
import CausaIcon from "../icons/Causa.vue";
import CreaplusIcon from "../icons/Creaplus.vue";
import Continental from "../icons/Continental.vue";
import Monsterinc from "../icons/Monsterinc.vue";
import Pizzaplanet from "../icons/Pizzaplanet.vue";

interface Sponsor {
  icon: any;
}

const sponsors: Sponsor[] = [
  {
    icon: Monsterinc,
  },
  {
    icon: CreaplusIcon,
  },
    {
    icon: Continental,
  },
  {
    icon: CreaplusIcon,
  },
    {
    icon: Pizzaplanet,
  },
  {
    icon: CreaplusIcon,
  },
    {
    icon: CausaIcon,
  },
  {
    icon: CreaplusIcon,
  },
      {
    icon: CausaIcon,
  },
  {
    icon: CreaplusIcon,
  },    {
    icon: CausaIcon,
  },
  {
    icon: CreaplusIcon,
  },
];

// Duplica los sponsors para efecto infinito
const sponsorsDoubled = [...sponsors, ...sponsors];
</script>

<template>
  <section id="sponsors" class="px-5">
    <h2 class="text-sm md:text-md text-center mb-5 -mt-1">Nuestros Sponsors confian en nuestros Voluntariados</h2>
    <div class="overflow-hidden w-full">
      <div class="carousel-track flex gap-[3rem]">
        <div
          v-for="{ icon } in sponsorsDoubled"
        >
          <div class="flex items-center text-xl text-neutral-800 md:text-2xl font-medium">
            <component
              :is="icon"
              class="mr-2 w-full h-16"
              stroke-width="3"
            />

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-track {
  animation: scroll-x 20s linear infinite;
  width: max-content;
}
@keyframes scroll-x {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
