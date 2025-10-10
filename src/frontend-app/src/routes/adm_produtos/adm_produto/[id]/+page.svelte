<script lang="ts">
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte';
    import api from '$lib/api';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import { user } from '$lib/stores/user'
    import { produto } from '$lib/stores/produto'
    const { id_produto } = get(page).params;
  
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
  
    let produtos: Produto = { id_produto: Number(id_produto), nome: '', descricao: '', preco: '', estoque: '', categoria: '' };
    let loading = false;
    let error = '';
  
    onMount(async () => {
      loading = true;
      try {
        const res = await api.get(`/produto/${id_produto}`);
        const data = res.data.data;
        produtos = { id_produto: Number(id_produto), nome: data.nome, descricao: data.descricao, preco: data.preco, estoque: data.preco, categoria: data.categoria };
      } catch (e: any) {
        error = e.response?.data?.message || 'Erro ao carregar produto.';
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
          nome: produtos.nome,
          descricao: produtos.descricao,
          preco: produtos.preco,
          estoque: produtos.estoque,
          categoria: produtos.categoria
        };
  
        // só envia nome se o admin preencheu
        if (produtos.nome && produtos.nome.length > 0) {
          payload.nome = produtos.nome;
        }
  
        await api.put(`/produto/${id_produto}`, payload);
        goto('/adm_produtos');
      } catch (e: any) {
        // usa mensagem real do backend
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
      <!-- desativa validação HTML5 -->
      <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit} novalidate>
        <Heading tag="h3" class="mb-2 text-center">Editar Produto</Heading>
        {#if error}
          <div class="text-red-500 text-center">{error}</div>
        {/if}
        <div>
          <Label for='nome'> Nome </Label>
          <Input id="nome" bind:value={produtos.nome} placeholder="Digite o novo nome do produto" class="mt-1" />
        </div>
        <div>
          <Label for="descricao">Descricao</Label>
          <Input id="descricao" bind:value={produtos.descricao} placeholder="Digite a nova Descrição" class="mt-1" />
        </div>
        <div>
          <Label for="preco">Preço</Label>
          <Input id="preco" bind:value={produtos.preco} placeholder="Digite o novo Preço" class="mt-1"/>
        </div>
        <div>
          <Label for="estoque">Estoque</Label>
          <Input id="estoque" type="string" bind:value={produtos.estoque} placeholder="Digite o novo estoque" class="mt-1"/>
        </div>
        <div>
          <Label for="categoria">Categoria</Label>
          <Input id="categoria" bind:value={produtos.categoria} placeholder="Digite sua nova categoria" class="mt-1"/>
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
  