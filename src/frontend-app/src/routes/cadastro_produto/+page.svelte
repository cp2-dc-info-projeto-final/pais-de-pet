<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
    import { produto } from '$lib/stores/produto' // produtos
    import { user } from '$lib/stores/user'
  
    export let id: number | null = null; // id do usuário
  
    type Produto = {
      id: number;

      estoque: string;
      nome: string;
      preco: string;
      descricao: string;
    };
  
    let produtos: Produto = { id: 0, estoque: '', descricao: '' ,nome: '', preco: ''}; // dados do form
    let loading = false;
    let error = '';
    let errorBox: HTMLDivElement | null = null;
  
    function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }

    onMount(() => {
    checkUser();
  });
  
  // Submissão do formulário
  async function handleSubmit() {
    loading = true;
    error = '';
    try {
      const payload = {
        nome: produtos.nome,
        descricao: produtos.descricao,
        estoque: produtos.estoque,
        preco: produtos.preco
      };

      if (id === null) {
        await api.post('/produto', payload);
      } else {
        await api.put(`/produto/${id}`, payload);
      }
      goto('/');
    } catch (e: any) {
      // Pega a mensagem do backend
      if (e.response && e.response.data && e.response.data.message) {
        error = e.response.data.message;
      }
      else {
        error = 'Erro ao salvar dados do produto.';
      }
    } finally {
      loading = false;
    }
  }
  
  function handleVoltar() {
    goto('/adm_produtos');
  }
</script>
  
<div class="pt-20 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C]">
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg bg-gradient-to-b from-[#8d6a2f] via-[#E6D3B3] to-[#804404]">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit} novalidate>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id === null ? 'Cadastrar Produto' : 'Editar Produto'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-black text-center text-2xl text-shadow-red-700">{error}</div>
      {/if}
      <div>
        <!-- Campo Nome -->
        <Label for="nome">Nome</Label>
        <Input id="nome" type="string" bind:value={produtos.nome} placeholder="Digite o nome do produto" required class="mt-1"/>
      </div>
      <!-- Campo preço -->
      <div>
        <Label for="preco">Preço</Label>
        <Input id="preco" type="string" bind:value={produtos.preco} placeholder="Digite o preço" required class="mt-1"/>
      </div>
      <!-- Campo descrição -->
      <div>
        <Label for="descricao">Descrição</Label>
        <Input id="descricao" type="string" bind:value={produtos.descricao} placeholder="Digite a descricao do item" required class="mt-1"/>
      </div>
      <!-- Campo Quantidade-->
      {#if id === null}
      <div>
        <Label for="quantidade">Quantidade</Label>
        <Input id="quantidade" type="number" bind:value={produtos.estoque} placeholder="Digite a quantidade" required class="mt-1"/>
      </div>
      {/if}
      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão voltar -->
        {#if id}
        <Button color="light" type="button" onclick={handleVoltar} disabled={loading}>Voltar
        <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        </Button>
        {/if}
        
        <!-- Botão salvar -->
        <Button type="submit" color="primary" disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id === null ? 'Cadastrar' : 'Salvar'}
        </Button>
      </div>
    </form>
  </Card>
</div>