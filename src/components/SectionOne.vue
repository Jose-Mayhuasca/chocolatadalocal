<template>
  <div class="relative">
    <!-- Navbar dentro del fondo -->
    <NavbarSection class="absolute top-0 left-0 w-full" />
    <!-- comment -->
    <!-- Hero Start -->
    <section class="py-28 lg:py-56 w-full table relative bg-center bg-cover" id="home">
      <!-- Imagen de fondo -->
      <video
        src="/public/videos/vbanner1.mp4"
        class="w-full h-full object-cover absolute inset-0 z-0"
        alt="home"
        autoplay
        loop
        muted
        playsinline
      ></video>

      <div class="absolute inset-0 bg-black opacity-60"></div>

      <div class="max-w-screen-xl mx-auto relative">
        <div class="my-8">
          <Causa class="text-white" width="300" />
        </div>
        <div class="grid grid-cols-1 my-15">
          <h4
            class="text-white lg:text-4xl text-3xl lg:leading-normal leading-normal font-medium mb-7 position-relative"
          >
            Tienes el poder de cambiar vidas,<br />transformar realidades y
            <a class="text-amber-300/90">
              <span
                class="typewrite relative text-type-element bg-gradient-to-bl from-yellow-400/90 to-yellow-500 bg-clip-text text-transparent py-1"
                ref="typedText"
              ></span>
            </a>
          </h4>
        </div>
      </div>
    </section>
    <!-- Hero End -->
  </div>
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
import bgindexone from '/public/imagenes/bgindexone.jpg';
import Causa from '../icons/Causa.vue';
import Typed from 'typed.js';

export default {
  name: 'SectionOne',
  components: {
    NavbarSection,
    FooterSection,
    Causa,
    Typed,
  },
  data() {
    return {
      typed: null,
      bgindexone,
    };
  },
  mounted() {
    this.setupTyped();
  },
  methods: {
    setupTyped() {
      const options = {
        strings: [
          'despertar conciencias',
          'cambiar destinos',
          'crear futuros',
          'crear oportunidades',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
      };

      this.typed = new Typed(this.$refs.typedText, options);
    },
  },
};
</script>
