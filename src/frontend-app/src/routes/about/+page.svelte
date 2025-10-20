<script lang="ts">
  import { onMount } from "svelte";

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  let currentDate = new Date();
  let todayYear = currentDate.getFullYear();
  let todayMonth = currentDate.getMonth();
  let todayDay = currentDate.getDate();

  let year = todayYear;
  let month = todayMonth;

  let daysInMonth: number;
  let firstDayOfMonth: number;
  let daysArray: (number | null)[] = [];

  let selectedDay: number | null = null;

  const availableHours = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  function generateCalendar() {
    daysInMonth = new Date(year, month + 1, 0).getDate();
    firstDayOfMonth = new Date(year, month, 1).getDay();

    daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
  }

  onMount(() => {
    generateCalendar();
  });

  function nextMonth() {
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
    selectedDay = null;
    generateCalendar();
  }

  function prevMonth() {
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    selectedDay = null;
    generateCalendar();
  }

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function selectDay(day: number) {
    if (isPastDay(day)) return;
    selectedDay = day;
  }

  function bookAppointment(hour: string) {
    alert(`Agendado para: ${selectedDay}/${month + 1}/${year} às ${hour}`);
    selectedDay = null;
  }

  function isPastDay(day: number): boolean {
    if (year < todayYear) return true;
    if (year === todayYear && month < todayMonth) return true;
    if (year === todayYear && month === todayMonth && day < todayDay) return true;
    return false;
  }
</script>

<div class="max-w-3xl mx-auto p-6 bg-white rounded shadow">
  <div class="flex justify-between items-center mb-6">
    <button on:click={prevMonth} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&lt;</button>
    <h2 class="text-2xl font-semibold">{monthNames[month]} {year}</h2>
    <button on:click={nextMonth} class="px-4 py-2 rounded hover:bg-gray-200 text-lg">&gt;</button>
  </div>

  <div class="grid grid-cols-7 gap-4 text-center font-semibold text-gray-700 text-lg">
    {#each weekDays as day}
      <div>{day}</div>
    {/each}
  </div>

  <div class="grid grid-cols-7 gap-4 mt-4 text-center text-xl">
    {#each daysArray as day}
      {#if day === null}
        <div class="h-16"></div>
      {:else}
        <div
          on:click={() => selectDay(day)}
          class={`h-16 flex items-center justify-center rounded cursor-pointer select-none
            hover:bg-blue-200
            ${selectedDay === day ? 'bg-blue-500 text-white font-bold' : ''}
            ${isPastDay(day) ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
          `}
        >
          {day}
        </div>
      {/if}
    {/each}
  </div>

  {#if selectedDay !== null}
    <div class="mt-8 p-6 border rounded bg-gray-50">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-xl">Horários disponíveis para {selectedDay}/{month + 1}/{year}</h3>
        <button on:click={() => (selectedDay = null)} class="text-gray-600 hover:text-gray-900 text-2xl leading-none">&times;</button>
      </div>

      <div class="grid grid-cols-4 gap-6">
        {#each availableHours as hour}
          <button
            on:click={() => bookAppointment(hour)}
            class="py-3 rounded bg-blue-600 text-white hover:bg-blue-700 text-lg"
          >
            {hour}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
