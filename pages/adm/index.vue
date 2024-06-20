<!-- tela de login -->

<template>
    <div class="flex items-center justify-center h-screen w-screen">
        <div class="bg-gray-300 p-6 rounded-lg shadow-md m-8">
            <h2 class="text-xl font-semibold mb-4">Login</h2>
            <form>
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Nome de usuário</label>
                    <input type="text" id="username" name="username" class="mt-1 p-2 border rounded-md w-full">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password" id="password" name="password" class="mt-1 p-2 border rounded-md w-full">
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Entrar</button>
            </form>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        setup () {
            
    
            return {}
        }
    }
    </script>