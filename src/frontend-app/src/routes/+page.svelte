<script lang="ts">
  import { onMount } from 'svelte';
  import Menu from '../components/Menu.svelte';
  
  let currentSlide = 0;
  const slides = [
    { src: '/images/1.png', alt: 'Pet 1' },
    { src: '/images/2.png', alt: 'Pet 2' },
    { src: '/images/3.png', alt: 'Pet 3' },
    { src: '/images/4.png', alt: 'Pet 4' },
    { src: '/images/5.png', alt: 'Pet 5' }
  ];
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }
  
  function goToSlide(index: number) {
    currentSlide = index;
  }
  
  // Auto-play opcional
  onMount(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  });
</script>

<Menu />

Na Pais de Pets, acreditamos que cuidar de um animal é um gesto de amor. Por isso, oferecemos tudo o que você precisa para garantir saúde, conforto e felicidade ao seu melhor amigo. Aqui, tratamos cada pet como um membro importante da família com carinho, respeito e dedicação.

<div class="text-center p-32 p-60 " style="background-color: #CAF0F8;">
  <!-- Carousel personalizado -->
  <div class="relative max-w-4xl mx-auto overflow-hidden rounded-lg " >
    <!-- Slides -->
    <div class="relative h-110 ">
      {#each slides as slide, index}
        <div
          class="absolute top-0 left-0 w-200 h-110 transition-opacity duration-700"
          class:opacity-100={currentSlide === index}
          class:opacity-0={currentSlide !== index}
          class:pointer-events-none={currentSlide !== index}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            class="w-full h-full object-cover"
          />
        </div>
      {/each}
    </div>
    
    <!-- Botões de navegação -->
    <button
      on:click={prevSlide}
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
    >
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button
      on:click={nextSlide}
      class="absolute top-1/2 right-29 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
    >
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    <!-- Indicadores -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {#each slides as slide, index}
        <button
          on:click={() => goToSlide(index)}
          class="w-3 h-3 rounded-full transition-all"
          class:bg-white={currentSlide === index}
        ></button>
      {/each}
    </div>
  </div>
<br> 
Oferecermos cuidados, acessórios e comidas para seu pet, seja ele um canino, felino ou ave, pensamos com amor e cuidado para uma maravilhosa experiência do seu pet no nosso estabelecimento 


</div>

<style>
  .opacity-100 {
    opacity: 1;
  }
  .opacity-0 {
    opacity: 0;
  }
  .pointer-events-none {
    pointer-events: none;
  }
</style>
