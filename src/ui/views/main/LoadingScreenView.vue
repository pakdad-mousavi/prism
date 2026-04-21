<script setup lang="ts">
import { motion } from 'motion-v';
import { useRouter } from 'vue-router';

const router = useRouter();

const changePage = () => {
  window.setTimeout(() => {
    router.push('/dashboard/command-center');
    window.electronApi.showTrafficLights();
  }, 1000);
};

const shape = {
  strokeLinecap: 'round',
  fill: 'transparent',
};
</script>

<template>
  <div class="outline-none flex items-center justify-center w-full h-svh bg-radial from-black to-[#3D0C12]">
    <div class="outline-none absolute top-0 w-full h-16 lg:h-20">
      <div class="outline-none absolute top-0 left-0 flex w-full px-10 py-6">
        <div class="outline-none w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="outline-none overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="4"
              fill="transparent"
              :transition="{ duration: 2, delay: 0.5, ease: 'easeInOut' }"
              :initial="{ pathLength: 1, pathOffset: 0 }"
              :animate="{ pathOffset: [1, -0.8] }"
              :style="shape"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="outline-none w-1/2">
          <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" class="outline-none overflow-visible">
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="4"
              fill="transparent"
              :transition="{ duration: 2, delay: 0.5, ease: 'easeInOut' }"
              :initial="{ pathLength: 1, pathOffset: 0 }"
              :animate="{ pathOffset: [1, -0.8] }"
              :style="shape"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <div class="outline-none absolute top-0 left-0 flex w-full px-10 py-6">
        <div class="outline-none w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="outline-none overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :style="shape"
              :transition="{ duration: 1 }"
              :initial="{ pathLength: 1, opacity: 0 }"
              :animate="{ pathOffset: [1, -4], opacity: 0.5 }"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="outline-none w-1/2">
          <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" class="outline-none overflow-visible">
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :style="shape"
              :transition="{ duration: 1 }"
              :initial="{ pathLength: 1, opacity: 0 }"
              :animate="{ pathOffset: [1, -4], opacity: 0.5 }"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <div class="outline-none absolute top-[15%] left-0 flex w-full py-6 px-10">
        <div class="outline-none w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="outline-none overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :transition="{ duration: 3, delay: 1, strokeWidth: { duration: 1, delay: 3.5 } }"
              :initial="{ pathLength: 0, strokeWidth: 2 }"
              :animate="{ pathLength: 0.5, strokeWidth: 4 }"
              :style="shape"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="outline-none w-1/2">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="outline-none overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :transition="{ duration: 3, delay: 1, strokeWidth: { duration: 1, delay: 3.5 } }"
              :initial="{ pathLength: 0, strokeWidth: 2 }"
              :animate="{ pathLength: 0.5, strokeWidth: 4 }"
              :style="shape"
              class="outline-none reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <motion.svg
        viewBox="0 0 524 28"
        preserveAspectRatio="xMidYMid meet"
        :style="{ width: '40%', height: 'auto' }"
        class="outline-none absolute pb-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <motion.path
          d="M0 14H524"
          stroke="#F7374F"
          stroke-width="1"
          :transition="{ duration: 2, delay: 1 }"
          :initial="{ pathLength: 0, pathOffset: 0.5 }"
          :animate="{ pathLength: 1, pathOffset: 0 }"
          fill="transparent"
          class="outline-none drop-shadow-sm drop-shadow-primary"
        />
        <motion.path
          d="M262 28L262 0"
          stroke="#F7374F"
          stroke-width="1"
          :transition="{ duration: 2, delay: 1 }"
          :initial="{ pathLength: 0, pathOffset: 0.5 }"
          :animate="{ pathLength: 1, pathOffset: 0 }"
          fill="transparent"
          class="outline-none drop-shadow-sm drop-shadow-primary"
        />
      </motion.svg>
    </div>

    <div class="outline-none absolute bottom-0 left-0 flex w-full px-10 py-6">
      <div class="outline-none w-1/2">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="outline-none overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="4"
            fill="transparent"
            :transition="{ duration: 2, delay: 1, opacity: { duration: 0, delay: 1 } }"
            :initial="{ pathLength: 0, pathOffset: 0, opacity: 0 }"
            :animate="{ pathLength: 1, pathOffset: -1.8, opacity: 1 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
      <div class="outline-none w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="outline-none overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="4"
            fill="transparent"
            :transition="{ duration: 2, delay: 1, opacity: { duration: 0, delay: 1 } }"
            :initial="{ pathLength: 0, pathOffset: 0, opacity: 0 }"
            :animate="{ pathLength: 1, pathOffset: -1.8, opacity: 1 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
    </div>

    <div class="outline-none absolute bottom-0 left-0 flex w-full px-10 py-6">
      <div class="outline-none w-1/2">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="outline-none overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 2 }"
            :initial="{ pathLength: 0, pathOffset: -1, opacity: 0.5 }"
            :animate="{ pathLength: 1, pathOffset: 2 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
      <div class="outline-none w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="outline-none overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 2 }"
            :initial="{ pathLength: 0, pathOffset: -1, opacity: 0.5 }"
            :animate="{ pathLength: 1, pathOffset: 2 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
    </div>

    <div class="outline-none absolute left-0 flex w-full px-20 py-6 bottom-[2%]">
      <div class="outline-none w-1/2">
        <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" :style="{ width: '100%', height: 'auto' }">
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 1.5, delay: 2.5, opacity: { duration: 0, delay: 2.5 } }"
            :initial="{ pathLength: 0, opacity: 0 }"
            :animate="{ pathLength: 0.2, opacity: 1 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
      <div class="outline-none w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="outline-none overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 1.5, delay: 2.5, opacity: { duration: 0, delay: 2.5 } }"
            :initial="{ pathLength: 0, opacity: 0 }"
            :animate="{ pathLength: 0.2, opacity: 1 }"
            :style="shape"
            class="outline-none drop-shadow-xl drop-shadow-primary"
          />
        </motion.svg>
      </div>
    </div>

    <div class="outline-none w-44 h-44">
      <motion.svg
        viewBox="0 0 122 122"
        xmlns="http://www.w3.org/2000/svg"
        :initial="{ filter: 'blur(0px)' }"
        :animate="{ filter: 'blur(15px)' }"
        :transition="{ filter: { delay: 5.5 } }"
        class="outline-none"
      >
        <g clip-path="url(#clip0_701_23)">
          <g filter="url(#filter0_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M73 48H49V50H57L60 53V68H62V53L65 50H73V48Z"
            />
          </g>
          <g filter="url(#filter1_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M39.8715 81.5698L51.4185 101.57L61.7155 101.57L61.7155 108.735L47.2818 108.735L29.2872 77.5674L33.0414 75.3999L36.6036 81.5698L39.8715 81.5698Z"
            />
          </g>
          <g filter="url(#filter2_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M83.5523 81.5722L72.0053 101.572L61.7083 101.572L61.7083 108.737L76.1421 108.737L94.1366 77.5698L90.3824 75.4023L86.8203 81.5722L83.5523 81.5722Z"
            />
          </g>
          <g filter="url(#filter3_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M96.4038 58.7461L107.951 38.7461L102.802 29.8286L109.007 26.2461L116.224 38.7461L98.2298 69.9136L94.4756 67.7461L98.0378 61.5762L96.4038 58.7461Z"
            />
          </g>
          <g filter="url(#filter4_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M74.5653 20.9161L97.6594 20.9161L102.808 29.8335L109.013 26.251L101.796 13.751L65.807 13.751L65.807 18.0859L72.9314 18.0859L74.5653 20.9161Z"
            />
          </g>
          <g filter="url(#filter5_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M26.8569 58.7466L15.3099 38.7466L20.4585 29.8291L14.2533 26.2466L7.03645 38.7466L25.031 69.9141L28.7852 67.7466L25.223 61.5767L26.8569 58.7466Z"
            />
          </g>
          <g filter="url(#filter6_d_701_23)">
            <motion.path
              :initial="{ pathLength: 0, fillOpacity: 0, pathOffset: 0 }"
              :animate="{ pathLength: 1, fillOpacity: 1, pathOffset: 0 }"
              :transition="{ duration: 4, fillOpacity: { duration: 1.4, delay: 4.1 } }"
              class="outline-none stroke-primary fill-primary"
              d="M48.6954 20.9166L25.6014 20.9166L20.4529 29.834L14.2478 26.2515L21.4646 13.7515L57.4537 13.7515L57.4537 18.0864L50.3294 18.0864L48.6954 20.9166Z"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_701_23"
            x="39"
            y="38"
            width="44"
            height="40"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter1_d_701_23"
            x="19.2871"
            y="65.3999"
            width="52.4287"
            height="53.335"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter2_d_701_23"
            x="51.708"
            y="65.4023"
            width="52.4287"
            height="53.335"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter3_d_701_23"
            x="84.4756"
            y="16.2461"
            width="41.749"
            height="63.6675"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter4_d_701_23"
            x="55.8066"
            y="3.75098"
            width="63.2061"
            height="36.0825"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter5_d_701_23"
            x="-2.96387"
            y="16.2466"
            width="41.749"
            height="63.6675"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <filter
            id="filter6_d_701_23"
            x="4.24805"
            y="3.75146"
            width="63.2061"
            height="36.0825"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.215686 0 0 0 0 0.309804 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_23" result="shape" />
          </filter>
          <clipPath id="clip0_701_23">
            <rect width="122" height="122" fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </div>

    <motion.p
      class="uppercase outline-none absolute text-4xl text-center -translate-x-1/2 top-1/2 left-1/2 font-tomorrow text-primary -translate-y-1/2"
      :transition="{ duration: 1, delay: 5.8 }"
      :initial="{ opacity: 0, y: 35 }"
      :animate="{ opacity: 1, y: -15 }"
    >
      Prism
    </motion.p>
    <motion.p
      class="uppercase outline-none absolute text-xl text-center -translate-x-1/2 top-1/2 left-1/2 font-tomorrow text-primary -translate-y-1/2"
      @animation-complete="changePage()"
      :transition="{ duration: 1, delay: 6 }"
      :initial="{ opacity: 0, y: 85 }"
      :animate="{ opacity: 1, y: 25 }"
    >
      Focus, Refracted.
    </motion.p>
  </div>
</template>
