<script lang="ts">
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte';
  import api from '$lib/api';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/user'
  const { id } = get(page).params;

  function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }
  
  onMount(() => {
    checkUser();
  });

  type User = {
    id: number;
    usuario: string;
    email: string;
    nome: string;
    senha: string;
    telefone: string;
  };

  let users: User = { id: Number(id), usuario: '', email: '', nome: '', senha: '', telefone: '' };
  let loading = false;
  let error = '';

  onMount(async () => {
    loading = true;
    try {
      const res = await api.get(`/users/${id}`);
      const data = res.data.data;
      users = { id: Number(id), usuario: data.usuario, email: data.email, nome: data.nome, senha: '', telefone: data.telefone };
    } catch (e: any) {
      error = e.response?.data?.message || 'Erro ao carregar usuário.';
    } finally {
      loading = false;
    }
  });

  async function handleSubmit() {
    loading = true;
    error = '';
    try {
      // monta payload
      const payload: any = {
        nome: users.nome,
        usuario: users.usuario,
        email: users.email,
        telefone: users.telefone
      };

      // só envia senha se o admin preencheu
      if (users.senha && users.senha.length > 0) {
        payload.senha = users.senha;
      }

      await api.put(`/users/${id}`, payload);
      goto('/adm_menu');
    } catch (e: any) {
      // usa mensagem real do backend
      if (e.response?.data?.message) {
        error = e.response.data.message;
      } else {
        error = 'Erro ao atualizar usuário.';
      }
    } finally {
      loading = false;
    }
  }

  function handleCancel() {
    goto('/adm_menu');
  }
</script>

<div class="pt-20 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C]">
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
    <!-- desativa validação HTML5 -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit} novalidate>
      <Heading tag="h3" class="mb-2 text-center">Editar Usuário</Heading>
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <div>
        <Label>Email</Label>
        <p class="p-2 rounded border bg-gray-100">{users.email}</p>
      </div>
      <div>
        <Label for="usuario">Usuário</Label>
        <Input id="usuario" bind:value={users.usuario} placeholder="Digite o login" class="mt-1" />
      </div>
      <div>
        <Label for="nome">Nome</Label>
        <Input id="nome" bind:value={users.nome} placeholder="Digite seu nome" class="mt-1"/>
      </div>
      <div>
        <Label for="senha">Senha</Label>
        <Input id="senha" type="password" bind:value={users.senha} placeholder="Digite sua nova senha (opcional)" class="mt-1"/>
      </div>
      <div>
        <Label for="telefone">Telefone</Label>
        <Input id="telefone" bind:value={users.telefone} placeholder="Digite seu telefone" class="mt-1"/>
      </div>
      <div class="flex gap-4 justify-end mt-4">
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          Cancelar
        </Button>
        <Button type="submit" color="primary" disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2" /> Salvar
        </Button>
      </div>
    </form>
  </Card>
</div>
