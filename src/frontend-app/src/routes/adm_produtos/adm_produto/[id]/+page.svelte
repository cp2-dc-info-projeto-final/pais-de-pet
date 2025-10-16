<script lang="ts">
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte';
  import api from '$lib/api';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/user'
  
  // CORREÇÃO: Use 'id' em vez de 'id_produto' porque a pasta é [id]
  const { id } = get(page).params;
  
  console.log('ID do produto da URL:', id);

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
    categoria_id: string;
  };

  let produtos: Produto = { 
    id_produto: 0, 
    nome: '', 
    descricao: '', 
    preco: '', 
    estoque: '', 
    categoria_id: '' 
  };
  let loading = false;
  let error = '';

  onMount(async () => {
    // CORREÇÃO: Use 'id' aqui também
    if (!id || id === 'undefined') {
      error = 'ID do produto não encontrado na URL';
      return;
    }

    loading = true;
    try {
      console.log('Buscando produto com ID:', id);
      const res = await api.get(`/produto/${id}`);
      const data = res.data.data;
      produtos = { 
        id_produto: Number(id), 
        nome: data.nome, 
        descricao: data.descricao, 
        preco: data.preco, 
        estoque: data.estoque,
        categoria_id: data.categoria_id || '' 
      };
      console.log('Produto carregado:', produtos);
    } catch (e: any) {
      console.error('Erro detalhado:', e);
      error = e.response?.data?.message || 'Erro ao carregar produto.';
    } finally {
      loading = false;
    }
  });

  async function handleSubmit() {
  if (!id || id === 'undefined') {
    error = 'ID do produto inválido';
    return;
  }

  loading = true;
  error = '';
  try {
    // Monta payload com conversões diretas
    const payload = {
      nome: produtos.nome,
      preco: parseFloat(produtos.preco),
      estoque: parseInt(produtos.estoque),
      descricao: produtos.descricao,
      categoria_id: produtos.categoria_id ? parseInt(produtos.categoria_id) : null
    };

    // Validações
    if (isNaN(payload.preco)) {
      error = 'Preço deve ser um número válido';
      return;
    }

    if (isNaN(payload.estoque)) {
      error = 'Estoque deve ser um número válido';
      return;
    }

    console.log('Enviando atualização para produto ID:', id);
    console.log('Payload:', payload);

    await api.put(`/produto/${id}`, payload);
    goto('/adm_produtos');
  } catch (e: any) {
    console.error('Erro ao atualizar:', e);
    if (e.response?.data?.message) {
      error = e.response.data.message;
    } else {
      error = 'Erro ao atualizar produto.';
    }
  } finally {
    loading = false;
  }
}

  function handleCancel() {
    goto('/adm_produtos');
  }
</script>

<div class="pt-20 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C]">
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit} novalidate>
      <Heading tag="h3" class="mb-2 text-center">Editar Produto - ID: {id}</Heading>
      
      {#if !id || id === 'undefined'}
        <div class="text-red-500 text-center">Erro: ID do produto não encontrado</div>
      {:else if loading}
        <div class="text-center">Carregando...</div>
      {:else if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      
      <div>
        <Label for='nome'> Nome </Label>
        <Input id="nome" bind:value={produtos.nome} placeholder="Digite o novo nome do produto" class="mt-1" />
      </div>
      <div>
        <Label for="descricao">Descrição</Label>
        <Input id="descricao" bind:value={produtos.descricao} placeholder="Digite a nova Descrição" class="mt-1" />
      </div>
      <div>
        <Label for="preco">Preço</Label>
        <Input id="preco" bind:value={produtos.preco} placeholder="Digite o novo Preço" class="mt-1"/>
      </div>
      <div>
        <Label for="estoque">Estoque</Label>
        <Input id="estoque" type="number" bind:value={produtos.estoque} placeholder="Digite o novo estoque" class="mt-1"/>
      </div>
      <div>
        <Label for="categoria">Categoria</Label>
        <Input id="categoria" bind:value={produtos.categoria_id} placeholder="Digite sua nova categoria" class="mt-1"/>
      </div>
      <div class="flex gap-4 justify-end mt-4">
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          Cancelar
        </Button>
        <Button type="submit" color="primary" disabled={loading || !id || id === 'undefined'}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2" /> Salvar
        </Button>
      </div>
    </form>
  </Card>
</div>