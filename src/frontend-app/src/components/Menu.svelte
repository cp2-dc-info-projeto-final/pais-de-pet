<script>
// @ts-nocheck

  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading } from "flowbite-svelte";
  import { user } from '$lib/stores/user';
  import { produto } from '$lib/stores/produto';

  async function handleSubmit() {
      loading = true;
      const res = await api.get(`/users/${localUser.id}`);
      error = res.data.message;
      try {
        const payload = {
          email: localUser.email,
          nome: localUser.nome,
          telefone: localUser.telefone,
          senha: localUser.senha
        };
  
        await api.put(`/users/${localUser.id}`, payload);
  
        // Atualiza store
        user.set({
          ...get(user),
          email: localUser.email,
          nome: localUser.nome,
          telefone: localUser.telefone
        });
  
        goto('/perfil_user');
      } catch (e) {
          const res = await api.get(`/users/${localUser.id}`);
          error = res.data.message;
      } finally {
        loading = false;
      }
    }
  
    function handleLogout() {
      user.set(null);
      goto('/login_user');
    }
</script>

<div class="relative px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full px-2 py-2.5 sm:px-4" style="background-color: #88ccf1;">
    <NavBrand href="/">
      <img src="/images/eveeb.png" class="me-3 h-6 sm:h-14" alt="Logo Evee" />
      <Heading class="navIl" style="color: #0077B6;">Pais de Pets Poderosos</Heading>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      {#if !$user}
      <NavLi href="/cadastro_user" class="navIl" style="color: #0077B6;">Cadastro</NavLi>
      <NavLi href="/login_user" class="navIl" style="color: #0077B6;">Login</NavLi>
      <NavLi href="/agenda" class="navIl" style="color: #0077B6;">Agenda</NavLi>
      {/if}
      {#if $user}
      <NavLi href="/agenda" class="navIl" style="color: #0077B6;">Agendamento</NavLi>
      <NavLi href="/adm_produtos" class="navIl" style="color: #0077B6;">Vitrine</NavLi>
      <NavLi href="/orcamento" class="navIl" style="color: #0077B6;">Orçamento</NavLi>
      <NavLi href="/perfil_user" class="navIl" style="color: #0077B6;">Perfil</NavLi>
      {#if $user.is_admin}
      <NavLi href="/adm_menu" class="navIl" style="color: #0077B6;">Usuários</NavLi>
      {/if}
      <NavLi class="navIl" style="color: #0077B6;" onclick={handleLogout}> Sair</NavLi>
      {/if}
    </NavUl>
  </Navbar>
</div>