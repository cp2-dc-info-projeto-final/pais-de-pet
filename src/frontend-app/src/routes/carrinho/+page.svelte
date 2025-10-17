<script lang="ts">
    import { onMount } from 'svelte';
    import { Button, Card, Heading, P } from 'flowbite-svelte';
    import Menu from '../../components/Menu.svelte';
  
    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: number;
    };
  
    let produtos: Produto[] = [];
    let carrinho: Produto[] = [];
  
    // Buscar produtos da API
    onMount(async () => {
      const response = await fetch('http://localhost:3000/produto');
      const json = await response.json();
      if (json.success) {
        produtos = json.data;
      } else {
        console.error("Erro ao buscar produtos:", json.message);
      }
    });
  
    // Adicionar produto ao carrinho
    function adicionarAoCarrinho(produto: Produto) {
      carrinho.push(produto);
    }
  
    // Calcular total
    function calcularTotal() {
      return carrinho.reduce((total, item) => total + item.preco, 0);
    }
  </script>
  
  <Menu />
  
  <div class="min-h-screen pt-20 bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C] text-gray-900 dark:text-white p-8">
    <Heading tag="h1" class="text-4xl font-bold mb-6 text-center">Carrinho de Compras</Heading>
  
    <!-- Lista de produtos -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {#each produtos as produto}
        <Card class="bg-white dark:bg-gray-800 shadow-md">
          <h2 class="text-xl font-semibold mb-2">{produto.nome}</h2>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{produto.descricao}</p>
          <p class="font-bold text-green-700 mb-2">R$ {produto.preco.toFixed(2)}</p>
          <button
                on:click={() => adicionarAoCarrinho(produto)} class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2">Adicionar ao Carrinho
            </button>
        </Card>
      {/each}
    </div>
  
    <!-- Carrinho -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
      <Heading tag="h2" class="text-2xl font-bold mb-4">Itens no Carrinho</Heading>
  
      {#if carrinho.length === 0}
        <P class="text-gray-600 dark:text-gray-300">Seu carrinho está vazio.</P>
      {:else}
        <ul class="space-y-2 mb-4">
          {#each carrinho as item, index}
            <li class="flex justify-between border-b pb-2">
              <span>{item.nome}</span>
              <span>R$ {item.preco.toFixed(2)}</span>
            </li>
          {/each}
        </ul>
        <p class="font-semibold text-right">Total: R$ {calcularTotal().toFixed(2)}</p>
      {/if}
    </div>
  </div>
  