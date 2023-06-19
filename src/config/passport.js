// IMPORTACION DE PASSPORT
const passport = require('passport')
// IMPORTAR EL MODELO USER
const User = require('../models/User')

// DEFINICION DE LA ESTRATEGIA
const LocalStrategy = require('passport-local').Strategy

// CONFIGURACION DE LA ESTRATEGIA
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    // TRAER EL USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    // VALIDACION DEL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    const passwordUser = await userBDD.matchPassword(password)
    // VALIDACION DE 
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // RETORNAR EL USUARIO
    return done(null,userBDD)
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});