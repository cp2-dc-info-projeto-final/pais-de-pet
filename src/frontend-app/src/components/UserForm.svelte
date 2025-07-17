<script lang="ts">
  // Formulário de usuário
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
  import { onMount } from 'svelte'; // ciclo de vida
  import api from '$lib/api'; // API backend
  import { goto } from '$app/navigation'; // navegação
  import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones

  export let id: number | null = null; // id do usuário

  type User = {
    id: number;
    usuario: string;
    email: string;
    nome: string;
    senha: string;
    confirm_senha: string;
    telefone: string;
  };

  let user: User = { id: 0, usuario: '', email: '', nome: '', senha: '', confirm_senha: '', telefone: ''}; // dados do form
  let loading = false;
  let error = '';

  // Carrega usuário se for edição
  onMount(async () => {
  if (id !== null) {
    loading = true;
    try {
      const res = await api.get(`/users/${id}`);
      const data = res.data.data;
      user = { ...data, senha: '', confirm_senha: '' }; // senha não vem do backend
    } catch (e) {
      error = 'Erro ao carregar usuário.';
    } finally {
      loading = false;
    }
  } 
});


  // Submissão do formulário
  async function handleSubmit() {
  loading = true;
  error = '';
  try {
    const payload = {
      nome: user.nome,
      usuario: user.usuario,
      email: user.email,
      senha: user.senha,
      telefone: user.telefone
    };

    if (user.senha !== user.confirm_senha) {
      error = 'As senhas não coincidem!';
      loading = false;
      return;
    }

    if (id === null) {
      await api.post('/users', payload);
    } else {
      await api.put(`/users/${id}`, payload);
    }
    goto('/users');
  } catch (e) {
      error = 'Erro ao salvar usuário.';
    } finally {
      loading = false;
    }
  }

  function handleCancel() {
    console.log('Cancelar');
    goto('/users');
  }
</script>


<!-- Card do formulário -->
<Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
  <!-- Formulário principal -->
  <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
    <!-- Título -->
    <Heading tag="h3" class="mb-2 text-center">
      {id === null ? 'Cadastrar Usuário' : 'Editar Usuário'}
    </Heading>
    <!-- Mensagem de erro -->
    {#if error}
      <div class="text-red-500 text-center">{error}</div>
    {/if}
    <!-- Campo usuario -->
    <div>
      <Label for="usuario">Usuario</Label>
      <Input id="usuario" bind:value={user.usuario} placeholder="Digite o login" required class="mt-1" />
    </div>
    <!-- Campo email -->
    {#if id === null}
    <div>
      <Label for="email">Email</Label>
      <Input id="email" type="email" bind:value={user.email} placeholder="Digite o e-mail" required class="mt-1" />
    </div>
    {/if}
    <!-- Campo nome -->
    <div>
      <Label for="nome">Nome</Label>
      <Input id="nome" type="string" bind:value={user.nome} placeholder="Digite seu nome" required class="mt-1"/>
    </div>
    <!-- Campo senha -->
    <div>
      <Label for="senha">Senha</Label>
      <Input id="senha" type="password" bind:value={user.senha} placeholder="Digite sua senha" required class="mt-1"/>
    </div>
    <!-- Campo confirmar senha -->
    {#if id === null}
    <div>
      <Label for="confirm_senha">Confirmar senha</Label>
      <Input id="confirm_senha" type="password" bind:value={user.confirm_senha} placeholder="Digite sua senha novamente" required class="mt-1"/>
    </div>
    {/if}
    <!-- Campo telefone -->
    <div>
      <Label for="telefone">Telefone</Label>
      <Input id="telefone" type="string" bind:value={user.telefone} placeholder="Digite seu telefone" required class="mt-1"/>
    </div>
    <!-- Botões de ação -->
    <div class="flex gap-4 justify-end mt-4">
      <!-- Botão cancelar/voltar -->
      <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
        <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        {id === null ? 'Voltar' : 'Cancelar'}
      </Button>
      <!-- Botão salvar -->
      <Button type="submit" color="primary" disabled={loading}>
        <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        {id === null ? 'Cadastrar' : 'Salvar'}
      </Button>
    </div>
  </form>
</Card>
