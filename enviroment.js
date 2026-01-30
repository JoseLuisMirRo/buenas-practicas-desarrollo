//Ejemplo de archivo ENV a falta de node, dotenv, etc. Los valores deben ser agregados por el desarrollador.
const ENV = {
    API_KEY: "tu_api_key_aqui",
    DB_CONNECTION_STRING: "tu_cadena_de_conexion_aqui",
    ENDPOINT: "https://api.ejemplo.com",
    AUTH_TOKEN: "tu_token_de_autenticacion_aqui",
    CONFIG: {
        modoDebug: false,
        maxIntentos: 5
    }
  // Deben ser agregadas por el desarollador y no subidas al repositorio - Estan subidas solo por el ejercicio
};