<script lang="ts">
  import { onMount } from 'svelte';
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Heading, P } from 'flowbite-svelte';
  import { TrashBinOutline, ShoppingBagOutline } from 'flowbite-svelte-icons';
  import Menu from '../../components/Menu.svelte';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  
  type Produto = {
    id_produto: number;
    nome: string;
    descricao: string;
    preco: number;
  };

  let carrinho: Produto[] = [];
  

  function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }
  
  onMount(() => {
    checkUser();
  });

  // Buscar carrinho do localStorage ao montar o componente
  onMount(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        carrinho = JSON.parse(carrinhoSalvo);
      } catch (e) {
        console.error('Erro ao ler o orçamento localStorage:', e);
        carrinho = [];
      }
    }
  }
);


  // Remover item do orçamento
  function removerDoOrçamento(id_produto: number) {
    carrinho = carrinho.filter(item => item.id_produto !== id_produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // Calcular total do carrinho
  $: totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco,0);

  // Criar registro da compra
  const novaCompra = {
    data: new Date().toLocaleString('pt-BR'),
    itens: carrinho
  };

  // Buscar histórico já existente
  const historicoSalvo = localStorage.getItem('historico_compras');
  let historico = [];

  if (historicoSalvo) {
    try {
      historico = JSON.parse(historicoSalvo);
    } catch {
      historico = [];
    }
  }

  // Adicionar nova compra ao histórico
  historico.push(novaCompra);
  localStorage.setItem('historico_compras', JSON.stringify(historico));

  alert('Compra finalizada com sucesso!');

  // Limpar carrinho
  carrinho = [];
  localStorage.removeItem('carrinho');




</script>

<Menu />

<div class="min-h-screen pt-20 text-gray-900 dark:text-white p-8" style="background-color: #CAF0F8;">
  <Heading tag="h1" class="text-4xl font-bold mb-8 text-center">Orçamento</Heading>

  <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-4xl mx-auto">
    <Heading tag="h2" class="text-2xl font-bold mb-4">Itens no orçamento</Heading>

    {#if carrinho.length === 0}
      <P class="text-gray-600 dark:text-gray-300 text-center">Seu orçamento está vazio.</P>
    {:else}
      <!-- Tabela -->
      <Table class="w-full shadow-lg border border-gray-200 rounded-lg">
        <TableHead>
          {#if $user.is_admin}
          <TableHeadCell>ID</TableHeadCell>
          {/if}
          <TableHeadCell>Nome</TableHeadCell>
          <TableHeadCell>Descrição</TableHeadCell>
          <TableHeadCell>Preço (R$)</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each carrinho as item}
            <TableBodyRow>
              <TableBodyCell>{item.id_produto}</TableBodyCell>
              <TableBodyCell>{item.nome}</TableBodyCell>
              <TableBodyCell>{item.descricao}</TableBodyCell>
              <TableBodyCell>
                <button
                  title="Remover do Orçamento"
                  class="p-2 rounded border border-red-200 hover:border-red-400 transition bg-transparent"
                  on:click={() => removerDoOrçamento(item.id_produto)}>
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
      </div>
    {/if}
  </div>
</div>
