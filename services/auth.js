const hapi = require('@hapi/joi')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const user_regex = hapi.object({
    name: hapi.string().min(3).max(256),
    email: hapi.string().min(6).max(255).email().required(),
    celular: hapi.string().max(10).min(10).pattern(/^[0-9]+$/),
    password:hapi.string().min(3).max(256).required()
})


const create_user = async user_params => {

    const{error} = user_regex.validate(user_params)

    if(error){
        return{
            message: "algo salio mal!",
            error: error.details[0].message
        }
    }


    const { email } = user_params;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            message: "El usuario ya está registrado",
            error: "Email duplicado"
        };
    }

    const { password } = user_params
    const salt = await bcrypt.genSalt(10)
    const encrypt = await bcrypt.hash(password,salt)
    user_params.password = encrypt

    const user = new User(user_params)

    const user_respuesta = await user.save()

    return{
        message:'Se guardo el usuario',
        user:user_respuesta
    }
}

const login_regex = hapi.object({
    email: hapi.string().min(6).max(255).email().required(),
    password:hapi.string().min(3).max(256).required()
})

const login_user = async credential =>{

    const {error} = login_regex.validate(credential)
    if(error){
        return {
            message: "error con credenciales igresadas",
            error: error.details[0].message
        }
    }

    const { email } = credential;
    const user_bd = await User.findOne({ email });
    if (!user_bd) {
        return {
            message: "El usuario no se encuentra registrado",
        };
    }

    const is_pass_valid = bcrypt.compare(credential.password,user_bd.password)
    if(!is_pass_valid){
        message:"contraseña invalida"
    }

    return {
        message:"bienvenido!"
    }

}


const deleteAllUsers = async () => {
    try {
      const result = await User.deleteMany();
      return {
        message: `Se eliminaron ${result.deletedCount} usuarios`
      };
    } catch (error) {
      return {
        message: 'Ocurrió un error al eliminar los usuarios',
        error: error.message
      };
    }
  };
module.exports = {create_user,login_user,deleteAllUsers};


