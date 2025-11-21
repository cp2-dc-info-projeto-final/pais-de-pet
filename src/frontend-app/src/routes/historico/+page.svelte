<script lang="ts">
    import { onMount } from 'svelte';
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Heading, P } from 'flowbite-svelte';
    import Menu from '../../components/Menu.svelte';
    import { user } from '$lib/stores/user';
    import { goto } from '$app/navigation';
    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: number;
    };
  
    type Compra = {
      data: string;
      itens: Produto[];
    };
  
    let historico: Compra[] = [];
    ''
    function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }
    onMount(() => {
    checkUser();
      const salvo = localStorage.getItem('historico_compras');
      if (salvo) {
        try {
          historico = JSON.parse(salvo);
        } catch {
          historico = [];
        }
      }
    });

    function removerCompra(index: number) {
  // Remove a compra do array
  historico.splice(index, 1);

  // Atualiza o localStorage
  localStorage.setItem('historico_compras', JSON.stringify(historico));
}

  </script>
  
  <Menu />
  
  <div class="min-h-screen pt-20 text-gray-900 dark:text-white p-8" style="background-color: #CAF0F8;">
    <Heading tag="h1" class="text-4xl font-bold mb-8 text-center">Histórico de Compras</Heading>
  
    {#if historico.length === 0}
      <P class="text-gray-600 dark:text-gray-300 text-center">Nenhuma compra realizada ainda.</P>
    {:else}
      <div class="flex flex-col gap-6 max-w-4xl mx-auto">
        {#each historico as compra, index}
          <Card class="p-4 shadow-lg border border-gray-200 bg-white dark:bg-gray-800">
            <Heading tag="h2" class="text-xl font-bold mb-2">
              Compra #{index + 1} — {compra.data}
            </Heading>
  
            <!-- Tabela de itens -->
            <Table class="w-full shadow border border-gray-200 rounded-lg">
              <TableHead>
                {#if $user.is_admin}
                <TableHeadCell>ID</TableHeadCell>
                {/if}
                <TableHeadCell>Nome</TableHeadCell>
                <TableHeadCell>Descrição</TableHeadCell>
                <TableHeadCell>Preço (R$)</TableHeadCell>
              </TableHead>
  
              <TableBody>
                {#each compra.itens as item}
                  <TableBodyRow>
                    {#if $user.is_admin}
                    <TableBodyCell>{item.id_produto}</TableBodyCell>
                    {/if}
                    <TableBodyCell>{item.nome}</TableBodyCell>
                    <TableBodyCell>{item.descricao}</TableBodyCell>
                    <TableBodyCell>
                      {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
            </Table>
  
            <!-- Total -->
            <P class="text-right text-lg font-semibold mt-3">
              Total: 
              {compra.itens.reduce((acc, item) => acc + item.preco, 0)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </P>
            <!-- Botão de Remover Historico
            <div class="flex justify-between items-center mb-2">
                <Heading tag="h2" class="text-xl font-bold">
                  Compra #{index + 1} — {compra.data}
                </Heading>
              
                <button
                  class="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm shadow transition"
                  on:click={() => removerCompra(index)}
                >
                  Remover
                </button>
              </div>
              -->

        </Card>
        {/each}
      </div>
    {/if}
  </div>
  