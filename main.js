const express = require ('express');
const app = express();
const axios = require ('axios');
const _ = require ('lodash');
const { v4: uuidv4 } = require ('uuid');
const moment = require ('moment');
const PORT = 3000;
const api = 'https://randomuser.me/api/';
const usuarios = [];
const formatoFecha = 'MMM Do YYYY: hh:mm:ss a';

app.get('/usuarios', async(req,res) => {
try {
        const apiUsuario = await axios.get(api);
        const data = apiUsuario.data.results[0];
        const nombre = apiUsuario.data.results[0].name.first;
        const apellido = apiUsuario.data.results[0].name.last;
        const genero = apiUsuario.data.results[0].gender;
        const fecha = moment().format(formatoFecha);
        const idUsuario = uuidv4().slice(0,4);
        usuarios.push({nombre, apellido, genero, fecha, idUsuario});
        const generoUsuarios = _.partition(usuarios, (user) => {
            return user.genero==='female';
        })


        const escribirNavegador = `
        <h2>Clientes femeninas</h2>
        <ol>
        ${generoUsuarios[0].map(user=>{
            return `<li>Nombre: ${user.nombre} ${user.apellido}, Género: ${user.genero}, Fecha de inscripción: ${user.fecha}</li>`
        })}
        </ol>
        <h2>Clientes masculinos</h2>
        <ol>
        ${generoUsuarios[1].map(user=>{
            return `<li>Nombre: ${user.nombre} ${user.apellido}, Género: ${user.genero}, Fecha de inscripción: ${user.fecha}</li>`
        })}
        </ol>`
        res.send(escribirNavegador)
} catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos del usuario');
};
});

/* async function consultarApi() {
    try {
        const respuesta = await axios.get('https://randomuser.me/');
/*         console.log(respuesta.data); */
/*     } catch (e) {
        console.e('Hubo un error al procesar la solicitud', error);
    } */
/* } */

/* consultarApi(); */

app.listen(PORT, () => {
    console.log(`Servidor inicializado en http://localhost:${PORT}`)
});