<script lang="ts">
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte';
    import api from '$lib/api';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    import { user } from '$lib/stores/user';
    import { FloppyDiskAltOutline } from 'flowbite-svelte-icons';
  
    let localUser = {
      id: 0,
      email: '',
      nome: '',
      telefone: '',
      senha: ''
    };
  
    let loading = false;
    let error = '';
    
    function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }
  
  onMount(() => {
    checkUser();
  });

    onMount(() => {
      const u = get(user);
      if (!u) {
        goto('/login_user');
        return;
      }
      localUser.id = u.id;
      localUser.email = u.email;
      localUser.nome = u.nome;
      localUser.telefone = u.telefone || '';
    });
  
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
  
  <div class="pt-20 min-h-screen flex flex-col items-center" style="background-color: #CAF0F8;">
    <Card>
      <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
        <Heading tag="h3" class="mb-2 text-center">Meu Perfil</Heading>
  
        {#if error}
          <div class="text-red-500 text-center">{error}</div>
        {/if}

        <div>
            <Label>Email</Label>
            <p class="p-2 rounded border bg-gray-100">{localUser.email}</p>
        </div>
  
        <div>
          <Label for="nome">Nome</Label>
          <Input id="nome" bind:value={localUser.nome} placeholder="Digite seu nome" required class="mt-1"/>
        </div>
  
        <div>
          <Label for="telefone">Telefone</Label>
          <Input id="telefone" bind:value={localUser.telefone} placeholder="Digite seu telefone" required class="mt-1"/>
        </div>
  
        <div>
          <Label for="senha">Senha</Label>
          <Input id="senha" type="password" bind:value={localUser.senha} placeholder="Digite sua nova senha" required class="mt-1"/>
        </div>
  
        <div class="flex gap-4 justify-end mt-4">
          <Button type="submit" color="emerald" disabled={loading}>
            <FloppyDiskAltOutline class="inline w-5 h-5 mr-2" /> Salvar
          </Button>
          <Button type="button" color="primary" onclick={handleLogout}>
            Sair
          </Button>
        </div>
      </form>
    </Card>
  </div>