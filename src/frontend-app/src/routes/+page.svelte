<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import Menu from '../components/Menu.svelte';
  import {  P, ImagePlaceholder, Skeleton, TextPlaceholder } from "flowbite-svelte";
</script>

<Menu />

<div class="text-center py-10 bg-gradient-to-b from-amber-800 to-amber-950 min-h-screen">
	
	<P class="text-lg text-black mb-10 max-w-3xl mx-auto leading-relaxed text-justify">
		Bem vindo a aplicação Pais de Pets Poderosos! Aqui, você pode gerenciar informações sobre usuários e seus adoráveis pets. Navegue pelo menu para cadastrar novos usuários, visualizar a lista de usuários existentes e saber mais sobre o projeto. Aproveite a experiência e cuide bem dos seus pets!
	</P>

	<Skeleton class="mt-16 mb-8 mx-auto w-64 h-8 rounded-xl bg-pink-200 animate-pulse" />
	<ImagePlaceholder class="my-8 mx-auto w-72 h-72 rounded-2xl shadow-md bg-white" />
	<TextPlaceholder class="my-8 mx-auto w-3/4 bg-pink-100 rounded-xl p-4 shadow" />
</div>