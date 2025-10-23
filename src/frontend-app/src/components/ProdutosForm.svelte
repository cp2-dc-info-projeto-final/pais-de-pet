<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
    import { user } from '$lib/stores/user'

    export let id_produto: number 

    function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }

    onMount(() => {
    checkUser();
  });
  
    
    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: string;
      estoque: string;
      categoria: string;
    };
  
    let produto: Produto = { id_produto: 0, nome: '', descricao: '', preco: '', estoque: '', categoria: ''}; // dados do form
    let loading = false;
    let error = '';
    
    // Submissão do formulário
    async function handleSubmit() {
    loading = true;
    error = '';
    try {
      const payload = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria,
      };

      if (id_produto === null) {
        await api.post('/novo', payload);
      } else {
        await api.put(`/novo/${id_produto}`, payload);
      }
      goto('/novo');
    } catch (e) {
        error = 'Erro ao salvar produto.';
      } finally {
        loading = false;
      }
    }
  
    function handleCancel() {
      console.log('Cancelar');
      goto('/novo');
    }
  </script>
  
  
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id_produto === null ? 'Cadastrar Produto' : 'Editar Produto'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <!-- Campo produto -->
      <div>
        <Label for="nome">Produto</Label>
        <Input id="nome" type='string' bind:value={produto.nome} placeholder="Digite o Nome do Produto" required class="mt-1" />
      </div>
      <!-- Campo descricao -->
      {#if id_produto === null}
      <div>
        <Label for="descricao">Descrição</Label>
        <Input id="descricao" type="string" bind:value={produto.descricao} placeholder="Digite a descrição do produto" required class="mt-1" />
      </div>
      {/if}
      <!-- Campo preço -->
      <div>
        <Label for="preco">Preço</Label>
        <Input id="preco" type="string" bind:value={produto.preco} placeholder="Digite o preço " required class="mt-1"/>
      </div>
      <!-- Campo estoque -->
      <div>
        <Label for="estoque">Estoque</Label>
        <Input id="estoque" type="number" bind:value={produto.estoque} placeholder="Digite a quantidade no estoque" required class="mt-1"/>
      </div>
      <!-- Campo categoria -->
      {#if id_produto === null}
      <div>
        <Label for="categoria">Categoria</Label>
        <Input id="categoria" type="string" bind:value={produto.categoria} placeholder="Digite a categoria do produto" required class="mt-1"/>
      </div>
      {/if}
      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão cancelar/voltar -->
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id_produto === null ? 'Voltar' : 'Cancelar'}
        </Button>
        <!-- Botão salvar -->
        <Button type="submit" color="primary" disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id_produto === null ? 'Cadastrar' : 'Salvar'}
        </Button>
      </div>
    </form>
  </Card>
  