export default defineNuxtRouteMiddleware(() =>{

    function getToken() {
        const cookies = useCookie('token')
        return cookies.value ? cookies.value : undefined;

    }
    
    
    const token = getToken();

    if(!token){

        return navigateTo('login')

    }
    

})