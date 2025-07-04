<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    let isLogin = true;
  
    function toggleMode() {
      isLogin = !isLogin;
    }
  
    function handleSubmit(e: Event) {
      e.preventDefault();
      alert(`${isLogin ? 'Login' : 'Cadastro'} realizado com sucesso!`);
    }
  </script>
  
  <section class="text-center py-12 px-4 bg-gradient-to-b from-pink-100 to-white min-h-screen">
    {#key isLogin}
      <h1
        class="text-3xl font-bold text-pink-700 mb-8"
        in:fade={{ duration: 400 }}
        out:fade={{ duration: 400 }}
      >
        {isLogin ? 'Login' : 'Cadastro'} na PetShop
      </h1>
    {/key}
  
    <form
      on:submit|preventDefault={handleSubmit}
      class="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md"
    >
      {#if !isLogin}
        <div
          class="mb-4 text-left"
          in:slide={{ duration: 500 }}
          out:slide={{ duration: 300 }}
        >
          <label for="nome" class="block text-gray-700 font-semibold mb-1">Nome</label>
          <input
            id="nome"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-pink-300"
          />
        </div>
      {/if}
  
      <div
        class="mb-4 text-left"
        in:fade={{ duration: 400 }}
        out:fade={{ duration: 200 }}
      >
        <label for="email" class="block text-gray-700 font-semibold mb-1">Email</label>
        <input
          id="email"
          type="email"
          required
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-pink-300"
        />
      </div>
  
      <div
        class="mb-6 text-left"
        in:fade={{ duration: 400 }}
        out:fade={{ duration: 200 }}
      >
        <label for="senha" class="block text-gray-700 font-semibold mb-1">Senha</label>
        <input
          id="senha"
          type="password"
          required
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-pink-300"
        />
      </div>
  
      <button
        type="submit"
        class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl"
        in:fade={{ duration: 300 }}
      >
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </button>
  
      <p class="mt-6 text-sm text-gray-600">
        {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
        <button
          type="button"
          on:click={toggleMode}
          class="text-pink-600 hover:underline font-semibold ml-1"
        >
          {isLogin ? 'Cadastre-se' : 'Faça login'}
        </button>
      </p>
    </form>
  </section>
  