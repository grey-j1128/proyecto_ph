<script>
    import Reporte from '../views/Reporte.svelte';
    import QrScanner from '../views/QrScanner.svelte';
    import Estudiantes from '../views/Estudiantes.svelte';

    let currentView = 'home';
  
    // Función para cambiar la vista
    function changeView(view) {
      currentView = view;
    }
  
    // Función para cerrar sesión
    const logout = () => {
      localStorage.removeItem("token");
      // Redirigir de nuevo al login
      window.location.href = "/#/login";
    };
  </script>
  
  <style>
    .main-container {
      max-width: 800px;
      margin: 50px auto;
      text-align: center;
    }
  
    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  
    button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  
    .logout-button {
      background-color: #ff4b5c;
    }
  
    .logout-button:hover {
      background-color: #ff1c3b;
    }
  </style>
  
  <div class="main-container">
    <h1>Bienvenido a Asistencia PAE</h1>
    <div class="nav-buttons">
      <button on:click={() => changeView('home')}>Inicio</button>
      <button on:click={() => changeView('Reporte')}>Ver reportes</button>
      <button on:click={() => changeView('qrScanner')}>Escanear QR</button>
      <button on:click={() => changeView('Estudiantes')}>Gestión Estudiantes</button>
      <button class="logout-button" on:click={logout}>Cerrar Sesión</button>
    </div>
    
    <!-- Carga de vistas dinámicas según la variable currentView -->
    {#if currentView === 'home'}
      <p>Esta es la página de inicio. Selecciona una opción del menú.</p>
    {:else if currentView === 'Reporte'}
      <Reporte />
    {:else if currentView === 'qrScanner'}
      <QrScanner />
    {:else if currentView === 'Estudiantes'}
    <Estudiantes/>
    {/if}
  </div>
  