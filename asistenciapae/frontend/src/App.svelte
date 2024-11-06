<script>
    import Router from 'svelte-spa-router';
    import Login from './routes/Login.svelte';
    import Main from './routes/Main.svelte';

    const routes = {
        '/': Login,  // La página de inicio será el login
        '/login': Login,
        '/main': Main,
    };
</script>

<Router {routes} />
