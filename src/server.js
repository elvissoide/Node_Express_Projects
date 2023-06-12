const express = require('express')
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');

// Inicializaciones
const app = express()

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

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// Variables globales


// Rutas
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))

// Archivos estaticos
app.use(express.static(path.join(__dirname,'public')))

module.exports = app

// ===== PRIMER CODE =====
// const app = express()

// module.exports = app