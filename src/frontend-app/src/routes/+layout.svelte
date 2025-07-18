<script lang="ts">
	import '../app.css';
	import Menu from '../components/Menu.svelte';
	let { children } = $props();
</script>

<main>
  <Menu />
  <div>
    {@render children()}
  </div>
</main>
