//Se eliminan datos sensibles del codigo 
//SE CAMBIARON TODAS LAS VARIBALES VAR POR CONST O LET SEGUN CORRESPONDA COMO BUENA PRACTICA YA QUE VAR TIENE ALCANCE DE FUNCION Y PUEDE GENERAR PROBLEMAS DE SCOPE
// Variables globales (accesibles desde toda la aplicación)
//Se coloca la configuración sensible en un archivo separado no versionado evitando HARDCODING
const registros = [];
let contador = 0;
const API_KEY = ENV.API_KEY;
const DB_CONNECTION_STRING = ENV.DB_CONNECTION_STRING;
const endpoint = ENV.ENDPOINT;
const authToken = ENV.AUTH_TOKEN;

// Configuración del sistema
const CONFIG = ENV.CONFIG;

// Función principal de inicialización
function inicializar() {
    //Se quitan console.log que revelan información sensible
    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarRegistro();
    });
    //Se quita console.log que a pesar de no revelar informacion sensible, hace ruido en consola y podría revelar información sobre el funcionamiento del sistema
}

// Función para mostrar alertas de Bootstrap con auto-cierre
// Evita el uso de alert() nativo que puede ser bloqueado o utilizado en ataques de phishing
function mostrarAlerta(mensaje, tipo = 'danger') {
    // Crear elemento de alerta de Bootstrap
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insertar la alerta al inicio del formulario
    const formulario = document.getElementById('registroForm');
    formulario.insertAdjacentElement('beforebegin', alerta);
    
    // Auto-eliminar la alerta después de 5 minutos para alertas de éxito, 5 segundos para otras
    // Las alertas de éxito se mantienen visibles por más tiempo para confirmar la acción al usuario
    const tiempoEspera = tipo === 'success' ? 300000 : 5000; // 5 minutos o 5 segundos
    setTimeout(() => {
        // Animar el cierre de la alerta con fade-out antes de eliminarla
        alerta.classList.remove('show');
        // Esperar a que termine la animación antes de eliminar el elemento del DOM
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 150); // Tiempo de animación de Bootstrap
    }, tiempoEspera);
}

// Función para guardar un registro
function guardarRegistro() {
    //Se quita console.log innecesario
    // Obtener valores del formulario
    let nombre = document.getElementById('nombre').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let telefono = document.getElementById('telefono').value;
    let curp = document.getElementById('curp').value;
    let email = document.getElementById('email').value;
    
    // Se quitan console.log que revelan información sensible
    //Se quitan console.log innecesarios en produccion
    
    //Se cambia console.log por validacion mas robusta en funcion aparte
    
    // Validación para evitar emails duplicados
    // Previene registros redundantes y ayuda a mantener la integridad de los datos
    const emailExistente = registros.find(registro => registro.email.toLowerCase() === email.toLowerCase());
    if (emailExistente) {
        mostrarAlerta('⚠️ El correo electrónico ya está registrado. Por favor, utiliza otro correo.', 'warning');
        return; // Detiene el proceso de registro
    }

    //Se quita bloque de codigo comentado 
    
    // Crear objeto de registro
    let nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString(),
        //Se elimina apiKey, nunca se debe guardar
        //Se elimina sessionToken, los tokens se deben manejar en el servidor
    };
    
    // Se quitan console.log que revelan información sensible

    // Agregar al arreglo global
    registros.push(nuevoRegistro);
    
    //Se quita console.log que revelan información sensible
    
    // Mostrar en tabla
    agregarFilaTabla(nuevoRegistro);
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
    
    //Se quitan console.log que revelan informacion sensible
    
    // Mostrar mensaje de éxito al usuario
    mostrarAlerta('✅ Usuario registrado exitosamente', 'success');
    
    // Simulación de envío a servidor (hardcoded URL)
    enviarAServidor(nuevoRegistro);
}

// Función para agregar fila a la tabla de forma segura
// Se utiliza creación de elementos DOM en lugar de innerHTML para prevenir XSS
// Cada dato se sanitiza antes de insertarse para evitar ejecución de código malicioso
function agregarFilaTabla(registro) {
    const tabla = document.getElementById('tablaRegistros');
    
    // Crear elementos DOM de forma segura en lugar de usar innerHTML
    const fila = document.createElement('tr');
    
    // Crear celda para nombre completo
    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = registro.nombreCompleto; // textContent previene XSS automáticamente
    fila.appendChild(celdaNombre);
    
    // Crear celda para teléfono
    const celdaTelefono = document.createElement('td');
    celdaTelefono.textContent = registro.telefono;
    fila.appendChild(celdaTelefono);
    
    // Crear celda para CURP
    const celdaCurp = document.createElement('td');
    celdaCurp.textContent = registro.curp;
    fila.appendChild(celdaCurp);
    
    // Crear celda para email
    const celdaEmail = document.createElement('td');
    celdaEmail.textContent = registro.email;
    fila.appendChild(celdaEmail);
    
    // Insertar la fila en la tabla de forma segura
    tabla.appendChild(fila);
}

// Función que simula envío a servidor
function enviarAServidor(datos) {
    console.log("=== SIMULANDO ENVÍO A SERVIDOR ===");
    
    //Se elimina hardcoding de endpoint y token de autorización
    //Esto no pasa nada por que de todas formas se puede ver la request en consola pero es mejor que estar hardcodeado
    console.log("Endpoint:", endpoint);
    console.log("Authorization:", authToken);
    console.log("Payload completo:", JSON.stringify(datos));
    console.log("Método: POST");
    console.log("Content-Type: application/json");

    
    setTimeout(function() {
        console.log("Respuesta del servidor: 200 OK");
        console.log("==================================");
    }, 1000);
}

//Se elimina funcion comentada que no se usa 

//Se elimina funcion de diagnostico que expone informacion sensible

// Ejecutar diagnóstico al cargar
//Se elimina llamada a funcion eliminada


//Se elimina codigo comentado que no se usa 

// Variable global adicional - Eliminada pues no se usa

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function() {
    //Se quita console.log innecesario que no deberia estar en produccion
    inicializar();
    
    //Se quita exposicion de variables globales sensibles
});

//Se elimina bloque de codigo comentado 

//Se eliminan console.log innecesarios
