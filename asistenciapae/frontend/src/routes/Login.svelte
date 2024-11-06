<script>
    import { API_URL } from '../config.js';
    import { writable } from "svelte/store";

    let usuario = "";
    let pass = "";
    let errorMessage = "";
    let token = writable(localStorage.getItem('token'));

    const login = async () => {
        errorMessage = "";
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, pass }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.token);
                token.set(result.token);
                // Redirigir a la página principal
                window.location.href = "/#/main";
            } else {
                errorMessage = result.message || "Usuario o contraseña incorrectos";
            }
        } catch (error) {
            errorMessage = "Error al conectarse al servidor web";
        }
    };
</script>

<style>
    .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin: 8px 0;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    .error {
        color: red;
        margin-top: 10px;
    }
</style>

<div class="login-container">
    <h2>Login</h2>
    <label for="usuario">Usuario</label>
    <input type="text" bind:value={usuario} placeholder="Tu usuario" id="usuario">

    <label for="pass">Contraseña</label>
    <input type="password" bind:value={pass} placeholder="Tu contraseña" id="pass">

    <button on:click={login}>Iniciar Sesión</button>

    {#if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}
</div>
