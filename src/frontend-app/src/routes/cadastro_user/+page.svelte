<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
  
    export let id: number | null = null; // id do usuário
  
    type User = {
      id: number;
      imagem_url: string;
      usuario: string;
      email: string;
      nome: string;
      senha: string;
      confirm_senha: string;
      telefone: string;
    };
  
    let user: User = { id: 0, imagem_url: '' ,usuario: '', email: '', nome: '', senha: '', confirm_senha: '', telefone: ''}; // dados do form
    let loading = false;
    let error = '';
    let errorBox: HTMLDivElement | null = null;
  
    // Carrega usuário se for edição
    onMount(async () => {
    if (id !== null) {
      loading = true;
      try {
        const res = await api.get(`/users/${id}`);
        const data = res.data.data;
        const errorMgs = res.data.message
        user = { ...data, senha: '', confirm_senha: '' }; // senha não vem do backend
      } catch (e) {
        error = 'Erro ao carregar dados do usuário.';
      } finally {
        loading = false;
      }
    } 
  });
  
  // Submissão do formulário
  async function handleSubmit() {
    loading = true;
    error = '';
    try {
      const payload = {
        imagem_url: user.imagem_url,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        senha: user.senha,
        telefone: user.telefone
      };

      if (user.senha.length < 8){
        error = 'A senha deve ter no mínimo 8 caracteres!';
        loading = false;
        return;
      }
      if (user.senha !== user.confirm_senha) {
        error = 'As senhas não coincidem!';
        loading = false;
        return;
      }

      if (id === null) {
        await api.post('/users', payload);
      } else {
        await api.put(`/users/${id}`, payload);
      }
      goto('/');
    } catch (e: any) {
      // Pega a mensagem do backend
      if (e.response && e.response.data && e.response.data.message) {
        error = e.response.data.message;
      }
      else {
        error = 'Erro ao salvar dados do usuário.';
      }
    } finally {
      loading = false;
    }
  }
  
  function handleVoltar() {
    goto('/adm_menu');
  }

  let thumbnail;

  function handleFileChange(event) {
    // Ou faça algo mais útil com os arquivos
    let imagem = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imagem);
    reader.onload = event => {
          thumbnail = event?.target?.result;
          if (event?.target?.result) {
            user.imagem_url = event.target.result;
          } else {
          user.imagem_url = "";
          }
          
    };}
</script>
  
<div class="pt-20 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C]">
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg bg-gradient-to-b from-[#8d6a2f] via-[#E6D3B3] to-[#804404]">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit} novalidate>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id === null ? 'Cadastrar Usuário' : 'Editar Usuário'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-black text-center text-2xl text-shadow-red-700">{error}</div>
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
      <!-- Campo usuario -->
      <div>
        <Label for="usuario">Usuario</Label>
        <Input id="usuario" bind:value={user.usuario} placeholder="Digite o login" required class="mt-1" />
      </div>
      <!-- Campo email -->
      {#if id === null}
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={user.email} placeholder="Digite o e-mail" required class="mt-1" />
      </div>
      {/if}
      <!-- Campo nome -->
      <div>
        <Label for="nome">Nome</Label>
        <Input id="nome" type="string" bind:value={user.nome} placeholder="Digite seu nome" required class="mt-1"/>
      </div>
      <!-- Campo senha -->
      <div>
        <Label for="senha">Senha</Label>
        <Input id="senha" type="password" bind:value={user.senha} placeholder="Digite sua senha" required class="mt-1"/>
      </div>
      <!-- Campo confirmar senha -->
      {#if id === null}
      <div>
        <Label for="confirm_senha">Confirmar senha</Label>
        <Input id="confirm_senha" type="password" bind:value={user.confirm_senha} placeholder="Digite sua senha novamente" required class="mt-1"/>
      </div>
      {/if}
      <!-- Campo telefone -->
      <div>
        <Label for="telefone">Telefone</Label>
        <Input id="telefone" type="string" bind:value={user.telefone} placeholder="Digite seu telefone" required class="mt-1"/>
      </div>
      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão voltar -->
        {#if id}
        <Button color="light" type="button" onclick={handleVoltar} disabled={loading}>Voltar
        <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        </Button>
        {/if}
        
        <!-- Botão salvar -->
        <Button type="submit" color="primary" disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id === null ? 'Cadastrar' : 'Salvar'}
        </Button>
      </div>
    </form>
  </Card>
</div>