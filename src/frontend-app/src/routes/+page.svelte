<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import Menu from '../components/Menu.svelte';
  import {  P, ImagePlaceholder, Skeleton, TextPlaceholder } from "flowbite-svelte";
  
</script>

<Menu />

<div class="text-center p-32 p-60" style="background-color: #CAF0F8;">
  <div class=""></div>
  <div class="relative animate-fade-in-up s-SPDF-ly-wfFD" style="animation-delay:.06s;">
    <div class="group rounded-2xl border border-amber=200/40 bg-amber-50/5 backdrop-blur p-2 shadow-xl feature-card-animated s-SPDF-ly-wfFD">
      <div class="relative aspect-[16/10 w-full overflow-hidden rounded-xl s-SPDF-ly-wfFD" role="region" aria-label="Carrosel dos Pets">
        <img src="/images/1.png" alt="Pet 1" class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out s-SPDF-ly-wfFD" style="opacity: 1;">
        <img src="/images/2.png" alt="Pet 2" class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out s-SPDF-ly-wfFD" style="opacity: 0;">
        <img src="/images/3.png" alt="Pet 2" class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out s-SPDF-ly-wfFD" style="opacity: 1;">
      </div>
    </div>
  </div>
  
  
</div>