<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
const email = ref('')
const password = ref('')

definePageMeta({
  layout: "custome"
});

async function register() {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });
    Swal.fire({
      icon: 'success',
      title: 'Register Success',
      text: 'สมัครสมาชิกเสร็จสมบูรณ์',
    });
    navigateTo('/login')
  } catch (error) {
    console.error('Registration failed', error)
    Swal.fire({
      icon: 'error',
      title: 'Register Failed',
      text: 'สมัครสมาชิกไม่สมบูรณ์ เนื่องจาก Email ซ้ำกัน',
    });
  }
}
</script>