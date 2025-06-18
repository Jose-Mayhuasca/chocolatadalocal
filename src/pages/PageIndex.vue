<script setup lang="ts">
import SectionOne from '../components/SectionOne.vue';
import SectionTwo from '../components/SectionTwo.vue';
import SectionThree from '../components/SectionThree.vue';
import SectionFour from '../components/SectionFour.vue';
import SectionFive from '../components/SectionFive.vue';
import SectionSix from '../components/SectionSix.vue';

import FooterSection from '../components/FooterSection.vue';
</script>

<template>
  <SectionOne />
  <SectionTwo id="alianzas"/>
  <SectionThree id="propuestas"/>
  <SectionFour id="nosotros"/>
  <SectionFive id="actividades"/>
  <SectionSix id="contacto"/>

  <FooterSection />
</template>

<style scoped>

</style>
