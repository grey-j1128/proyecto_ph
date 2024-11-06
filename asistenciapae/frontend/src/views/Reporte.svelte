<!-- src/views/Reporte.svelte -->
<script>
    import { API_URL } from '../config.js';

    let changeReport= ""
    let datos = null
    let error = null

    async function mostrarInfo() {
        if (changeReport !== ""){
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/reportPAE`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                         'token': token ? `${token}` : ''
                     },                    
                    body: JSON.stringify({ "reporte": changeReport }),
                });
                if (response.ok) {
                    const result = await response.json();
                    mostrarResultado(result);
                } 
                datos = await response.json();
                error = null;
            }catch(e){
                error = e.message
                datos = null
                mostrarError()
            }
        }
    }

    function mostrarResultado(data) {
        // Crear un elemento <table> para mostrar los resultados
        const table = document.createElement('table');
        table.className = 'resultado';

        // Iterar sobre el resultado JSON y crear filas en la tabla
        for (const key in data) {
            if (Object.hasOwn(data, key)) {
                const row = document.createElement('tr');
                const th = document.createElement('th');
                const td = document.createElement('td');

                th.textContent = key;
                td.textContent = String(data[key]);

                row.appendChild(th);
                row.appendChild(td);
                table.appendChild(row);
            }
        }

        // Agregar la tabla a un elemento <div> del DOM
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.innerHTML = '';
        resultadoElement.appendChild(table);
    }

    function mostrarError() {
        const errorElement = document.getElementById('error');
        errorElement.textContent = error;
    }

    // Puedes definir aquí variables, funciones o estados locales si los necesitas.
    //let mensaje = "Estos son los reportes";
</script> 

<style>
    .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #333;
    }

    p {
        color: #555;
        font-size: 16px;
    }
</style>

<div class="container">
    <h2>Reportes de Asistencia PAE</h2>
    <p>-Estos son sus reportes-</p>
    <select bind:value={changeReport} on:change={mostrarInfo}>
        <option value="" selected>Elije el tipo de reporte</option>
        <option value="report1">Reporte 1</option>
        <option value="report2">Reporte 2</option>
        <option value="report3">Reporte 3</option>
    </select>
    <div id="resultado"></div>
    <p id="error" style="color: red;"></p>
</div>
<div class="container">

</div>
