<script setup lang="ts">
import { AnimatePresence, motion, motionValue, springValue } from 'motion-v';
import { onMounted, onUnmounted, ref } from 'vue';
import { useStreakStore } from '../../stores/streak';
import parseMilliseconds from 'parse-ms';

const pointerX = motionValue(0);
const x = springValue(pointerX, { damping: 40 });

const pointerY = motionValue(0);
const y = springValue(pointerY, { damping: 40 });

const heatmap = ref<HTMLElement | null>(null);
const activeDate = ref<{ date: Date; focusedMinutes: number }>({ date: new Date(), focusedMinutes: 0 });
const width = 240;
const height = 50;
const offset = 10; // USED TO AVOID HAVING TOOLTIP EXACTLY ON CURSOR
const visible = ref(false);

const streakStore = useStreakStore();

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekIndex = ref(0);
const months = ref<{ label: string; week: number }[]>([]);
const days = ref<
  {
    date: Date;
    week: number;
    focusedMinutes: number;
    runCount: number;
  }[]
>([]);

const updateTooltipPosition = (e: MouseEvent) => {
  if (!heatmap.value) return;
  const heatmapClientRect = heatmap.value.getBoundingClientRect();

  // If the mouse is anywhere inside of the heatmap
  if (
    e.clientX >= heatmapClientRect.left &&
    e.clientX <= heatmapClientRect.right &&
    e.clientY >= heatmapClientRect.top &&
    e.clientY <= heatmapClientRect.bottom
  ) {
    // Update x and y position of the tooltip
    const newX =
      width + e.clientX > heatmapClientRect.right
        ? e.clientX - heatmapClientRect.left - width - offset
        : e.clientX - heatmapClientRect.left + offset;
    const newY =
      height + e.clientY > heatmapClientRect.bottom
        ? e.clientY - heatmapClientRect.top - height - offset
        : e.clientY - heatmapClientRect.top + offset;

    pointerX.set(newX + 5);
    pointerY.set(newY + 5);

    // Make it visible
    visible.value = true;
  } else {
    // Hide tooltip if mouse is outside
    visible.value = false;
  }
};

onMounted(async () => {
  document.addEventListener('pointermove', updateTooltipPosition);

  const end = new Date();
  const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate());

  // Align to Sunday (like GitHub)
  const startDay = new Date(start);
  startDay.setDate(start.getDate() - end.getDay());
  const endDay = new Date(end);

  await streakStore.loadStreak(startDay, endDay);

  let current = new Date(startDay);

  while (current <= endDay) {
    const match = streakStore.streak.find(
      (d) =>
        d.day.getDate() === current.getDate() &&
        d.day.getMonth() === current.getMonth() &&
        d.day.getFullYear() === current.getFullYear(),
    );
    console.log(streakStore.currentStreakCount);
    console.log(streakStore.longestStreakCount);
    days.value.push({
      date: new Date(current),
      week: weekIndex.value,
      focusedMinutes: match ? match.focusedMinutes : 0,
      runCount: match ? match.runCount : 0,
    });

    if (current.getDay() === 6) weekIndex.value++;

    current.setDate(current.getDate() + 1);
  }

  let currentMonth = -1;
  let monthStartWeek = -1;
  let borrowedWeek = 0;

  for (const day of days.value) {
    const month = day.date.getMonth();

    if (currentMonth === -1) {
      currentMonth = month;
      monthStartWeek = day.week;
      continue;
    }

    if (month !== currentMonth) {
      const lastWeek = day.week - 1;
      const span = lastWeek - monthStartWeek + 1;

      if (span === 1) {
        // Too narrow — give this month an extra column and mark the debt
        months.value.push({ label: monthNames[currentMonth]!, week: 2 });
        borrowedWeek = 1;
      } else {
        // Repay debt from previous month if needed
        months.value.push({ label: monthNames[currentMonth]!, week: borrowedWeek ? span - 1 : span });
        borrowedWeek = 0;
      }

      currentMonth = month;
      monthStartWeek = day.week;
    }
  }

  // Final month
  if (currentMonth !== -1) {
    const lastWeek = days.value[days.value.length - 1]!.week;
    months.value.push({ label: monthNames[currentMonth]!, week: lastWeek - monthStartWeek + 1 });
  }

  // If we have 13 months (due to partial start), hide the last overflow month
  if (months.value.length === 13) {
    months.value[months.value.length - 1]!.week = 0;
  }
});

onUnmounted(() => document.addEventListener('pointermove', updateTooltipPosition));

const getColor = (value: number) => {
  if (value <= 0) return 'bg-surface-tertiary';
  else if (value <= 25) return 'bg-primary/20';
  else if (value <= 50) return 'bg-primary/50';
  else if (value <= 100) return 'bg-primary';
  else if (value <= 200) return 'bg-auxilary';
  else return 'bg-tertiary';
};

const getOrdinalIndicator = (value: number) => {
  const lastTwoDigits = value % 100;
  const lastDigit = value % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const getParsedTimeFromMins = (minutes: number) => {
  const parsed = parseMilliseconds(minutes * 60 * 1000);
  return `${parsed.hours}h ${parsed.minutes}m`;
};
</script>

<template>
  <div class="w-200">
    <!-- Month labels -->
    <div
      class="h-4 mb-0 grid ml-11 w-189.5 overflow-hidden text-2xs"
      :style="{ 'grid-template-columns': `repeat(${weekIndex}, minmax(0, 1fr)` }"
    >
      <span
        v-for="m in months"
        :key="m.label"
        :style="`grid-column: span ${m.week} / span ${m.week};`"
        :class="{ 'last:-translate-x-full': months.length - 14 <= 0 && months[months.length - 1]!.week * 2 <= 2 }"
      >
        {{ m.label }}
      </span>
    </div>

    <div class="w-200 flex gap-x-0.5 relative">
      <!-- Day labels -->
      <div class="grid grid-rows-7 grid-flow-col text-2xs text-right w-10">
        <span class="row-span-2">Sat</span>
        <span class="row-span-2">Mon</span>
        <span class="row-span-2">Wed</span>
        <span class="row-span-1">Fri</span>
      </div>

      <!-- Heatmap -->
      <div class="grid grid-rows-7 grid-flow-col w-200 place-items-center" ref="heatmap">
        <motion.div
          v-for="(d, i) in days"
          :key="i"
          :class="['size-3 mx-auto rounded-xs cut-corners relative group', getColor(d.focusedMinutes)]"
          :title="`${d.week}`"
          :initial="{ opacity: 0, x: 0 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: Math.random() * 0.5 }"
          @mouseenter="activeDate = { date: d.date, focusedMinutes: d.focusedMinutes }"
        ></motion.div>
      </div>
      <AnimatePresence>
        <motion.div
          v-if="visible && activeDate"
          class="absolute left-11 py-1.5 bg-surface-tertiary/50 text-xs font-tomorrow uppercase border border-primary backdrop-blur-lg rounded-md cut-corners px-4 text-center"
          :style="{ x, y, width: `${width}px` }"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
        >
          <div>
            <span class="font-bold">{{ getParsedTimeFromMins(activeDate.focusedMinutes) }}</span> focused on the
            {{ activeDate.date.getDate() }}{{ getOrdinalIndicator(activeDate.date.getDate()) }} of
            {{ monthNames[activeDate.date.getMonth()] }},
            {{ activeDate.date.getFullYear() }}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>
