<script lang="ts">
    import { user } from '$lib/stores/user';
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation';
    import { ArrowLeftOutline, ThumbsUpSolid } from 'flowbite-svelte-icons';
  
    let email = '';
    let senha = '';
    let loading = false;
    let error = '';
  
    async function handleSubmit() {
      loading = true;
      error = '';
      try {
        const res = await api.post('/users/login', { email, senha });
        if (res.data.success) {
          user.set(res.data.data); // Salva na store
          goto('/'); // Redireciona
        }
        else {
          error = res.data.message || 'Erro ao fazer login.';
        }
      } catch (e) {
          const res = await api.get(`/users/login`);
          error = res.data.message;
      } finally {
        loading = false;
      }
    }
  
    function handleCancel() {
      goto('/'); // voltar para a home ou menu
    }
  </script>

<div class="pt-20 min-h-screen flex flex-col items-center" style="background-color: #CAF0F8;">
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-inherit border border-blue-200 ">
    <form class="flex flex-col gap-6 p-6" style="background-color: #90E0EF;" on:submit|preventDefault={handleSubmit}>
      <Heading tag="h3" class="mb-2 text-center">Login</Heading>
  
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
  
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} placeholder="Digite o e-mail" required class="mt-1" />
      </div>
  
      <div>
        <Label for="senha">Senha</Label>
        <Input id="senha" type="password" bind:value={senha} placeholder="Digite sua senha" required class="mt-1"/>
      </div>
  
      <div class="flex gap-4 justify-end mt-4">
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />Voltar
        </Button>
        <Button type="submit" color="primary" disabled={loading}>
          <ThumbsUpSolid class="inline w-5 h-5 mr-2 align-text-bottom" />Entrar
        </Button>
      </div>
    </form>
  </Card>
</div>