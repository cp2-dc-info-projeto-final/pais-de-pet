<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import { UserAddOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/user';
  import { onMount } from 'svelte';
  import ProdutosTable from '../../components/ProdutosTable.svelte';

  function checkUser() {
    if (!$user) {
      goto('/login_user');
    }
  }

  onMount(() => {
    checkUser();
  });
</script>


<div class="text-center p-8 pt-32" style="background-color: #CAF0F8;">
  <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      Vitrine
    </Heading>

    {#if $user?.is_admin}
      <button
        class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold shadow transition"
        on:click={() => goto('/cadastro_produto')}>
        <UserAddOutline class="w-5 h-5" />
        Adicionar
      </button>
    {/if}
  </div>

  <ProdutosTable />
</div>
