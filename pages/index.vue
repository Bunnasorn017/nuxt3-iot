<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
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

async function login() {
  try {
    const { token } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });
    localStorage.setItem('token', token);
    Swal.fire({
      icon: 'success',
      title: 'Login Success',
      text: 'เข้าสู่ระบบสำเร็จ',
    });
    navigateTo('/dashboard');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Email หรือ Password ไม่ถูกต้อง',
    });
  }
}
</script>