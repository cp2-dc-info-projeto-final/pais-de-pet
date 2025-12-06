<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
    import { user } from '$lib/stores/user';
    import { get } from 'svelte/store';
	  import ProdutosTable from '../../components/ProdutosTable.svelte';
  
    export let id_produto: number | null = null; // id do produto

    const is_admin = Boolean(req.body.is_admin) && 
                 (req.body.is_admin !== 'false');

    const is_admin = req.body.is_admin || false; // Valor padrão false

    type Produto = {
      id_produto: number;
      nome: string;
      descricao: string;
      preco: string;
      estoque: string;
      imagem_url: string;
      categoria_id: string;
    };
    
    let produto: Produto = { 
    id_produto: 0, 
    nome: '', 
    descricao: '', 
    preco: '', 
    estoque: '', 
    imagem_url: '',
    categoria_id: ''
    }; // dados do form
    let loading = false;
    let error = '';
    let errorBox: HTMLDivElement | null = null;

    let thumbnail;

    function checkUser() {
    if (!$user) {
    goto('/login_user');
    }
  }
  console.log(produto)
    onMount(() => {
    checkUser();
  });
  
  // Submissão do formulário
  async function handleSubmit() {
    loading = true;
    error = '';
    try {
      const payload = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: parseFloat(produto.preco),
      estoque: parseInt(produto.estoque),
      imagem_url: produto.imagem_url,
      categoria_id: parseInt(produto.categoria_id)
    };

      if (id_produto === null) {
        await api.post('/produto', payload);
      } else {
        await api.put(`/produto/${id_produto}`, payload);
      }
      goto('/');
    } catch (e: any) {
      // Pega a mensagem do backend
      if (e.response && e.response.data && e.response.data.message) {
        error = e.response.data.message;
      }
      else {
        error = 'Erro ao salvar dados do produto.';
      }
    } finally {
      loading = false;
    }
  }
  
  function handleFileChange(event) {
    // Ou faça algo mais útil com os arquivos
    let imagem = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(imagem);
            reader.onload = event => {
                 thumbnail = event?.target?.result;
                 if (event?.target?.result) {
                    produto.imagem_url = event.target.result;
                 } else {
                  produto.imagem_url = "";
                 }
                 
            };
  }

  function handleVoltar() {
    goto('/adm_produtos');
  }
</script>
  
<div class="pt-20 min-h-screen flex flex-col items-center" style="background-color: #CAF0F8;">
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg" style="background-color: #90E0EF;">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id_produto === null ? 'Cadastrar Produto' : 'Editar Produto'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <!-- Campo imagem -->
      <div class="max-w-md mx-auto">
        {#if thumbnail}
        <img src="{thumbnail}">
        {:else}
        <label for="file-upload" class="flex justify-center items-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <!-- Pré-visualização da imagem (inicialmente oculta) -->
          <img id="preview-image" class="hidden h-full w-full object-cover rounded-lg" alt="Pré-visualização da imagem">
          
          <!-- Ícone e texto de upload (exibidos quando nenhuma imagem for selecionada) -->
          <div id="upload-placeholder" class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3m0 0l-3-3m3 3V8M28 8h12a4 4 0 014 4v4m-32 0l-3-3m0 0l-3-3m3 3V8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-600">
              <span class="font-semibold">Clique para fazer upload</span> ou arraste e solte
            </p>
            <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
          </div>
        </label>
        <!--<input id="file-upload" type="file" class="sr-only" accept="image/*" on:change={handleFileChange}>-->
          <input id="file-upload" style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>handleFileChange(e)} >
        {/if}
        
      </div>
      <!-- Campo produto -->
      <div>
        <Label for="nome">Produto</Label>
        <Input id="nome" type='string' bind:value={produto.nome} placeholder="Digite o nome do produto" required class="mt-1" />
      </div>
      <!-- Campo descricao -->
      {#if id_produto === null}
      <div>
        <Label for="descricao">Descrição</Label>
        <Input id="descricao" type="string" bind:value={produto.descricao} placeholder="Digite a descrição do produto" required class="mt-1" />
      </div>
      {/if}
      <!-- Campo preço -->
      <div>
        <Label for="preco">Preço</Label>
        <Input id="preco" type="number" bind:value={produto.preco} placeholder="Digite o preço " required class="mt-1"/>
      </div>
      <!-- Campo estoque -->
      <div>
        <Label for="estoque">Estoque</Label>
        <Input id="estoque" type="number" bind:value={produto.estoque} placeholder="Digite a quantidade no estoque" required class="mt-1"/>
      </div>
      <!-- Campo categoria -->
      {#if id_produto === null}
      <div>
        <Label for="categoria">Categoria</Label>
        <Input id="categoria" type='text' bind:value={produto.categoria_id} placeholder="Digite a categoria do produto" required class="mt-1"/>
      </div>
      {/if}
      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão cancelar/voltar -->
        <Button color="light" type="button" onclick={handleVoltar} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id_produto === null ? 'Voltar' : 'Cancelar'}
        </Button>
        <!-- Botão salvar -->
        <Button type="submit" color="primary" disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id_produto === null ? 'Cadastrar' : 'Salvar'}
        </Button>
      </div>
    </form>
  </Card>
</div>