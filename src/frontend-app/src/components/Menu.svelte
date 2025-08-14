<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading } from "flowbite-svelte";
</script>

<div class="relative px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-gray-600 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src="/images/eveeb.png" class="me-3 h-6 sm:h-14" alt="Logo Evee" />
      <Heading class="navIl">Pais de Pets Poderosos</Heading>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/cadastro_user" class="navIl">Cadastro</NavLi>
      <NavLi href="/login_user" class="navIl">Login</NavLi>
      <NavLi href="/adm_menu" class="navIl">Usuários</NavLi>
      <NavLi href="/about" class="navIl">Sobre</NavLi>
    </NavUl>
  </Navbar>
</div>