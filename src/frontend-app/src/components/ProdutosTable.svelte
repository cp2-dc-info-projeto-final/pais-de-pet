<script lang="ts">
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card } from 'flowbite-svelte';
    import ConfirmModal from './ConfirmModal.svelte';
    import { UserEditOutline, TrashBinOutline, SearchOutline } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import api from '$lib/api';
    import { onMount } from 'svelte';
  
    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: string;
      estoque: string;
      categoria: string;
    };
  
    let produtos: Produto[] = [];
    let searchQuery = '';
    let loading = true;
    let error = '';
    let deletingId: number | null = null;
    let confirmOpen = false;
    let confirmTargetId: number | null = null;
  
    function openConfirm(id_produto: number) {
      confirmTargetId = id_produto;
      confirmOpen = true;
    }
    function closeConfirm() {
      confirmOpen = false;
      confirmTargetId = null;
    }
    function handleConfirm() {
      if (confirmTargetId !== null) {
        handleDelete(confirmTargetId);
      }
      closeConfirm();
    }
    function handleCancel() {
      closeConfirm();
    }
  
    async function handleDelete(id_produto: number) {
      deletingId = id_produto;
      error = '';
      try {
        await api.delete(`/produto/${id_produto}`);
        produtos = produtos.filter(produto => produto.id_produto !== id_produto);
      } catch (e) {
        error = 'Erro ao remover produto.';
      } finally {
        deletingId = null;
      }
    }
  
    onMount(async () => {
      try {
        const res = await api.get('/produto');
        produtos = res.data.data;
      } catch (e) {
        error = 'Erro ao carregar produtos';
      } finally {
        loading = false;
      }
    });
  
    // Função que retorna a lista filtrada
    $: filteredProdutos = produtos.filter(u => {
      const q = searchQuery.toLowerCase();
      return (
        u.nome.toLowerCase().includes(q) ||
        u.id_produto.toString().includes(q)
      );
    });
  </script>
  
  <!-- Campo de pesquisa -->
  <div class="flex items-center gap-2 max-w-3xl mx-auto mt-4">
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Pesquisar por ID ou Nome..."
        bind:value={searchQuery}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
      />
      <SearchOutline class="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
    </div>
  </div>
  
  {#if loading}
    <div class="my-8 text-center text-gray-500">Carregando produtos...</div>
  {:else if error}
    <div class="my-8 text-center text-red-500">{error}</div>
  {:else}
    <!-- Tabela para telas médias/grandes -->
    <div class="hidden lg:block">
      <Table class="w-full max-w-3xl mx-auto my-8 shadow-lg border border-gray-200 rounded-lg">
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Nome</TableHeadCell>
          <TableHeadCell>descrição</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody>
          {#each filteredProdutos as produto}
            <TableBodyRow>
              <TableBodyCell>{produto.id_produto}</TableBodyCell>
              <TableBodyCell>{produto.nome}</TableBodyCell>
              <TableBodyCell>{produto.descricao}</TableBodyCell>
              <TableBodyCell>
                <button
                  class="p-2 rounded border border-primary-200 hover:border-primary-400 transition bg-transparent"
                  title="Editar"
                  on:click={() => goto(`/adm_produtos/adm_produto/${produto.id_produto}`)}
                >
                  <UserEditOutline class="w-5 h-5 text-primary-500" />
                </button>
                <button
                  title="Remover"
                  class="p-2 rounded border border-red-100 hover:border-red-300 transition bg-transparent"
                  on:click={() => openConfirm(produto.id_produto)}
                  disabled={deletingId === produto.id_produto || loading}
                >
                  <TrashBinOutline class="w-5 h-5 text-red-400" />
                </button>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  
    <!-- Cards para telas pequenas -->
    <div class="block lg:hidden">
      <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
        {#each filteredProdutos as produto}
          <Card class="max-w-sm w-full p-0 overflow-hidden shadow-lg border border-gray-200">
            <div class="px-4 pt-4 pb-2 bg-gray-100 text-left flex items-center justify-between">
              <div>
                <div class="text-lg font-semibold text-gray-800 text-left">{produto.id_produto}</div>
                <div class="text-xs text-gray-400 text-left">ID: {produto.id_produto}</div>
              </div>
              <div class="flex gap-2">
                <button
                  class="p-2 rounded border border-primary-200 hover:border-primary-400 transition bg-transparent"
                  title="Editar"
                  on:click={() => goto(`/adm_produtos/adm_produto/${produto.id_produto}`)}
                >
                  <UserEditOutline class="w-5 h-5 text-primary-500" />
                </button>
                <button
                  title="Remover"
                  class="p-2 rounded border border-red-100 hover:border-red-300 transition bg-transparent"
                  on:click={() => openConfirm(produto.id_produto)}
                  disabled={deletingId === produto.id_produto || loading}
                >
                  <TrashBinOutline class="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>
            <div class="px-4 pb-4 pt-2 flex flex-col gap-2 text-left">
              <div class="flex items-center gap-2 text-left">
                <span class="text-gray-700 text-sm">{produto.nome}</span>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </div>
  {/if}
  
  <ConfirmModal
    open={confirmOpen}
    message="Tem certeza que deseja remover este produto?"
    confirmText="Remover"
    cancelText="Cancelar"
    onConfirm={handleConfirm}
    onCancel={handleCancel}
  />
  