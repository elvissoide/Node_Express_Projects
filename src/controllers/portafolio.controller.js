const Portfolio = require('../models/Portfolio')

// const renderAllPortafolios = (req,res)=>{
//     res.send('Listar todos los portafolios')
// }
const renderAllPortafolios = async(req,res)=>{
    // A partirr del modelo 
    const portfolios = await Portfolio.find().lean()
    // Invocar la vista y pasar la variable portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
// const renderPortafolioForm = (req,res)=>{
//     res.send('Formulario para crear un portafolio')
// }
// const createNewPortafolio = (req,res)=>{
//     res.send('Crear un nuevo portafolio')
// }
// const renderEditPortafolioForm = (req,res)=>{
//     res.send('Formulario para editar un portafolio')
// }
const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}
// const updatePortafolio = (req,res)=>{
//     res.send('Editar un portafolio')
// }
const updatePortafolio = async(req,res)=>{
    const {title,category,description}= req.body
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}
// const deletePortafolio = (req,res)=>{
//     res.send('Eliminar un nuevo portafolio')
// }
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

// const createNewPortafolio =(req,res)=>{
//     console.log(req.body);
//     res.send("Portafolio almacenado en la BDD")
// }

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.redirect('/portafolios')
}

module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}