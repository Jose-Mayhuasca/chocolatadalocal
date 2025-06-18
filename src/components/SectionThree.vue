<template>
<div class="flex flex-col gap-5 py-6 px-5">
  <!-- Fila 1: dos elementos (2/3 y 1/3) -->
  <div class="flex gap-5 h-90">
    <!-- Video principal (2/3) - Con más interacción -->
    <div class="basis-2/3 relative overflow-hidden rounded-xl group">
      <video
        src="/videos/vbanner4.mp4"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      ></video>

      <div class="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>

      <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
        <div class="text-center space-y-4 transform group-hover:scale-105 transition-transform duration-500">
          <h3 class="text-4xl font-bold text-white animate-multi-effect">
            <span class="inline-block">Conoce a nuestros</span>
            <span class="inline-block text-gold-400 animate-glow-pulse ml-2">aliados estratégicos</span>
          </h3>
          <p class="text-xl text-white opacity-90 animate-underline-expand">
            Descubre cómo juntos estamos creando un impacto positivo y duradero
          </p>
        </div>
      </div>
      
      <!-- Efecto de partículas en hover -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div class="particle absolute w-2 h-2 bg-white rounded-full animate-particle-1"></div>
        <div class="particle absolute w-2 h-2 bg-white rounded-full animate-particle-2"></div>
        <div class="particle absolute w-2 h-2 bg-gold-400 rounded-full animate-particle-3"></div>
      </div>
    </div>

    <!-- Video secundario (1/3) - Animación moderna -->
    <div class="basis-1/3 relative overflow-hidden rounded-xl group">
      <video
        src="/videos/vbanner2.mp4"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      ></video>

      <div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity duration-500"></div>

      <!-- Animación de palabras centradas -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="relative w-full h-20 flex items-center justify-center">
          <span class="animated-word">Innovación</span>
          <span class="animated-word">Constante</span>
          <span class="animated-word">Resultados</span>
          <span class="animated-word">Tangibles</span>
        </div>
      </div>

      <!-- Efecto de borde en hover -->
      <div class="absolute inset-0 border-4 border-transparent group-hover:border-white/30 transition-all duration-700 rounded-xl pointer-events-none"></div>
    </div>
  </div>

  <!-- Fila 2: dos elementos (1/4 y 3/4) -->
  <div class="flex gap-5 h-90">
    <!-- Video terciario (1/4) - Manteniendo tu animación favorita -->
    <div class="basis-1/4 relative overflow-hidden rounded-xl group">
      <video
        src="/videos/vbanner3.mp4"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      ></video>

      <div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div class="text-center relative h-12 w-full">
          <p class="text-2xl text-white font-light animate-rotate-words">
            <span class="absolute inset-0 flex items-center justify-center">Colaboración</span>
            <span class="absolute inset-0 flex items-center justify-center">Innova</span>
            <span class="absolute inset-0 flex items-center justify-center">Impacto</span>
            <span class="absolute inset-0 flex items-center justify-center">Resultados</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Video destacado (3/4) -->
    <div class="basis-3/4 relative overflow-hidden rounded-xl group">
      <video
        src="/videos/vbanner1.mp4"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      ></video>

      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent group-hover:from-black/50 transition-all duration-500"></div>

      <div class="absolute inset-0 flex items-center justify-start pointer-events-none pl-12 pr-24">
        <div class="text-left max-w-2xl">
          <h3 class="text-5xl font-bold text-white mb-6 animate-gradient-text">
            Historias que transforman
          </h3>
          <p class="text-xl text-white opacity-90 leading-relaxed animate-text-reveal">
            Cada proyecto es una nueva oportunidad para crear valor compartido
          </p>
          <div class="mt-8 animate-pulse-slow group-hover:animate-none group-hover:scale-110 transition-transform duration-300">
            <span class="inline-block px-6 py-3 bg-white/20 text-white rounded-full text-lg font-medium hover:bg-white/30 transition-colors duration-300 cursor-pointer">
              Conoce más
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fila 3: sponsors -->
  <div class="w-full animate-fade-in-long">
    <Sponsors />
  </div>
</div>
</template>

<script>
import Sponsors from "../components/Sponsors.vue";
export default {
  name: "SectionThree",
  components: {
    Sponsors,
  },
};
</script>

<style>
/* ANIMACIONES PARA EL VIDEO PRINCIPAL */
/* Efecto múltiple para el título principal */
@keyframes multiEffect {
  0% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-5px) scale(1.02); }
  50% { transform: translateY(0) scale(1); }
  75% { transform: translateY(-3px) scale(1.01); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes glowPulse {
  0%, 100% { 
    text-shadow: 0 0 5px rgba(245, 200, 50, 0.5);
    opacity: 1;
  }
  50% { 
    text-shadow: 0 0 15px rgba(245, 200, 50, 0.8);
    opacity: 0.9;
  }
}
.animate-multi-effect {
  animation: multiEffect 6s ease-in-out infinite;
}
.animate-glow-pulse {
  animation: glowPulse 3s ease-in-out infinite;
}

/* Subrayado animado (que te gustó) */
@keyframes underlineExpand {
  0% { background-size: 0% 2px; }
  50% { background-size: 100% 2px; }
  100% { background-size: 0% 2px; }
}
.animate-underline-expand {
  background: linear-gradient(to right, white, white) no-repeat;
  background-position: 0% 100%;
  background-size: 0% 2px;
  animation: underlineExpand 4s ease-in-out infinite;
  padding-bottom: 4px;
}

/* Efecto de partículas */
@keyframes particle-1 {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(50px, -80px); opacity: 0; }
}
@keyframes particle-2 {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(-70px, -60px); opacity: 0; }
}
@keyframes particle-3 {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(30px, -100px); opacity: 0; }
}
.animate-particle-1 {
  animation: particle-1 4s linear infinite;
  top: 60%;
  left: 40%;
}
.animate-particle-2 {
  animation: particle-2 5s linear infinite 1s;
  top: 55%;
  left: 50%;
}
.animate-particle-3 {
  animation: particle-3 6s linear infinite 0.5s;
  top: 65%;
  left: 45%;
}

/* ANIMACIÓN MODERNA PARA VIDEO SECUNDARIO */
@keyframes modernTextIn {
  0% { 
    transform: translateY(30px) rotateX(-90deg);
    opacity: 0;
    text-shadow: 0 5px 10px rgba(0,0,0,0.5);
  }
  50% { 
    transform: translateY(0) rotateX(0);
    opacity: 1;
    text-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  100% {
    transform: translateY(-20px) rotateX(90deg);
    opacity: 0;
    text-shadow: 0 -5px 10px rgba(0,0,0,0.5);
  }
}
.animate-modern-text .word-block {
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  animation: modernTextIn 8s infinite;
}
.animate-modern-text .word-block:nth-child(1) { animation-delay: 0s; }
.animate-modern-text .word-block:nth-child(2) { animation-delay: 2s; }
.animate-modern-text .word-block:nth-child(3) { animation-delay: 4s; }
.animate-modern-text .word-block:nth-child(4) { animation-delay: 6s; }

/* Manteniendo tu animación favorita para el video terciario */
@keyframes rotateWords {
  0%, 15% { opacity: 0; transform: translateY(15px); }
  20%, 30% { opacity: 1; transform: translateY(0); }
  35%, 100% { opacity: 0; transform: translateY(-15px); }
}
.animate-rotate-words span {
  animation: rotateWords 12s linear infinite;
}
.animate-rotate-words span:nth-child(2) { animation-delay: 3s; }
.animate-rotate-words span:nth-child(3) { animation-delay: 6s; }
.animate-rotate-words span:nth-child(4) { animation-delay: 9s; }

/* Animaciones para el video destacado */
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-text {
  background: linear-gradient(90deg, #ffffff, #f9d423, #ffffff);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradientFlow 8s linear infinite;
}

@keyframes textReveal {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
}
.animate-text-reveal {
  animation: textReveal 3s ease-out infinite alternate;
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
}
.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

/* Animación para sponsors */
@keyframes fadeInLong {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-long {
  animation: fadeInLong 2s ease-out both;
}

/* Transiciones para hover */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Animación tipo carrusel para palabras */
.animated-word {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  margin: auto;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  animation: wordCarousel 8s infinite;
}

.animated-word:nth-child(1) { animation-delay: 0s; }
.animated-word:nth-child(2) { animation-delay: 2s; }
.animated-word:nth-child(3) { animation-delay: 4s; }
.animated-word:nth-child(4) { animation-delay: 6s; }

@keyframes wordCarousel {
  0% { opacity: 0; transform: translateY(20px) scale(0.95);}
  10% { opacity: 1; transform: translateY(0) scale(1);}
  25% { opacity: 1; transform: translateY(0) scale(1);}
  35% { opacity: 0; transform: translateY(-20px) scale(0.95);}
  100% { opacity: 0; transform: translateY(20px) scale(0.95);}
}
</style>
