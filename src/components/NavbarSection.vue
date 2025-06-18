<template>
  <nav id="navbar" class="w-full bg-transparent absolute top-0 z-50">
    <div class="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between py-3">
      <!-- Botón de menú en móvil -->
      <button
        onclick="toggleMenu()"
        class="lg:hidden text-white dark:text-gray-800 focus:outline-none px-4"
      >
        <span class="sr-only">Abrir menú</span>
        ☰
      </button>

      <!-- Menú -->
      <div
        id="menu-collapse"
        class="hidden lg:flex lg:w-auto mt-4 lg:mt-0"
      >
        <ul
          class="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 text-white dark:text-gray-800"
        >
          <li>
            <a
              href="#alianzas"
              @click.prevent="ScrollIntoView('#alianzas')"
              class="font-medium hover:text-amber-400"
              >Alianzas</a
            >
          </li>
          <li>
            <a
              href="#propuestas"
              @click.prevent="ScrollIntoView('#propuestas')"
              class="font-medium hover:text-amber-400"
              >Propuestas</a
            >
          </li>
          <li>
            <a
              href="#nosotros"
              @click.prevent="ScrollIntoView('#nosotros')"
              class="font-medium hover:text-amber-400"
              >Nosotros</a
            >
          </li>
          <li>
            <a
              href="#actividades"
              @click.prevent="ScrollIntoView('#actividades')"
              class="font-medium hover:text-amber-400"
              >Actividades</a
            >
          </li>
          <li>
            <a
              href="#contacto"
              @click.prevent="ScrollIntoView('#contacto')"
              class="font-medium hover:text-amber-400"
              >Contactanos</a
            >
          </li>          
          <li>
            <router-link 
              to="/portafolio"
              class="cursor-pointer hover:text-amber-400 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                   width="24" 
                   height="24" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor" 
                   stroke-width="2" 
                   stroke-linecap="round" 
                   stroke-linejoin="round" 
                   class="lucide lucide-door-open-icon lucide-door-open">
                <path d="M11 20H2"/>
                <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/>
                <path d="M11 4H8a2 2 0 0 0-2 2v14"/>
                <path d="M14 12h.01"/>
                <path d="M22 20h-3"/>
              </svg>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Usuario -->
      <div class="flex items-center space-x-2">
        <router-link
          to="/login"
          class="p-2 font-medium text-white hover:text-amber-400"
          >Conectarse
        </router-link>
        <router-link
          to="/register"
          class="p-2 font-medium text-white hover:text-amber-400"
          >Registrarse
        </router-link>
      </div>
    </div>
  </nav>
</template>


<script>

export default {
    name: 'NavbarSection',
    data() {
        return {
            active: '#home'
        }
    },
    created() {
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('dir', 'ltr');

        var bodyElement = document.body;
        bodyElement.classList.add('font-rubik', 'text-base', 'text-slate-900', 'dark:text-white', 'dark:bg-slate-900');

        window.addEventListener('scroll', (ev) => {
            ev.preventDefault();
            const navbar = document.getElementById("navbar");
            if (
                document.body.scrollTop >= 50 ||
                document.documentElement.scrollTop >= 50
            ) {
                navbar.classList.add("is-sticky");
            } else {
                navbar.classList.remove("is-sticky");
            }


            var mybutton = document.getElementById("back-to-top");
            if (mybutton != null) {
                if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                    mybutton.classList.add("block");
                    mybutton.classList.remove("hidden");
                } else {
                    mybutton.classList.add("hidden");
                    mybutton.classList.remove("block");
                }
            }
        });
    },
    methods: {
        ScrollIntoView(elem) {
            this.active = elem;
            let ele = document.querySelector(elem);
            ele.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        toggleMenu() {
            let ele = document.getElementById('menu-collapse');
            ele.classList.toggle('hidden');
        }
    }
}

</script>