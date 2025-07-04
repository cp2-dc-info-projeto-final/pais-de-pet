<script lang="ts">
  import "../app.css";
</script>

<nav class="bg-pink-100 p-4 shadow-md">
  <ul class="flex flex-wrap gap-4 justify-center text-lg font-semibold">
    <li><a href="/" class="hover:text-pink-700">Início</a></li>
    <li><a href="/servicos" class="hover:text-pink-700">Serviços</a></li>
    <li><a href="/agendar" class="hover:text-pink-700">Agendar</a></li>
    <li><a href="/contato" class="hover:text-pink-700">Contato</a></li>
    <li><a href="/carrinho" class="hover:text-pink-700">Carrinho</a></li>
    <li><a href="/blog" class="hover:text-pink-700">Blog</a></li>
    <li><a href="/perfil" class="hover:text-pink-700">Perfil</a></li>
    <!-- <li><a href="/admin" class="hover:text-red-700">Admin</a></li> -->
  </ul>
</nav>

<main>
  <slot />
</main>