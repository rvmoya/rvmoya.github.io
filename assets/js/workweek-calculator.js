(() => {
  const root = document.querySelector("[data-workweek-calculator]");
  if (!root) return;

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const defaultBreaks = ["00:30", "00:30", "00:30", "00:30", "00:00"];

  const targetInput = root.querySelector("[data-weekly-target]");
  const rows = Array.from(root.querySelectorAll("[data-day-row]"));
  const totalWorkedEl = root.querySelector("[data-total-worked]");
  const remainingEl = root.querySelector("[data-remaining]");
  const unfinishedEl = root.querySelector("[data-unfinished]");
  const averageEl = root.querySelector("[data-average-required]");
  const recalcButton = root.querySelector("[data-recalculate]");
  const resetButton = root.querySelector("[data-reset]");

  function parseDuration(value) {
    if (!value || !/^\d{1,3}:\d{2}$/.test(value.trim())) return null;
    const [hours, minutes] = value.trim().split(":").map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || minutes > 59) return null;
    return (hours * 60) + minutes;
  }

  function parseClock(value) {
    if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
    const [hours, minutes] = value.split(":").map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || hours > 23 || minutes > 59) return null;
    return (hours * 60) + minutes;
  }

  function formatDuration(totalMinutes) {
    const safeMinutes = Math.max(0, Math.round(Number.isFinite(totalMinutes) ? totalMinutes : 0));
    const hours = Math.floor(safeMinutes / 60);
    const minutes = safeMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function formatClock(totalMinutes) {
    const wrapped = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
    const hours = Math.floor(wrapped / 60);
    const minutes = wrapped % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function normalizedTarget() {
    const parsed = parseDuration(targetInput.value);
    return parsed === null ? 2400 : parsed;
  }

  function calculate() {
    const targetMinutes = normalizedTarget();
    let completedMinutes = 0;
    const unfinishedRows = [];
    const rowData = [];

    rows.forEach((row, index) => {
      const clockInInput = row.querySelector("[data-clock-in]");
      const clockOutInput = row.querySelector("[data-clock-out]");
      const breakInput = row.querySelector("[data-break]");
      const workedEl = row.querySelector("[data-worked]");
      const suggestedEl = row.querySelector("[data-suggested-leave]");

      const clockIn = parseClock(clockInInput.value);
      const clockOut = parseClock(clockOutInput.value);
      const breakMinutes = parseDuration(breakInput.value) ?? 0;

      let workedMinutes = null;

      if (clockIn !== null && clockOut !== null) {
        let elapsed = clockOut - clockIn;
        if (elapsed < 0) elapsed += 1440;
        workedMinutes = Math.max(0, elapsed - breakMinutes);
        completedMinutes += workedMinutes;
        workedEl.textContent = formatDuration(workedMinutes);
        row.classList.add("rm-wwc-row--complete");
      } else {
        unfinishedRows.push(index);
        workedEl.textContent = "—";
        row.classList.remove("rm-wwc-row--complete");
      }

      suggestedEl.textContent = "—";
      rowData.push({ clockIn, clockOut, breakMinutes });
    });

    const remainingMinutes = Math.max(0, targetMinutes - completedMinutes);
    const averageRequired = unfinishedRows.length > 0
      ? remainingMinutes / unfinishedRows.length
      : 0;

    totalWorkedEl.textContent = formatDuration(completedMinutes);
    remainingEl.textContent = formatDuration(remainingMinutes);
    unfinishedEl.textContent = String(unfinishedRows.length);
    averageEl.textContent = formatDuration(averageRequired);

    unfinishedRows.forEach((rowIndex) => {
      const data = rowData[rowIndex];
      if (data.clockIn === null || data.clockOut !== null) return;

      const suggestedMinutes = data.clockIn + averageRequired + data.breakMinutes;
      const suggestedEl = rows[rowIndex].querySelector("[data-suggested-leave]");
      suggestedEl.textContent = formatClock(suggestedMinutes);
      suggestedEl.classList.add("rm-wwc-suggested");
    });
  }

  function reset() {
    rows.forEach((row, index) => {
      row.querySelector("[data-clock-in]").value = "";
      row.querySelector("[data-clock-out]").value = "";
      row.querySelector("[data-break]").value = defaultBreaks[index];
      row.querySelector("[data-suggested-leave]").classList.remove("rm-wwc-suggested");
    });

    targetInput.value = "40:00";
    calculate();
  }

  root.addEventListener("input", (event) => {
    if (event.target.matches("input")) calculate();
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches("input")) calculate();
  });

  recalcButton.addEventListener("click", calculate);
  resetButton.addEventListener("click", reset);

  rows.forEach((row, index) => {
    row.querySelector("[data-day-label]").textContent = weekdays[index];
  });

  calculate();
})();