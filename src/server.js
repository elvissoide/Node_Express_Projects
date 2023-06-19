const express = require('express')
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload')
const passport = require('passport');
const session = require('express-session');

// Inicializaciones
const app = express()
require('./config/passport') // Invocar el archivo passport

// Configuraciones
app.set('port', process.env.port || 3000)
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', engine({
    defaultLayout:'main', //Layout principal
    layoutsDir:path.join(app.get('views'),'layouts'), // Ubicacion directorio
    partialsDir:path.join(app.get('views'),'partials'), // Ubicacion de partials
    extname:'.hbs' // Extension del motor de plantilla
}))
app.set('view engine','.hbs') // El motor de plantilla maneje la extension hbs
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())

// Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

// Rutas
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

// Archivos estaticos
app.use(express.static(path.join(__dirname,'public')))

module.exports = app