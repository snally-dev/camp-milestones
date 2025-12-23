import { calculateMilestones, formatDate, daysInYear } from "./calculator.js";

const form = document.getElementById("milestone-form");
const currentCountEl = document.getElementById("current-count");
const startDateEl = document.getElementById("start-date");
const resultsEl = document.getElementById("results");

function toDateInputValueLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateInputLocal(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDayLocal(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function initStartDatePickerAndBounds() {
  const today = new Date();
  const year = today.getFullYear();

  const startOfYear = new Date(year, 0, 1);
  const min = toDateInputValueLocal(startOfYear);
  const max = toDateInputValueLocal(today);

  startDateEl.min = min;
  startDateEl.max = max;

  startDateEl.value = min;
  startDateEl.defaultValue = min;

  currentCountEl.max = String(daysInYear(year)); // 365 or 366
}

function renderMilestones(milestoneDates, endOfYearProjection, averagePerWeek) {
  for (const [milestone, dateObjOrNull] of Object.entries(milestoneDates)) {
    const el = document.getElementById(`m-${milestone}`);
    if (!el) continue;
    el.textContent = dateObjOrNull ? formatDate(dateObjOrNull) : "—";
  }

  document.getElementById("average-per-week").textContent = Number.isFinite(
    averagePerWeek
  )
    ? averagePerWeek.toFixed(1)
    : "—";

  document.getElementById("end-of-year-projection").textContent =
    Number.isFinite(endOfYearProjection) ? `${endOfYearProjection}` : "—";

  resultsEl.hidden = false;
}

function calculateAndRender() {
  const raw = currentCountEl.value;
  const currentCount = raw === "" ? NaN : Number(raw);

  if (
    !Number.isFinite(currentCount) ||
    currentCount < 0 ||
    !startDateEl.value ||
    !currentCountEl.validity.valid ||
    !startDateEl.validity.valid
  ) {
    resultsEl.hidden = true;
    return;
  }

  const startDate = parseDateInputLocal(startDateEl.value);
  const today = startOfDayLocal(new Date());

  if (startDate > today) {
    resultsEl.hidden = true;
    return;
  }

  const result = calculateMilestones(currentCount, startDate, today);

  renderMilestones(
    result.milestoneDates,
    result.endOfYearProjection,
    result.averagePerWeek
  );
}

currentCountEl.addEventListener("input", calculateAndRender);
startDateEl.addEventListener("input", calculateAndRender);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateAndRender();
});

form.addEventListener("reset", () => {
  resultsEl.hidden = true;
  initStartDatePickerAndBounds();
});

initStartDatePickerAndBounds();
