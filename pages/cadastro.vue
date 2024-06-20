<!-- tela de cadastro -->
<template>
    <div class="flex items-center justify-center h-screen w-screen">
        <div class="bg-gray-300 p-3 rounded-lg shadow-md m-6">
            <h2 class="text-xl font-semibold mb-4">Cadastro</h2>
            <form>
                <div class="mb-4">
                    <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text">
                </div>
                <div class="mb-4">
                    <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="text">
                </div>
                <div class="mb-4">
                    <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password">
                </div>
                <div class="mb-4">
                    <label for="confirmsenha" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                    <input type="password">
                </div>
                <div class="mb-4">
                    <label for="plano" class="block text-sm font-medium text-gray-700">Plano</label>
                    <input type="text">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    const { data, pending, error, refresh } = await useFetch('()',{
        
    })
export default {
    setup () {
        

        return {}
    }
}
</script>