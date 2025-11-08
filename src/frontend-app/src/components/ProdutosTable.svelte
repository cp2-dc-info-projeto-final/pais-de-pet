<script lang="ts">
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card } from 'flowbite-svelte';
    import ConfirmModal from './ConfirmModal.svelte';
    import { UserEditOutline, TrashBinOutline, SearchOutline, ShoppingBagOutline } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import api from '$lib/api';
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/user';
  
    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: string;
      estoque: string;
      categoria_id: string;
    };
  
    let produtos: Produto[] = [];
    let searchQuery = '';
    let loading = true;
    let error = '';
    let deletingId: number | null = null;
    let confirmOpen = false;
    let confirmTargetId: number | null = null;
  
    function adicionarAoCarrinho(produto: Produto) {
      let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

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
      <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
        {#each filteredProdutos as produto}
          <Card class="max-w-sm w-full p-0 overflow-hidden shadow-lg border border-gray-200">
            <div class="px-4 pt-4 pb-2 bg-gray-100 text-left flex items-center justify-between">
              {#if $user.is_admin}
              <div>
                <div><img src="" alt=""></div>
                <div class="text-lg font-semibold text-gray-800 text-left">{produto.id_produto}</div>
                <div class="text-xs text-gray-400 text-left">ID: {produto.id_produto}</div>
              </div>
              {/if}
              <div class="flex gap-2">
                {#if $user?.is_admin}
                  <button
                    class="p-2 rounded border border-primary-200 hover:border-primary-400 transition bg-transparent"
                    title="Editar"
                    on:click={() => goto(`/adm_produtos/adm_produto/${produto.id_produto}`)}>
                    <UserEditOutline class="w-5 h-5 text-primary-500" />
                  </button>
              
                  <button
                    title="Remover"
                    class="p-2 rounded border border-red-100 hover:border-red-300 transition bg-transparent"
                    on:click={() => openConfirm(produto.id_produto)}
                    disabled={deletingId === produto.id_produto || loading}>
                    <TrashBinOutline class="w-5 h-5 text-red-400" />
                  </button>
                {/if}
              </div>
            </div>
            <div class="px-4 pb-4 pt-2 flex flex-col gap-2 text-left">
              <button
  class="mt-2 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition w-full justify-center"
  on:click={() => adicionarAoCarrinho(produto)}
>
  <ShoppingBagOutline class="w-5 h-5" />
  Adicionar ao Carrinho
</button>
              <div class="flex items-center gap-2 text-left">
                <span class="text-gray-700 text-sm">{produto.nome}</span>
              </div>
            </div>
          </Card>
        {/each}
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
  
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="sr-only">Products</h2>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="Person using a pen to cross a task off a productivity paper card." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$89</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg" alt="Paper card sitting upright in walnut card holder on desk." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Focus Card Tray</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$64</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg" alt="Stack of 3 small drab green cardboard paper card refill boxes with white text." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Focus Multi-Pack</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$39</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg" alt="Brass scissors with geometric design, black steel finger holes, and included upright brass stand." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Brass Scissors</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$50</p>
      </a>
      <a href="#" class="group">
        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg" alt="Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 class="mt-4 text-sm text-gray-700">Focus Carry Pouch</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">$32</p>
      </a>
    </div>
  </div>