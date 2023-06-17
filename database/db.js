const { default: mongoose } = require('mongoose');
const user_db = process.env.USERDB
const pass_db = process.env.PASSDB
const name_db = process.env.NAMEDB
const host_db = process.env.HOSTDB


mongoose.connect(`mongodb+srv://${user_db}:${pass_db}@${name_db}.${host_db}`)
.then(()=>console.log(
    `database running...
    database_name: ${name_db}
    usuario: ${user_db}`))
.catch((e)=>console.log(
    `ERROR!! fallo en la conexion a la base de datos...
     ${e.message}`))


