<script>
    import { onMount } from "svelte";
  
    let estudiantes = [];
    let estudiante = {
      TipoDoc_Estudiante: '',
      NumeroDoc_Estudiante: '',
      Nombre_completo: '',
      Fecha_nacimiento: '',
      Sexo: '',
      Curso_actual: '',
      FechaIngresoIUC: '',
      FechaEgresoIUC: '',
      FechaIngresoPAE: '',
      FechaEgresoPAE: '',
      id_Acudiente: ''
    };
  
    let editing = false;
    let selectedId = null;
    const token = localStorage.getItem('token');  // Obtener el token almacenado
  
    // Cargar todos los estudiantes al montar el componente
    onMount(() => {
      cargarEstudiantes();
    });
  
    async function cargarEstudiantes() {
      const response = await fetch("/Estudiantes", {
        headers: {
          "token": token ? `${token}` : '',  // Enviar el token solo si existe
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success)
        estudiantes = data.message
      else
        alert(message)
    }
  
    async function agregarEstudiante() {
      const url = editing ? `/Estudiante/${selectedId}` : "/api/Estudiante";
      const method = editing ? "PUT" : "POST";
      
      await fetch(url, {
        method: method,
        headers: {
          "token": token ? `${token}` : '',  // Enviar el token solo si existe
          "Content-Type": "application/json"
        },
        body: JSON.stringify(estudiante)
      });
      
      limpiarFormulario();
      cargarEstudiantes();
    }
  
    function editarEstudiante(estudianteSeleccionado) {
      estudiante = { ...estudianteSeleccionado };
      selectedId = estudianteSeleccionado.id_estudiante;
      editing = true;
    }
  
    async function borrarEstudiante(id) {
      await fetch(`/Estudiante/${id}`, {
        method: "DELETE",
        headers: {
          "token": token ? `${token}` : '',  // Enviar el token solo si existe
          "Content-Type": "application/json"
        }
      });
      cargarEstudiantes();
    }
  
    function limpiarFormulario() {
      estudiante = {
        TipoDoc_Estudiante: '',
        NumeroDoc_Estudiante: '',
        Nombre_completo: '',
        Fecha_nacimiento: '',
        Sexo: '',
        Curso_actual: '',
        FechaIngresoIUC: '',
        FechaEgresoIUC: '',
        FechaIngresoPAE: '',
        FechaEgresoPAE: '',
        id_Acudiente: ''
      };
      editing = false;
      selectedId = null;
    }
  </script>
  
  <style>
    .form-container {
      margin-bottom: 20px;
    }
  
    .form-container input {
      margin-bottom: 10px;
    }
  </style>
  
  <div class="form-container">
    <h2>{editing ? 'Editar' : 'Agregar'} Estudiante</h2>
    <form on:submit|preventDefault={agregarEstudiante}>
      <input type="text" placeholder="Tipo Doc" bind:value={estudiante.tipodoc_estudiante} required />
      <input type="text" placeholder="Número Doc" bind:value={estudiante.numerodoc_estudiante} required />
      <input type="text" placeholder="Nombre Completo" bind:value={estudiante.nombre_completo} required />
      <input type="date" placeholder="Fecha Nacimiento" bind:value={estudiante.fecha_nacimiento} required />
      <input type="text" placeholder="Sexo" bind:value={estudiante.sexo} required />
      <input type="text" placeholder="Curso Actual" bind:value={estudiante.curso_actual} required />
      <input type="date" placeholder="Fecha Ingreso IUC" bind:value={estudiante.fechaingresoiuc} required />
      <input type="date" placeholder="Fecha Egreso IUC" bind:value={estudiante.fechaegresoiuc} />
      <input type="date" placeholder="Fecha Ingreso PAE" bind:value={estudiante.fechaingresopae} required />
      <input type="date" placeholder="Fecha Egreso PAE" bind:value={estudiante.fechaegresoape} />
      <input type="text" placeholder="ID Acudiente" bind:value={estudiante.id_acudiente} required />
      
      <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      {#if editing}
        <button type="button" on:click={limpiarFormulario}>Cancelar</button>
      {/if}
    </form>
  </div>
  
  <div class="estudiantes-lista">
    <h2>Lista de Estudiantes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo de Documento</th>
          <th>Número de Documento</th>
          <th>Nombre</th>
          <th>Curso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each estudiantes as estudiante}
          <tr>
            <td>{estudiante.id_estudiante}</td>
            <td>{estudiante.tipodoc_estudiante}</td>
            <td>{estudiante.numerodoc_estudiante}</td>
            <td>{estudiante.nombre_completo}</td>            
            <td>{estudiante.curso_actual}</td>
            <td>
              <button on:click={() => editarEstudiante(estudiante)}>Editar</button>
              <button on:click={() => borrarEstudiante(estudiante.id_estudiante)}>Borrar</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  