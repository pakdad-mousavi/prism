<script lang="ts" setup>
import { animate, motion, type AnimationSequence } from 'motion-v';
import { computed, onMounted, ref, watch } from 'vue';

import { useFocusRunStore } from '../../stores/focusRuns';
import FocusBar from './FocusBar.vue';
import ProgressCell from './ProgressCell.vue';

const props = defineProps<{
  useInitialAnimation: () => Promise<boolean>;
}>();

// ----------
// ANIMATIONS
// ----------
const outerPathPrimary = ref<HTMLElement | null>(null);
const outerPathCircleTopPrimary = ref<HTMLElement | null>(null);
const outerPathCircleBottomPrimary = ref<HTMLElement | null>(null);

const topPathPrimary = ref<HTMLElement | null>(null);
const topPathCircleTopPrimary = ref<HTMLElement | null>(null);
const topPathCircleBottomPrimary = ref<HTMLElement | null>(null);

const topDetailsPrimary = ref<HTMLElement | null>(null);
const bottomDetailsPrimary = ref<HTMLElement | null>(null);
const edgeOfDetailsPrimary = ref<HTMLElement | null>(null);
const connectorDetailsPrimary = ref<HTMLElement | null>(null);

const outerPathSecondary = ref<HTMLElement | null>(null);
const outerPathCircleTopSecondary = ref<HTMLElement | null>(null);
const outerPathCircleBottomSecondary = ref<HTMLElement | null>(null);

const topPathSecondary = ref<HTMLElement | null>(null);
const topPathCircleTopSecondary = ref<HTMLElement | null>(null);
const topPathCircleBottomSecondary = ref<HTMLElement | null>(null);

const topDetailsSecondary = ref<HTMLElement | null>(null);
const bottomDetailsSecondary = ref<HTMLElement | null>(null);
const edgeOfDetailsSecondary = ref<HTMLElement | null>(null);
const connectorDetailsSecondary = ref<HTMLElement | null>(null);

const progressBars = ref<HTMLElement | null>(null);

const titleText = ref<HTMLElement | null>(null);

onMounted(async () => {
  // Should do initial animation or not
  const shouldAnimate = await props.useInitialAnimation();

  // HANDLE TEXT ANIMATION
  if (titleText.value) {
    animate([
      [titleText.value, { opacity: [0, 1, 0, 1, 0, 1, 0, 1], y: [10, 0] }, { duration: 0.5, delay: shouldAnimate ? 2 : 0 }],
    ]);
  }

  if (
    !shouldAnimate ||
    !outerPathPrimary.value ||
    !outerPathCircleTopPrimary.value ||
    !outerPathCircleBottomPrimary.value ||
    !topPathPrimary.value ||
    !topPathCircleTopPrimary.value ||
    !topPathCircleBottomPrimary.value ||
    !bottomDetailsPrimary.value ||
    !topDetailsPrimary.value ||
    !edgeOfDetailsPrimary.value ||
    !connectorDetailsPrimary.value ||
    !outerPathSecondary.value ||
    !outerPathCircleTopSecondary.value ||
    !outerPathCircleBottomSecondary.value ||
    !topPathSecondary.value ||
    !topPathCircleTopSecondary.value ||
    !topPathCircleBottomSecondary.value ||
    !bottomDetailsSecondary.value ||
    !topDetailsSecondary.value ||
    !edgeOfDetailsSecondary.value ||
    !connectorDetailsSecondary.value ||
    !progressBars.value
  ) {
    return;
  }

  // HANDLE MAIN ANIMATIONS
  const primaryAnimationSequence: AnimationSequence = [
    [outerPathPrimary.value, { pathLength: [0, 1], pathOffset: [0.3, 0] }, { duration: 2 }],
    [outerPathCircleTopPrimary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [outerPathCircleBottomPrimary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [topPathPrimary.value, { pathLength: [0, 1], pathOffset: [0.3, 0] }, { duration: 2, at: 1 }],
    [topPathCircleTopPrimary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [topPathCircleBottomPrimary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
  ];

  const tertiaryAnimationSequence: AnimationSequence = [];

  // HANDLE TOP DETAILS
  for (const [index, detail] of Array.from(topDetailsPrimary.value.children).entries()) {
    primaryAnimationSequence.push([detail, { opacity: [0, 1] }, { delay: 0.04 * index, at: 1.5 }]);
  }

  // HANDLE BOTTOM DETAILS
  for (const [index, detail] of Array.from(bottomDetailsPrimary.value.children).entries()) {
    primaryAnimationSequence.push([detail, { opacity: [0, 1] }, { delay: 0.04 * index, at: 0 }]);
  }

  // HANDLE EDGE DETAILS
  for (const edge of edgeOfDetailsPrimary.value.children) {
    primaryAnimationSequence.push([edge, { pathLength: [0, 1], pathOffset: [0.5, 0] }, { duration: 2, at: 0 }]);
  }

  // HANDLE CONNECTOR DETAILS
  for (const detail of connectorDetailsPrimary.value.children) {
    primaryAnimationSequence.push([detail, { pathLength: [0, 1], pathOffset: [0.5, 0] }, { duration: 2, at: 1 }]);
  }

  // HANDLE MAIN ANIMATIONS
  const secondaryAnimationSequence: AnimationSequence = [
    [outerPathSecondary.value, { pathLength: [0, 1], pathOffset: [0.3, 0] }, { duration: 2 }],
    [outerPathCircleTopSecondary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [outerPathCircleBottomSecondary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [topPathSecondary.value, { pathLength: [0, 1], pathOffset: [0.3, 0] }, { duration: 2, at: 1 }],
    [topPathCircleTopSecondary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
    [topPathCircleBottomSecondary.value, { opacity: [0, 1] }, { duration: 0.3, at: 1.5 }],
  ];

  // HANDLE TOP DETAILS
  for (const [index, detail] of Array.from(topDetailsSecondary.value.children).entries()) {
    secondaryAnimationSequence.push([detail, { opacity: [0, 1] }, { delay: 0.04 * index, at: 1.5 }]);
  }

  // HANDLE BOTTOM DETAILS
  for (const [index, detail] of Array.from(bottomDetailsSecondary.value.children).entries()) {
    secondaryAnimationSequence.push([detail, { opacity: [0, 1] }, { delay: 0.04 * index, at: 0 }]);
  }

  // HANDLE EDGE DETAILS
  for (const edge of edgeOfDetailsSecondary.value.children) {
    secondaryAnimationSequence.push([edge, { pathLength: [0, 1], pathOffset: [0.5, 0] }, { duration: 2, at: 0 }]);
  }

  // HANDLE CONNECTOR DETAILS
  for (const detail of connectorDetailsSecondary.value.children) {
    secondaryAnimationSequence.push([detail, { pathLength: [0, 1], pathOffset: [0.5, 0] }, { duration: 2, at: 1 }]);
  }

  animate(primaryAnimationSequence);
  animate(secondaryAnimationSequence);
  await animate(tertiaryAnimationSequence);
});

// ------------------
// FOCUS RUN PROGRESS
// ------------------
const focusRunStore = useFocusRunStore();

const formattedProgress = computed(() => {
  const percentageFormatter = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const normalizedPercentage = focusRunStore.progress * 100;
  return percentageFormatter.format(normalizedPercentage);
});

type BarVisibility = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
const barVisibility = ref([true, true, true, true, true, true, true, true, true, true, true, true] as BarVisibility);

const updateBarVisibilities = () => {
  if (!progressBars.value) return;
  for (let i = 0; i < progressBars.value.children.length; i++) {
    // Map range of 0-1 to 1-12
    const mappedProgress = focusRunStore.progress * (barVisibility.value.length - 1) + 1;

    if (i + 1 <= mappedProgress && !barVisibility.value[i]) {
      const bar = progressBars.value.children[i];
      animate([[bar, { x: [-10, 0], opacity: [0, 1] }]]);

      barVisibility.value[i] = true;
    }
  }

  if (barVisibility.value.every((v) => v === true)) {
    barVisibility.value = new Array<boolean>(12).fill(false) as BarVisibility;
  }

  if (!focusRunStore.status) {
    barVisibility.value = new Array<boolean>(12).fill(true) as BarVisibility;
  }
};

watch([() => focusRunStore.progress, focusRunStore.status], () => {
  updateBarVisibilities();
});
</script>

<template>
  <div class="flex mx-auto relative items-end">
    <!-- ------------ -->
    <!-- LEFT PARTIAL -->
    <!-- ------------ -->
    <svg viewBox="0 0 511 238" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-auto max-w-100 xxl:max-w-120">
      <path
        ref="outerPathPrimary"
        d="M302.025 140H291.025C282.225 140 278.025 136.755 277.025 135.133L221.025 77C209.825 63.3734 197.692 59.9889 193.026 60C135.887 60 68.3565 60 50.0257 60C46.8257 60 44.0257 61.5556 43.0257 62.3334L5.02571 91.8889C1.42571 94.6 0.85904 97.7593 1.02571 99L1.02539 186C0.906251 187.574 1.53945 191.4 5.02539 194.111L42.0254 222.889C43.0254 223.926 46.2254 226 51.0254 226H432.525"
        class="stroke-primary"
        stroke-opacity="1"
        stroke-width="2"
      ></path>
      <g filter="url(#filter0_d_628_1330)">
        <circle ref="outerPathCircleTopPrimary" cx="432.025" cy="226" r="2" fill="#F7374F"></circle>
      </g>
      <g filter="url(#filter1_d_628_1330)">
        <circle ref="outerPathCircleBottomPrimary" cx="302.025" cy="140" r="2" fill="#F7374F"></circle>
      </g>

      <g ref="edgeOfDetailsPrimary">
        <path d="M103.025 210V215H108.025" class="stroke-primary" />
        <path d="M307.025 210V215H302.025" class="stroke-primary" />
        <path d="M265.025 38V33H270.025" class="stroke-primary" />
        <path d="M469.025 38V33H464.025" class="stroke-primary" />
      </g>

      <g ref="bottomDetailsPrimary">
        <path d="M135.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M153.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M171.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M187.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M205.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M223.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M241.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M257.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M361.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M404.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M275.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M379.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M422.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M143.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M161.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M178.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M196.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M213.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M231.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M248.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M266.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M370.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M413.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
      </g>
      <g ref="topDetailsPrimary">
        <path d="M297.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M315.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M333.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M349.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M367.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M385.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M403.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M419.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M437.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M305.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M323.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M340.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M358.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M375.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M393.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M410.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M428.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
      </g>

      <g filter="url(#filter2_d_628_1330)">
        <circle cx="481.025" cy="23" r="2" fill="#F7374F" ref="topPathCircleTopPrimary" />
      </g>
      <g filter="url(#filter3_d_628_1330)">
        <circle cx="302.025" cy="131" r="2" fill="#F7374F" ref="topPathCircleBottomPrimary" />
      </g>
      <g filter="url(#filter4_d_628_1330)">
        <path
          d="M301.792 131H294.792C285.992 131 281.792 127.755 280.792 126.133L222.792 65.6699C221.459 64.2799 219.592 60.7 222.792 57.5L253.793 26.5C254.96 25.3333 258.193 23 261.793 23H480.292"
          ref="topPathPrimary"
          class="stroke-primary"
          stroke-opacity="0.3"
          stroke-width="2"
          shape-rendering="crispEdges"
        />
      </g>
      <g ref="connectorDetailsPrimary">
        <path d="M319.025 104L304.025 104L304.025 183L319.025 183" class="stroke-primary" />
        <line x1="323.025" y1="104.5" x2="403.025" y2="104.5" class="stroke-primary" stroke-opacity="0.2" />
        <line x1="323.025" y1="183" x2="403.025" y2="183" class="stroke-primary" stroke-opacity="0.2" />
        <rect x="313.525" y="129.5" width="12" height="12" class="stroke-primary" stroke-opacity="0.5" />
      </g>

      <defs>
        <filter
          id="filter0_d_628_1330"
          x="420.025"
          y="214"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter1_d_628_1330"
          x="290.025"
          y="128"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter2_d_628_1330"
          x="469.025"
          y="11"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter3_d_628_1330"
          x="290.025"
          y="119"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter4_d_628_1330"
          x="190.025"
          y="0"
          width="320.268"
          height="170"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
      </defs>
    </svg>

    <!-- ------------ -->
    <!-- RIGHT PARTIAL -->
    <!-- ------------ -->
    <svg viewBox="0 0 511 238" fill="none" xmlns="http://www.w3.org/2000/svg" class="-scale-x-100 max-w-100 xxl:max-w-120">
      <path
        ref="outerPathSecondary"
        d="M302.025 140H291.025C282.225 140 278.025 136.755 277.025 135.133L221.025 77C209.825 63.3734 197.692 59.9889 193.026 60C135.887 60 68.3565 60 50.0257 60C46.8257 60 44.0257 61.5556 43.0257 62.3334L5.02571 91.8889C1.42571 94.6 0.85904 97.7593 1.02571 99L1.02539 186C0.906251 187.574 1.53945 191.4 5.02539 194.111L42.0254 222.889C43.0254 223.926 46.2254 226 51.0254 226H432.525"
        class="stroke-primary"
        stroke-opacity="1"
        stroke-width="2"
      ></path>
      <g filter="url(#filter0_d_628_1330)">
        <circle ref="outerPathCircleTopSecondary" cx="432.025" cy="226" r="2" fill="#F7374F"></circle>
      </g>
      <g filter="url(#filter1_d_628_1330)">
        <circle ref="outerPathCircleBottomSecondary" cx="302.025" cy="140" r="2" fill="#F7374F"></circle>
      </g>

      <g ref="edgeOfDetailsSecondary">
        <path d="M103.025 210V215H108.025" class="stroke-primary" />
        <path d="M307.025 210V215H302.025" class="stroke-primary" />
        <path d="M265.025 38V33H270.025" class="stroke-primary" />
        <path d="M469.025 38V33H464.025" class="stroke-primary" />
      </g>

      <g ref="bottomDetailsSecondary">
        <path d="M135.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M153.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M171.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M187.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M205.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M223.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M241.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M257.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M361.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M404.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M275.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M379.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M422.025 213V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M143.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M161.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M178.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M196.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M213.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M231.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M248.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M266.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M370.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M413.025 212V215" class="stroke-primary" stroke-opacity="0.5" />
      </g>
      <g ref="topDetailsSecondary">
        <path d="M297.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M315.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M333.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M349.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M367.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M385.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M403.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M419.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M437.025 35V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M305.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M323.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M340.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M358.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M375.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M393.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M410.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
        <path d="M428.025 36V33" class="stroke-primary" stroke-opacity="0.5" />
      </g>

      <g filter="url(#filter2_d_628_1330)">
        <circle cx="481.025" cy="23" r="2" fill="#F7374F" ref="topPathCircleTopSecondary" />
      </g>
      <g filter="url(#filter3_d_628_1330)">
        <circle cx="302.025" cy="131" r="2" fill="#F7374F" ref="topPathCircleBottomSecondary" />
      </g>
      <g filter="url(#filter4_d_628_1330)">
        <path
          d="M301.792 131H294.792C285.992 131 281.792 127.755 280.792 126.133L222.792 65.6699C221.459 64.2799 219.592 60.7 222.792 57.5L253.793 26.5C254.96 25.3333 258.193 23 261.793 23H480.292"
          ref="topPathSecondary"
          class="stroke-primary"
          stroke-opacity="0.3"
          stroke-width="2"
          shape-rendering="crispEdges"
        />
      </g>
      <g ref="connectorDetailsSecondary">
        <path d="M319.025 104L304.025 104L304.025 183L319.025 183" class="stroke-primary" />
        <line x1="323.025" y1="104.5" x2="403.025" y2="104.5" class="stroke-primary" stroke-opacity="0.2" />
        <line x1="323.025" y1="183" x2="403.025" y2="183" class="stroke-primary" stroke-opacity="0.2" />
        <rect x="313.525" y="129.5" width="12" height="12" class="stroke-primary" stroke-opacity="0.5" />
      </g>

      <defs>
        <filter
          id="filter0_d_628_1330"
          x="420.025"
          y="214"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter1_d_628_1330"
          x="290.025"
          y="128"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter2_d_628_1330"
          x="469.025"
          y="11"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter3_d_628_1330"
          x="290.025"
          y="119"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
        <filter
          id="filter4_d_628_1330"
          x="190.025"
          y="0"
          width="320.268"
          height="170"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_628_1330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_628_1330" result="shape" />
        </filter>
      </defs>
    </svg>

    <div class="absolute inset-x-0 bottom-0 flex flex-col items-center">
      <div class="flex flex-col items-center">
        <!-- ---------- -->
        <!-- TITLE TEXT -->
        <!-- ---------- -->
        <div class="text-xl xxl:text-2xl mb-4">
          <h3 class="font-tomorrow uppercase text-primary" ref="titleText">Focus Run Progress</h3>
        </div>

        <!-- ------------- -->
        <!-- PROGRESS BARS -->
        <!-- ------------- -->
        <div class="h-1/3 max-w-70 mb-8">
          <svg viewBox="0 0 374 78" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" ref="progressBars">
            <ProgressCell
              :x="0.5 + 32 * index"
              :y="0.5"
              :visible="visibility"
              :loadDelay="0.06 * index"
              v-for="(visibility, index) in barVisibility"
            ></ProgressCell>
          </svg>
        </div>

        <!-- ----------- -->
        <!-- BOTTOM LINE -->
        <!-- ----------- -->
        <div class="h-0.5 w-30 flex gap-2 justify-center mb-3">
          <motion.div
            class="w-2 h-full bg-primary rounded-xl"
            :initial="{ width: 0 }"
            :animate="{ width: 8 }"
            :transition="{ duration: 2 }"
          ></motion.div>
          <motion.div
            class="w-20 h-full bg-primary rounded-xl"
            :initial="{ width: 0 }"
            :animate="{ width: 80 }"
            :transition="{ duration: 2 }"
          ></motion.div>
          <motion.div
            class="w-2 h-full bg-primary rounded-xl"
            :initial="{ width: 0 }"
            :animate="{ width: 8 }"
            :transition="{ duration: 2 }"
          ></motion.div>
        </div>
      </div>

      <!-- ------------------ -->
      <!-- FOCUS RUN PROGRESS -->
      <!-- ------------------ -->
      <div class="absolute top-1/2 -translate-y-1/2 left-1/20 flex items-end">
        <div class="w-32">
          <span class="font-tomorrow uppercase text-primary text-7xl">{{ formattedProgress }}</span>
        </div>
        <div>
          <span class="font-tomorrow uppercase text-primary">%</span>
        </div>
      </div>

      <!-- --------- -->
      <!-- FOCUS BAR -->
      <!-- --------- -->
      <div class="absolute top-1/2 xxl:top-[40%] -translate-y-1/2 right-4">
        <FocusBar class="w-40 xxl:w-46"></FocusBar>
      </div>
    </div>
  </div>
</template>
