<template>
    <div class="flex items-center justify-center h-screen w-screen">
      <div class="bg-gray-300 p-6 rounded-lg shadow-md m-8">
        <h2 class="text-xl font-semibold mb-4">Login</h2>
        <form @submit.prevent="signIn">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <input v-model="username" type="text" name="username" class="mt-1 p-2 border rounded-md w-full">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input v-model="password" type="password" name="password" class="mt-1 p-2 border rounded-md w-full">
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Entrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { useHttp } from '~~/composables/useHttp';
  
  interface LoginResponse {
    token: string;
    user: {
      id: number;
      name: string;
    };
  }
  
  export default {
    setup() {
      const username = ref<string>('');
      const password = ref<string>('');
      const { httpFetch } = useHttp();
  
      const signIn = async () => {
        try {
          const { data, error } = await httpFetch<LoginResponse>('http://localhost:8006/login', {
            method: 'POST',
            body: {
              username: username.value,
              password: password.value
            }
          });
  
          if (error.value) {
            console.error(error.value);
          } else {
            console.log(data.value);
          }
        } catch (error) {
          console.error(error); // Handle the error as needed
        }
      };
  
      return {
        username,
        password,
        signIn
      };
    }
  }
  </script>
  