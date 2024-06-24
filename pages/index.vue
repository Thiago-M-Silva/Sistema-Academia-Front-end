<template>
     <div class="flex items-center primary-bg justify-center h-screen w-screen">
    <div class="bg-white flex rounded-lg shadow-md m-8 w-1/2 h-3/5 divide-x divide-gray-300">
      <!-- Parte da esquerda -->
      <div class="w-2/5 p-6">
        <h2 class="text-xl font-semibold mb-4">Login</h2>
        <form>
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <input type="text" id="username" name="username" class="mt-1 p-2 border rounded-md w-full primary-text">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input type="password" id="password" name="password" class="mt-1 p-2 border rounded-md w-full primary-text">
          </div>
          <button type="submit" class="primary-bg text-white px-4 py-2 rounded-md hover:bg-blue-600">Entrar</button>
        </form>
      </div>
      <!-- Parte da direita -->
      <div class="w-3/5 teste">
        <div id="login-illustration" style="border-radius: 0px 8px 8px 0px;" class="w-full h-full">

        </div>
      </div>
    </div>
  </div>
  </template>


<style>
  .primary-bg {
           background-color: #222366;
       }


       .primary-text {
           color: #222366;
       }


       .secondary-bg {
           background-color: #6b6c8c; /* Cor secundária */
       }


       .secondary-text {
           color: #6b6c8c; /* Cor do texto secundário */
       }


       .tint-1-bg {
           background-color: #484973; /* Tons mais claros para background */
       }


       .tint-1-text {
           color: #484973; /* Tons mais claros para texto */
       }


       .tint-2-bg {
           background-color: #151632; /* Tons mais escuros para background */
       }


       .tint-2-text {
           color: #151632; /* Tons mais escuros para texto */
       }


       #login-illustration {
           background-image: url("https://r4.wallpaperflare.com/wallpaper/199/924/33/muscle-muscle-bodybuilding-press-wallpaper-5e83ab4709bbfda7c62378900524157e.jpg");
           background-size: cover;
           background-position: center;
           height: 100%;
           width: 100%;
           border-radius: 0px 8px 8px 0px;
       }
       
</style>
  
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
  