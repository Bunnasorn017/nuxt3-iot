<script setup>
import { Icon } from "@iconify/vue";
const open = ref(true);
</script>

<template>
  <div>
    <div
      class="flex lg:hidden z-50 items-center justify-between w-full h-full p-4"
    >
      <Logo />
      <Icon
        class="z-50 cursor-pointer left-2 top-2"
        size="30"
        icon="tabler:menu-2"
        @click="open = true"
      />
      <div
        v-if="open"
        class="fixed bg-white top-0 left-0 z-[999] w-full h-full h-screen"
      >
      <Icon
        class="absolute z-50 cursor-pointer right-4 top-8"
        size="30"
        icon="material-symbols:close"
        color="black"
        @click="open = false"
      />
        <SidebarMenu />
      </div>
    </div>
    <div
      class="hidden lg:flex w-[250px] h-screen flex flex-col justify-between border-r"
    >
      <SidebarMenu />
      <div class="">use item</div>
    </div>
  </div>
</template>