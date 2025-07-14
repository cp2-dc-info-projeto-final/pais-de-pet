<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading } from "flowbite-svelte";
</script>

<div class="relative px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-gray-800 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src="/images/icon.svg" class="me-3 h-6 sm:h-9" alt="Logo aleatória" />
      <Heading class="self-center text-xl font-semibold whitespace-nowrap text-primary-500 dark:text-primary-400">Projeto Modelo 2025</Heading>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/" class="text-lg font-bold px-4 py-2 text-primary-500 dark:text-primary-400 hover:text-yellow-300 hover:bg-gray-700 focus:text-yellow-400 focus:bg-gray-700 transition-colors rounded-lg">Home</NavLi>
      <NavLi href="/about" class="text-lg font-bold px-4 py-2 text-primary-500 dark:text-primary-400 hover:text-yellow-300 hover:bg-gray-700 focus:text-yellow-400 focus:bg-gray-700 transition-colors rounded-lg">Sobre</NavLi>
      <NavLi href="/users" class="text-lg font-bold px-4 py-2 text-primary-500 dark:text-primary-400 hover:text-yellow-300 hover:bg-gray-700 focus:text-yellow-400 focus:bg-gray-700 transition-colors rounded-lg">Usuários</NavLi>
    </NavUl>
  </Navbar>
</div>