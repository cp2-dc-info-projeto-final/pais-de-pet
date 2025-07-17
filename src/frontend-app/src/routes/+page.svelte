<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import Menu from '../components/Menu.svelte';
  import {  P, ImagePlaceholder, Skeleton, TextPlaceholder } from "flowbite-svelte";
</script>

<Menu />

<div class="text-center py-10 bg-gradient-to-b from-pink-300 to-white min-h-screen">
	<Heading tag="h2" class="text-4xl font-bold text-pink-700 mb-6">Home</Heading>
	
	<P class="text-lg text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed text-justify">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, sapien et dictum cursus, urna erat laoreet enim, nec gravida urna erat at sapien. Etiam nec dolor vitae odio hendrerit venenatis. Proin nec turpis nec sem tempus dictum. Vivamus tincidunt, nisi nec facilisis cursus, enim erat dictum neque, at dignissim enim urna at velit. Integer non turpis id mi tristique cursus. Nullam in sem vitae massa dictum dictum.
	</P>

	<Skeleton class="mt-16 mb-8 mx-auto w-64 h-8 rounded-xl bg-pink-200 animate-pulse" />
	<ImagePlaceholder class="my-8 mx-auto w-72 h-72 rounded-2xl shadow-md bg-white" />
	<TextPlaceholder class="my-8 mx-auto w-3/4 bg-pink-100 rounded-xl p-4 shadow" />
</div>