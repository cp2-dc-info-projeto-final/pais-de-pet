<script lang="ts">
  import { onMount } from "svelte";
  import { user } from '$lib/stores/user';
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
  
  // Variáveis para controle de erros
  let error = '';
  let success = '';
  let loading = false;

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
  let servicoSelecionado: number;

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
    carregarServicos();
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
    error = '';
    success = '';
  }

  async function agendarHorario(horario: string) {
    error = '';
    success = '';
    loading = true;
    
    // Validações
    if (diaSelecionado === null) {
      error = 'Selecione um dia antes de agendar.';
      loading = false;
      return;
    }

    if (!servicoSelecionado) {
      error = 'Selecione um tipo de serviço antes de agendar.';
      loading = false;
      return;
    }

    const usuarioLogado = get(user);
    if (!usuarioLogado || !usuarioLogado.id) {
      error = 'Você precisa estar logado para agendar.';
      loading = false;
      await carregarAgendamentos();
      return;
    }

    const idUsuario = usuarioLogado.id;

    const dataSelecionada = new Date(ano, mes, diaSelecionado);
    const [hora, minuto] = horario.split(":");
    dataSelecionada.setHours(parseInt(hora), parseInt(minuto), 0, 0);

    try {
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
        success = `Agendamento confirmado para ${diaSelecionado}/${mes + 1}/${ano} às ${horario}!!!`;
        diaSelecionado = null;
        servicoSelecionado = undefined;
        await carregarAgendamentos();
      } else {
        const erro = await resposta.json();
        error = `Erro ao agendar: ${erro.erro || 'Tente novamente.'}`;
      }
    } catch (err) {
      error = 'Erro de conexão ao tentar agendar.';
      console.error(err);
    }
  }

  let agendamentos: any[] = [];

  async function carregarAgendamentos() {
    const usuarioLogado = get(user);
    if (!usuarioLogado || !usuarioLogado.id) return;

    try {
      const resposta = await fetch(`http://localhost:3000/agenda/${usuarioLogado.id}`);
      
      if (resposta.ok) {
        agendamentos = await resposta.json();
      } else {
        console.error("Erro ao carregar agendamentos");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
    }
  }

  function diaNoPassado(dia: number): boolean {
    if (ano < anoHoje) return true;
    if (ano === anoHoje && mes < mesHoje) return true;
    if (ano === anoHoje && mes === mesHoje && dia < diaHoje) return true;
    return false;
  }

  async function cancelarAgendamento(id_agenda: number) {
    error = '';
    success = '';
    
    const confirmar = window.confirm("Tem certeza que deseja cancelar este agendamento?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:3000/agenda/${id_agenda}`, {
        method: 'DELETE'
      });

      if (resposta.ok) {
        success = "Você não pode agendar sem selecionar um horario ou serviço";
        await carregarAgendamentos();
      } else {
        error = "Erro ao cancelar o agendamento.";
      }
    } catch (err) {
      error = "Erro de conexão ao tentar cancelar.";
      console.error(err);
    }
  }
</script>

<div class='p-31' style='background-color: #CAF0F8'>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded shadow" style='background-color: #90E00EF'>
    
    <!-- Mensagens de erro/sucesso no topo -->
    {#if error}
      <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    {/if}

    {#if success}
      <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{success}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Calendário -->
    <div class="flex justify-between items-center mb-6">
      <button on:click={mesAnterior} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&lt;</button>
      <h2 class="text-2xl font-semibold">{nomesMeses[mes]} {ano}</h2>
      <button on:click={proximoMes} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&gt;</button>
    </div>

    <div class="grid grid-cols-7 gap-4 text-center font-semibold text-gray-700 text-lg">
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
            on:click={() => selecionarDia(dia)} class={`h-16 flex items-center justify-center rounded cursor-pointer select-none hover:bg-blue-200 ${diaSelecionado === dia ? 'bg-blue-500 text-white font-bold' : ''} ${diaNoPassado(dia) ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}`}>
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
          >
            <option value="" disabled selected>-- Escolha um serviço --</option>
            {#each servicos as servico}
              <option value={servico.id_servico}>{servico.tipo_servico}</option>
            {/each}
          </select>
          
          {#if error && error.includes('serviço')}
            <p class="mt-1 text-sm text-red-600">Por favor, selecione um serviço antes de selecionar um horario</p>
          {/if}
        </div>
        
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-xl">Horários disponíveis para {diaSelecionado}/{mes + 1}/{ano}</h3>
          <button on:click={() => (diaSelecionado = null)} class="text-gray-600 hover:text-gray-900 text-2xl leading-none">&times;</button>
        </div>
        
        <div class="grid grid-cols-4 gap-6">
          {#each horariosDisponiveis as horario}
            <button
              on:click={() => agendarHorario(horario)}
              disabled={loading}
              class="py-3 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-lg"
            >
              {#if loading}
                Processando...
              {:else}
                {horario}
              {/if}
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
                class="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm"
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