<script lang="ts">
    import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
    import Menu from '../../components/Menu.svelte';
  </script>
  
  <Menu />
  
  <div class="p-8 pt-20 min-h-screen flex flex-col  bg-gradient-to-b from-[#F4E1C1] via-[#E6D3B3] to-[#C49A6C]">
    <Heading tag="h1" class="text-4xl text-center font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
      Produtos da PetShop
    </Heading>
    
<form class="flex items-center max-w-sm mx-auto">   
    <label for="simple-search" class="sr-only">Insira o nome do produto</label>
    <div class="relative w-full">
        <div class="absolute inset-y-1 items-center ps-3 pointer-events-none">
            <svg class="h-0 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none">
            <img src="/images/eveeb.png" alt="" width="45" style="padding-right: 10px;">
            </svg>
        </div>
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-15 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insira o nome do produto." required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">a</span>
    </button>
</form>

    <P class="text-lg  text-gray-700 dark:text-gray-300 mb-4 ">
      a
    </P>
  
    <P class="text-base leading-relaxed text-gray-600 dark:text-gray-400 text-justify">
      Aqui, cada banho é mais refrescante que um Surf do Vaporeon, cada tosa mais estilosa que o penteado do Jolteon, e cada
      carinho mais aconchegante que um abraço do Sylveon. Não importa se o seu bichinho é um Poochyena, um Meowth ou um 
      Lillipup: nós tratamos todos como se fossem um Eevee pronto para evoluir no momento perfeito.
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Nossa equipe é composta por treinadores e cuidadores certificados, alguns com insígnias da Liga Pokémon e outros com 
      medalhas de participação em concursos de beleza de Growlithes. Temos orgulho de dizer que 87% dos nossos funcionários
      já foram lambidos por um Arcanine e sobreviveram para contar a história.
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Também oferecemos um serviço premium chamado "Dia de Evolução", no qual seu pet passa por um tratamento completo: 
      hidratação digna de Milotic, escovação mágica feita com escovas que brilham (provavelmente efeito placebo), e um 
      check-up rápido para garantir que não está prestes a virar um Flareon no meio do verão.
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Entre nossos clientes famosos estão: um Psyduck que parou de ter dor de cabeça depois da massagem relaxante com aroma
      de Oran Berry, um Snorlax que só acorda para cortar as unhas e um Eevee que já tentou evoluir em todas as formas possíveis,
      mas sempre muda de ideia no último segundo (provavelmente por indecisão crônica).
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Aqui, acreditamos que cada pet merece seu momento de brilhar, seja em um palco de Contest, em uma batalha contra um
      ginásio ou simplesmente no sofá assistindo Netflix (com legendas, porque até os Pokémon gostam de entender o enredo).
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Nossa loja também vende acessórios exclusivos, como coleiras inspiradas nas evoluções do Eevee, roupinhas de Pikachu,
      caminhas em formato de Pokébola e biscoitos artesanais feitos à mão (sem Rare Candy, a menos que o cliente insista).
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      Então, se você quer que seu bichinho seja tratado com o carinho de um Chansey, a paciência de um Slowbro e a energia
      de um Jolteon depois de tomar um café expresso, venha nos visitar. E lembre-se: um Eevee pode ser qualquer coisa que 
      quiser… assim como seu pet.
    </P>
  
    <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
      PetShop — onde a evolução começa com um carinho atrás da orelha.
    </P>
  </div>
  