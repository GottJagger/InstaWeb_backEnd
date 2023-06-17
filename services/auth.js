const hapi = require('@hapi/joi')
const User = require('../models/user')

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
        //const result = await User.deleteMany();
        return {
            message: "El usuario ya está registrado",
            error: "Email duplicado"
        };
    }

    const user = new User(user_params)

    const user_respuesta = await user.save()

    return{
        message:'Se guardo el usuario',
        user:user_respuesta
    }
}

module.exports = create_user;

