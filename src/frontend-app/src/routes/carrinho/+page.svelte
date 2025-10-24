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
  // 1️⃣ Buscar carrinho do localStorage
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    try {
      carrinho = JSON.parse(carrinhoSalvo);
      console.log("\n\n\n", carrinho, "\n\n\nVeja! O carrinho funciona!");
    } catch (e) {
      console.error("Erro ao ler carrinho do localStorage:", e);
      carrinho = [];
    }
  }
  });

  </script>
  
  <Menu />
  
  <div class="min-h-screen pt-20 bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C] text-gray-900 dark:text-white p-8">
    <Heading tag="h1" class="text-4xl font-bold mb-6 text-center">Carrinho de Compras</Heading>

    <!-- Carrinho -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
      <Heading tag="h2" class="text-2xl font-bold mb-4">Itens no Carrinho</Heading>
  
      {#if carrinho.length === 0}
        <P class="text-gray-600 dark:text-gray-300">Seu carrinho está vazio.</P>
      {:else}
        <ul class="space-y-2 mb-4">
          {#each carrinho as item}
            <li class="flex justify-between border-b pb-2">
              <span>{item.nome}</span>
              <span>R$ {item.preco.toFixed(2)}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  