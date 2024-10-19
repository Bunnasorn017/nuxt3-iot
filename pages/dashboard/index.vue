<template>
  <div class="grid gap-8 h-screen w-full">
    <header class="">
      <div class="grow">
        <h1>Dashboard</h1>
        <p>All information hydroponic management</p>
      </div>
      <div class="w-full h-[400px] bg-neutral-200">
        dftherh
      </div>
    </header>

    <main class="grid gap-2">
      <div class="flex items-center gap-4">
        <div v-for='(item, index) in 4' :key=index class="w-full h-[260px] bg-neutral-200"></div>
      </div>
      <section>
        Chart
      </section>
    </main>

    <footer>
      copyright
    </footer>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "~/node_modules/nuxt/dist/pages/runtime/composables";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

function logout() {
  localStorage.removeItem("token");
  navigateTo("/");
}

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigateTo("/");
  }
});
</script>