<script setup lang="ts">
import { animate } from 'motion-v';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  x: number;
  y: number;
  visible: boolean;
  loadDelay: number;
}>();

const bar = ref<HTMLElement | null>(null);

onMounted(() => {
  console.log(props.visible);
  if (!bar.value || !props.visible) return;

  animate([[bar.value, { x: [-20, 0], opacity: [0, 1] }, { delay: props.loadDelay }]]);
});

watch(
  () => props.visible,
  (newVisibility) => {
    if (newVisibility) {
      animate([[bar.value, { x: [-20, 0], opacity: [0, 1] }]]);
    } else {
      animate([[bar.value, { opacity: [1, 0] }]]);
    }
  },
);
</script>

<template>
  <rect :x="x" :y="y" width="21" height="77" class="stroke-primary fill-primary/10" ref="bar" />
</template>
