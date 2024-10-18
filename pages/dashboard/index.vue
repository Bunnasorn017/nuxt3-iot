<template>
  <div class="grid gap-8 h-screen w-full">
    <header class="">
      <div class="grow">
        <h1>Dashboard</h1>
        <p>All information hydroponic management</p>
      </div>
      <div class="w-full h-[75%] bg-neutral-100">
        dftherh
      </div>
    </header>

    <main>
      <div class="">Tempurature in your location</div>
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