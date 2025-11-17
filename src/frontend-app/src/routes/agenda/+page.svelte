<script lang="ts">
  import { onMount } from "svelte";
  import { user } from '$lib/stores/user';  // importa a store do usuário logado
  import { get } from 'svelte/store';
  
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  let dataAtual = new Date();
  let anoHoje = dataAtual.getFullYear();
  let mesHoje = dataAtual.getMonth();
  let diaHoje = dataAtual.getDate();

  let ano = anoHoje;
  let mes = mesHoje;

  let totalDiasMes: number;
  let primeiroDiaMes: number;
  let diasDoCalendario: (number | null)[] = [];

  let diaSelecionado: number | null = null;

  const horariosDisponiveis = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  function gerarCalendario() {
    totalDiasMes = new Date(ano, mes + 1, 0).getDate();
    primeiroDiaMes = new Date(ano, mes, 1).getDay();

    diasDoCalendario = [];

    for (let i = 0; i < primeiroDiaMes; i++) {
      diasDoCalendario.push(null);
    }

    for (let i = 1; i <= totalDiasMes; i++) {
      diasDoCalendario.push(i);
    }
  }
let servicos: any[] = [];
let servicoSelecionado: number

async function carregarServicos() {
  try {
    const resposta = await fetch('http://localhost:3000/agenda/servicos');
    if (resposta.ok) {
      servicos = await resposta.json();
    } else {
      console.error("Erro ao carregar serviços");
    }
  } catch (err) {
    console.error("Erro de conexão ao carregar serviços:", err);
  }
}


onMount(() => {
  gerarCalendario();
  carregarAgendamentos();
  carregarServicos();// 👈 carrega os tipos de serviço ao montar a página
});




  function proximoMes() {
    if (mes === 11) {
      mes = 0;
      ano++;
    } else {
      mes++;
    }
    diaSelecionado = null;
    gerarCalendario();
  }

  function mesAnterior() {
    if (mes === 0) {
      mes = 11;
      ano--;
    } else {
      mes--;
    }
    diaSelecionado = null;
    gerarCalendario();
  }

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function selecionarDia(dia: number) {
    if (diaNoPassado(dia)) return;
    diaSelecionado = dia;
  }

  async function agendarHorario(horario: string) {
  if (diaSelecionado === null) return;

  if (!servicoSelecionado) {
    alert("Selecione um tipo de serviço antes de agendar.");
    return;
  }

  const usuarioLogado = get(user);
  if (!usuarioLogado || !usuarioLogado.id) {
    alert('Você precisa estar logado para agendar.');
    await carregarAgendamentos();
    return;
  }

  const idUsuario = usuarioLogado.id;

  const dataSelecionada = new Date(ano, mes, diaSelecionado);
  const [hora, minuto] = horario.split(":");
  dataSelecionada.setHours(parseInt(hora), parseInt(minuto), 0, 0);

  const resposta = await fetch('http://localhost:3000/agenda', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      datetime: dataSelecionada.toISOString(),
      userId: idUsuario,
      serviceId: servicoSelecionado
    })
  });

  if (resposta.ok) {
    alert(`Agendamento salvo para ${diaSelecionado}/${mes + 1}/${ano} às ${horario}`);
    diaSelecionado = null;
    await carregarAgendamentos();
  } else {
    const erro = await resposta.json();
    alert(`Erro ao agendar: ${erro.erro || 'Tente novamente.'}`);
  }
}


  let agendamentos: any[] = [];

  async function carregarAgendamentos() {
    const usuarioLogado = get(user);
    if (!usuarioLogado || !usuarioLogado.id) return;

    const resposta = await fetch(`http://localhost:3000/agenda/${usuarioLogado.id}`);

    if (resposta.ok) {
      agendamentos = await resposta.json();
    } else {
      console.error("Erro ao carregar agendamentos");
    }
  }


  function diaNoPassado(dia: number): boolean {
    if (ano < anoHoje) return true;
    if (ano === anoHoje && mes < mesHoje) return true;
    if (ano === anoHoje && mes === mesHoje && dia < diaHoje) return true;
    return false;
  }

  async function cancelarAgendamento(id_agenda: number) {
  const confirmar = confirm("Tem certeza que deseja cancelar este agendamento?");
  if (!confirmar) return;

  const resposta = await fetch(`http://localhost:3000/agenda/${id_agenda}`, {
    method: 'DELETE'
  });

  if (resposta.ok) {
    alert("Agendamento cancelado com sucesso!");
    await carregarAgendamentos();
  } else {
    alert("Erro ao cancelar o agendamento.");
  }
}


</script>

<div class='p-31' style='background-color: #CAF0F8'>
<!-- HTML com texto em português -->
<div class="max-w-3xl mx-auto p-6 bg-white rounded shadow" style='background-color: #90E00EF'>
  <div class="flex justify-between items-center mb-6">
    <button on:click={mesAnterior} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&lt;</button>
    <h2 class="text-2xl font-semibold">{nomesMeses[mes]} {ano}</h2>
    <button on:click={proximoMes} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&gt;</button>
  </div>

  <div class="grid grid-cols-7 gap-4 text-center font-semibold text-gray-700 text-lg" >
    {#each diasSemana as dia}
      <div>{dia}</div>
    {/each}
  </div>

  <div class="grid grid-cols-7 gap-4 mt-4 text-center text-xl">
    {#each diasDoCalendario as dia}
      {#if dia === null}
        <div class="h-16"></div>
      {:else}
        <div
          on:click={() => selecionarDia(dia)}
          class={`h-16 flex items-center justify-center rounded cursor-pointer select-none
            hover:bg-blue-200
            ${diaSelecionado === dia ? 'bg-blue-500 text-white font-bold' : ''}
            ${diaNoPassado(dia) ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
          `}
        >
          {dia}
        </div>
      {/if}
    {/each}
  </div>

  {#if diaSelecionado !== null}
    <div class="mt-8 p-6 border rounded bg-gray-50">
      <div class="mb-6">
        <label for="servico" class="block text-lg font-semibold mb-2">
          Selecione o tipo de serviço:
        </label>
      
        <select
          id="servico"
          bind:value={servicoSelecionado}
          class="border rounded p-2 w-full text-lg"
        >
        <option value="" disabled selected>-- Escolha um serviço --</option>
        {#each servicos as servico}
          <option value={servico.id_servico}>{servico.tipo_servico}</option>
        {/each}
        </select>
      </div>      
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-xl">Horários disponíveis para {diaSelecionado}/{mes + 1}/{ano}</h3>
        <button on:click={() => (diaSelecionado = null)} class="text-gray-600 hover:text-gray-900 text-2xl leading-none">&times;</button>
      </div>
      <div class="grid grid-cols-4 gap-6">
        {#each horariosDisponiveis as horario}
          <button
            on:click={() => agendarHorario(horario)}
            class="py-3 rounded bg-blue-600 text-white hover:bg-blue-700 text-lg"
          >
            {horario}
          </button>
        {/each}
      </div>
    </div>
  {/if}
  {#if agendamentos.length > 0}
  <div class="mt-10 p-6 border rounded bg-gray-50">
    <h3 class="text-xl font-semibold mb-4">Seus agendamentos</h3>

    <ul class="space-y-2">
      {#each agendamentos as agendamento}
        <li class="p-3 border rounded bg-white flex justify-between items-center">
          <div>
            <p><strong>Serviço:</strong> {agendamento.tipo_servico}</p>
            <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleString('pt-BR')}</p>
          </div>
          <button
            on:click={() => cancelarAgendamento(agendamento.id_agenda)}
            class="text-red-600 hover:underline"
          >
            Cancelar
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}
</div>
</div>