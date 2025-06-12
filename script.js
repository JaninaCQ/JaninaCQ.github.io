// Variables globales
let resultadoEvaluacion = "";
let datosEvaluacion = {};

// Funciones de navegación entre tabs
function showTab(n) {
    for (let i = 1; i <= 6; i++) {
        const section = document.getElementById('section' + i);
        const tab = document.getElementById('tab' + i);

        if (section && tab) {
            section.style.display = (i === n) ? '' : 'none';
            tab.classList.toggle('active', i === n);
        }
    }
}

// Continuar a los datos directivo
function continuarDatosD() {
    // Validación simple de campos obligatorios
    const nombre = document.getElementById('nombre').value.trim();
    const amie = document.getElementById('amie').value.trim();
    const sost = document.getElementById('sostenimiento').value.trim();
    const prov = document.getElementById('provincia').value;
    const canton = document.getElementById('canton').value.trim();
    const parr = document.getElementById('parroquia').value.trim();
    const direc = document.getElementById('direccion').value.trim();
    const seccion = document.getElementById('seccion').value.trim();    
    const nivel = document.getElementById('nivel').value;
    
    if (!nombre || !amie || !nivel || !sost|| !prov|| !canton|| !parr|| !direc|| !seccion) {
        alert('Por favor complete los campos obligatorios.');
        return;
    }
      const tab2 = document.getElementById('tab2');
    tab2.disabled = false;
    showTab(2);
}


// Continuar a calificaciones
function continuarDdocente() {

    const nombred = document.getElementById('nombred').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const titutloP = document.getElementById('tituloP').value.trim();
    const exp = document.getElementById('exp').value;
    const cel = document.getElementById('celular').value.trim();
    const email = document.getElementById('email').value.trim();

    
    if (!nombred || !cargo || !cel || !titutloP|| !email|| !exp) {
        alert('Por favor complete los campos obligatorios.');
        return;
    }
        const tab3 = document.getElementById('tab3');
    tab3.disabled = false;
    showTab(3);
}

function continuarEstudiantes() {

    const nombredoc = document.getElementById('nombredoc').value.trim();
    const asig = document.getElementById('asig').value.trim();
    const aexp = document.getElementById('aexp').value;
    const hos = document.getElementById('hos').value.trim();
    const grado = document.getElementById('grado').value.trim();
    const paral = document.getElementById('paral').value.trim();
    const cce = document.getElementById('cce').value.trim();
    const numc = document.getElementById('numc').value.trim();

    
    if (!nombredoc || !asig || !aexp || !hos || !grado|| !paral|| !cce|| !numc) {
        alert('Por favor complete los campos obligatorios.');
        return;
    }
        const tab4 = document.getElementById('tab4');
    tab4.disabled = false;
    showTab(4);
}

function validarEmail() {
    const email = document.getElementById('email').value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    const mensaje = document.getElementById('email');

    if (isValid) {
        mensaje.textContent = 'Correo electrónico válido';
        mensaje.style.color = 'green';
    } else {
        mensaje.textContent = 'Correo electrónico inválido';
        mensaje.style.color = 'red';
    }
}
// Funciones para manejo de estudiantes
// function agregarEstudiante() {
//     const tbody = document.querySelector('#tabla-estudiantes tbody');
//     const newRow = document.createElement('tr');

//     newRow.innerHTML = `
//         <td><input type="text" placeholder="Nombre del estudiante" class="nombre-estudiante"></td>
//         <td><input type="number" min="0" max="10" step="0.1" class="calificacion-estudiante"></td>
//         <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
//     `;

//     tbody.appendChild(newRow);
// }

// function eliminarEstudiante(button) {
//     const row = button.closest('tr');
//     if (document.querySelectorAll('#tabla-estudiantes tbody tr').length > 1) {
//         row.remove();
//     } else {
//         alert('Debe mantener al menos un estudiante.');
//     }
// }
function agregarEstudiante() {
    const tbody = document.querySelector('#tabla-estudiantes tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="text" placeholder="Nombre del estudiante" class="nombre-estudiante"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="trabajos-clase"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="lecciones"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="exposicion1"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="exposicion2"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="ev-formativa"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="ev-sumativa"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="trabajos-extra"></td>
        <td><input type="number" min="0" max="10" step="0.1" class="promedio" readonly></td>
        <td><input type="number" min="0" max="10" step="0.1" class="calificacion-estudiante"></td>
        <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
    `;

    tbody.appendChild(newRow);

    // Asignar eventos para actualizar el promedio en la nueva fila
    asignarEventosNotas();
}

function eliminarEstudiante(button) {
    const tbody = document.querySelector('#tabla-estudiantes tbody');
    const filas = tbody.querySelectorAll('tr');

    if (filas.length > 1) {
        const row = button.closest('tr');
        row.remove();
    } else {
        alert('Debe mantener al menos un estudiante.');
    }
}

function asignarEventosNotas() {
    const filas = document.querySelectorAll('#tabla-estudiantes tbody tr');
    filas.forEach(fila => {
        const inputsNotas = fila.querySelectorAll('input[type="number"]:not(.promedio):not(.calificacion-estudiante)');
        inputsNotas.forEach(input => {
            input.removeEventListener('input', onInputNota); // prevenir múltiples eventos
            input.addEventListener('input', onInputNota);
        });
    });
}

function onInputNota(event) {
    const fila = event.target.closest('tr');
    actualizarPromedioFila(fila);
}

// Función para calcular y actualizar el promedio de cada fila
function actualizarPromedioFila(fila) {
    // Selecciona todos los inputs de notas, excepto el de promedio y nombre
    const inputsNotas = fila.querySelectorAll('input[type="number"]:not(.promedio):not(.calificacion-estudiante)');
    let suma = 0;
    let cantidad = 0;
    inputsNotas.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            suma += valor;
            cantidad++;
        }
    });

    // Calcula el promedio
    const promedioInput = fila.querySelector('.promedio');
    let promedio = (cantidad > 0) ? (suma / cantidad) : 0;
    promedioInput.value = promedio.toFixed(2);

    // Cambia el color del input según el promedio
    if (promedio >= 7) {
        promedioInput.style.color = 'green';
        promedioInput.style.fontWeight = 'bold';
    } else {
        promedioInput.style.color = 'red';
        promedioInput.style.fontWeight = 'bold';
    }
}

// Asigna el evento a todos los inputs de notas en la tabla
function asignarEventosNotas() {
    const filas = document.querySelectorAll('#tabla-estudiantes tbody tr');
    filas.forEach(fila => {
        const inputsNotas = fila.querySelectorAll('input[type="number"]:not(.promedio):not(.calificacion-estudiante)');
        inputsNotas.forEach(input => {
            input.addEventListener('input', function () {
                actualizarPromedioFila(fila);
            });
        });
    });
}

// Ejecuta la asignación de eventos al cargar la página
window.addEventListener('DOMContentLoaded', asignarEventosNotas);

// Mostrar resultados finales - FUNCIÓN CORREGIDA
function mostrarResultados() {
    // Asegurar que todos los promedios estén calculados
    const filas = document.querySelectorAll('#tabla-estudiantes tbody tr');
    filas.forEach(fila => {
        actualizarPromedioFila(fila);
    });

    // Recopilar datos de estudiantes
    const nombres = document.querySelectorAll('.nombre-estudiante');
    const promedios = document.querySelectorAll('.promedio');

    let estudiantes = [];
    let calificacionesValidas = [];

    for (let i = 0; i < nombres.length; i++) {
        const nombre = nombres[i].value.trim();
        const promedio = parseFloat(promedios[i].value);

        if (nombre && !isNaN(promedio)) {
            estudiantes.push({
                nombre: nombre,
                calificacion: promedio
            });
            calificacionesValidas.push(promedio);
        }
    }

    if (estudiantes.length === 0) {
        alert('Por favor ingrese al menos un estudiante con sus calificaciones.');
        return;
    }

    // Calcular estadísticas
    const promedioGeneral = calificacionesValidas.reduce((a, b) => a + b, 0) / calificacionesValidas.length;
    const maxima = Math.max(...calificacionesValidas);
    const minima = Math.min(...calificacionesValidas);
    const aprobados = calificacionesValidas.filter(c => c >= 7).length;
    const reprobados = calificacionesValidas.filter(c => c < 7).length;

    // Guardar datos de estudiantes
    datosEvaluacion.estudiantes = estudiantes;
    datosEvaluacion.estadisticas = {
        promedio: promedioGeneral.toFixed(2),
        maxima: maxima.toFixed(2),
        minima: minima.toFixed(2),
        aprobados: aprobados,
        reprobados: reprobados,
        total: estudiantes.length
    };

    // Generar resultado de evaluación curricular
    let porcentajeAprobacion = (aprobados / estudiantes.length) * 100;
    let evaluacionCurricular = "";

    if (porcentajeAprobacion >= 85) {
        evaluacionCurricular = "EXCELENTE - El desempeño curricular es sobresaliente.";
    } else if (porcentajeAprobacion >= 70) {
        evaluacionCurricular = "SATISFACTORIO - El desempeño curricular cumple con los estándares esperados.";
    } else if (porcentajeAprobacion >= 50) {
        evaluacionCurricular = "POCO SATISFACTORIO - El desempeño curricular requiere mejoras.";
    } else {
        evaluacionCurricular = "INSATISFACTORIO - El desempeño curricular necesita intervención inmediata.";
    }

    resultadoEvaluacion = `
        <div style="padding: 15px; border-left: 4px solid #2563eb; background: #f8fafc;">
            <h4>Evaluación Curricular Institucional</h4>
            <p><strong>Resultado:</strong> ${evaluacionCurricular}</p>
            <p><strong>Porcentaje de Aprobación:</strong> ${porcentajeAprobacion.toFixed(1)}%</p>
            <p><strong>Promedio General del Curso:</strong> ${promedioGeneral.toFixed(2)}/10</p>
        </div>
    `;

    // Mostrar resultados
    document.getElementById('resultadoEval').innerHTML = resultadoEvaluacion;

    document.getElementById('estadisticasEstudiantes').innerHTML = `
        <h3>Estadísticas de Calificaciones</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
            <div><strong>Total de estudiantes:</strong> ${estudiantes.length}</div>
            <div><strong>Promedio general:</strong> ${promedioGeneral.toFixed(2)}</div>
            <div><strong>Calificación más alta:</strong> ${maxima.toFixed(2)}</div>
            <div><strong>Calificación más baja:</strong> ${minima.toFixed(2)}</div>
            <div><strong>Estudiantes aprobados:</strong> ${aprobados} (${porcentajeAprobacion.toFixed(1)}%)</div>
            <div><strong>Estudiantes reprobados:</strong> ${reprobados} (${(100-porcentajeAprobacion).toFixed(1)}%)</div>
        </div>
        
        <h4 style="margin-top: 20px;">Detalle por Estudiante</h4>
        <div style="max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; margin-top: 10px;">
            ${estudiantes.map(est => `
                <div style="padding: 5px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong>${est.nombre}:</strong> 
                    <span style="color: ${est.calificacion >= 7 ? 'green' : 'red'}; font-weight: bold;">
                        ${est.calificacion.toFixed(2)}
                    </span>
                    ${est.calificacion >= 7 ? '(Aprobado)' : '(Reprobado)'}
                </div>
            `).join('')}
        </div>
    `;
 const tab5 = document.getElementById('tab5');
    tab5.disabled = false;
    showTab(5); 
}

function generarReporte() {
    const fecha = new Date().toLocaleDateString('es-ES');

    let reporteHTML = `
        <h3>Reporte de Evaluación Curricular Institucional</h3>
        <div style="margin-bottom: 20px;">
            <strong>Nombre de la Institución:</strong> ${datosEvaluacion.nombre || 'No especificado'}<br>
            <strong>Código AMIE:</strong> ${datosEvaluacion.amie || 'No especificado'}<br>
            <strong>Provincia:</strong> ${datosEvaluacion.provincia || 'No especificado'}<br>
            <strong>Cantón:</strong> ${datosEvaluacion.canton || 'No especificado'}<br>
            <strong>Nivel Educativo:</strong> ${datosEvaluacion.nivel || 'No especificado'}<br>
            <strong>Sección:</strong> ${datosEvaluacion.seccion || 'No especificado'}<br><br>
            <strong>Directivo:</strong> ${datosEvaluacion.nombred || 'No especificado'}<br>
            <strong>Docente:</strong> ${datosEvaluacion.nombredoc || 'No especificado'}<br>
            <strong>Asignatura:</strong> ${datosEvaluacion.asig || 'No especificado'}<br>
            <strong>Grado/Curso:</strong> ${datosEvaluacion.grado || 'No especificado'}<br>
            <strong>Fecha de Evaluación:</strong> ${fecha}<br>
        </div>
        
        <hr style="margin: 20px 0;">
        
        <h4>Resultado de Evaluación Curricular:</h4>
        <div style="margin-bottom: 20px;">
            ${resultadoEvaluacion}
        </div>
        
        <h4>Estadísticas de Estudiantes:</h4>
    `;

    if (datosEvaluacion.estadisticas) {
        const stats = datosEvaluacion.estadisticas;
        reporteHTML += `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div><strong>Total de estudiantes:</strong> ${stats.total}</div>
                <div><strong>Promedio general:</strong> ${stats.promedio}</div>
                <div><strong>Calificación más alta:</strong> ${stats.maxima}</div>
                <div><strong>Calificación más baja:</strong> ${stats.minima}</div>
                <div><strong>Estudiantes aprobados:</strong> ${stats.aprobados}</div>
                <div><strong>Estudiantes reprobados:</strong> ${stats.reprobados}</div>
            </div>
        `;
    }

    if (datosEvaluacion.estudiantes && datosEvaluacion.estudiantes.length > 0) {
        reporteHTML += `
            <h4>Detalle de Calificaciones:</h4>
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px;">
        `;

        datosEvaluacion.estudiantes.forEach(estudiante => {
            reporteHTML += `<div><strong>${estudiante.nombre}:</strong> ${estudiante.calificacion.toFixed(2)}</div>`;
        });

        reporteHTML += `</div>`;
    }

    document.getElementById('reporteFinal').innerHTML = reporteHTML;
}


// Nueva evaluación
function nuevaEvaluacion() {
    if (confirm('¿Está seguro de que desea iniciar una nueva evaluación? Se perderán todos los datos actuales.')) {
        // Limpiar todos los formularios
        document.getElementById('datosForm').reset();
        // The evalForm ID is duplicated in HTML, so we need to target specific forms if they are meant to be separate
        // For now, let's reset inputs inside section2 and section3 manually or if the ID is made unique for each form
        document.getElementById('section2').querySelectorAll('input, select').forEach(input => input.value = '');
        document.getElementById('section3').querySelectorAll('input, select').forEach(input => input.value = '');


        // Limpiar tabla de estudiantes and re-add initial rows
        const tbody = document.querySelector('#tabla-estudiantes tbody');
        tbody.innerHTML = `
            <tr>
                <td><input type="text" value="Juan Pérez" class="nombre-estudiante"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-clase"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="lecciones"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion1"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion2"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-formativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-sumativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-extra"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="promedio" readonly></td>
                <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
            </tr>
            <tr>
                <td><input type="text" value="María Gómez" class="nombre-estudiante"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-clase"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="lecciones"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion1"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion2"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-formativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-sumativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-extra"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="promedio" readonly></td>
                <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
            </tr>
            <tr>
                <td><input type="text" value="Carlos Sánchez" class="nombre-estudiante"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-clase"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="lecciones"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion1"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion2"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-formativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-sumativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-extra"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="promedio" readonly></td>
                <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
            </tr>
            <tr>
                <td><input type="text" value="Ana Rodríguez" class="nombre-estudiante"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-clase"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="lecciones"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion1"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="exposicion2"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-formativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="ev-sumativa"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="trabajos-extra"></td>
                <td><input type="number" min="0" max="10" step="0.1" class="promedio" readonly></td>
                <td><button type="button" class="btn-danger" onclick="eliminarEstudiante(this)">Eliminar</button></td>
            </tr>
        `;
        asignarEventosNotas(); // Re-assign event listeners for the new rows

        // Limpiar variables globales
        resultadoEvaluacion = "";
        datosEvaluacion = {};

        // Limpiar contenido de resultados
        document.getElementById('resultadoEval').innerHTML = "";
        document.getElementById('estadisticasEstudiantes').innerHTML = "";
        document.getElementById('reporteFinal').innerHTML = "";

        // Disable all tabs except the first one
        for (let i = 2; i <= 6; i++) {
            const tab = document.getElementById('tab' + i);
            if (tab) {
                tab.disabled = true;
            }
        }

        // Volver al primer tab
        showTab(1);
    }
}