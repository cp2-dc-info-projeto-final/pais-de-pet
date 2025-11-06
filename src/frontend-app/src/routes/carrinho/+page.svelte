<script lang="ts">
  import { onMount } from 'svelte';
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Heading, P } from 'flowbite-svelte';
  import { TrashBinOutline, ShoppingBagOutline } from 'flowbite-svelte-icons';
  import Menu from '../../components/Menu.svelte';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/user';

  
  type Produto = {
    id_produto: number;
    nome: string;
    descricao: string;
    preco: number;
  };

  let carrinho: Produto[] = [];
  
  // Buscar carrinho do localStorage ao montar o componente
  onMount(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        carrinho = JSON.parse(carrinhoSalvo);
      } catch (e) {
        console.error('Erro ao ler carrinho do localStorage:', e);
        carrinho = [];
      }
    }
  });

  // Remover item do carrinho
  function removerDoCarrinho(id_produto: number) {
    carrinho = carrinho.filter(item => item.id_produto !== id_produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // Calcular total do carrinho
  $: totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco,0);

  // Finalizar compra (exemplo simples)
  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    alert('Compra finalizada com sucesso!');
    carrinho = [];
    localStorage.removeItem('carrinho');
  }
</script>

<Menu />

<div class="min-h-screen pt-20 bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C] text-gray-900 dark:text-white p-8">
  <Heading tag="h1" class="text-4xl font-bold mb-8 text-center">Carrinho de Compras</Heading>

  <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-4xl mx-auto">
    <Heading tag="h2" class="text-2xl font-bold mb-4">Itens no Carrinho</Heading>

    {#if carrinho.length === 0}
      <P class="text-gray-600 dark:text-gray-300 text-center">Seu carrinho está vazio.</P>
    {:else}
      <!-- Tabela -->
      <Table class="w-full shadow-lg border border-gray-200 rounded-lg">
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Nome</TableHeadCell>
          <TableHeadCell>Descrição</TableHeadCell>
          <TableHeadCell>Preço (R$)</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody>
          {#each carrinho as item}
            <TableBodyRow>
              <TableBodyCell>{item.id_produto}</TableBodyCell>
              <TableBodyCell>{item.nome}</TableBodyCell>
              <TableBodyCell>{item.descricao}</TableBodyCell>
              <TableBodyCell>
                {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableBodyCell>
              <TableBodyCell>
                <button
                  title="Remover do Carrinho"
                  class="p-2 rounded border border-red-200 hover:border-red-400 transition bg-transparent"
                  on:click={() => removerDoCarrinho(item.id_produto)}>
                  <TrashBinOutline class="w-5 h-5 text-red-500" />
                </button>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>

      <!-- Total e ação -->
      <div class="flex justify-between items-center mt-6">
        <P class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Total: {totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </P>

        <button
          class="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition"
          on:click={finalizarCompra}>
          <ShoppingBagOutline class="w-5 h-5" />
          Finalizar Compra
        </button>
      </div>
    {/if}
  </div>
</div>
