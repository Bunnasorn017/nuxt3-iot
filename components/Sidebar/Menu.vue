<script setup>
import { Icon } from '@iconify/vue';
const items = ref([
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "ri:dashboard-fill"
  },
  {
    title: "Graphs",
    path: "/graphs",
    icon: "ri:bar-chart-fill"
  },
]);
</script>

<template>
  <div class="">
    <header
      class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer"
    >
      <Logo />
      <p class="font-bold text-black">IOT Management</p>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-2">
        <NuxtLink :href="item.path" v-for='(item, index) in items' :key='index' class="flex items-center gap-2 px-2 py-2 transition rounded cursor-pointer hover:bg-neutral-100">
          <Icon :icon="item.icon" size="30" color="black" />
          <span>{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

