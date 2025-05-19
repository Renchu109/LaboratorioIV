const Researcher = require('../models/Researcher')

//MIDDLEWARE
const getResearcher = async (req, res, next) => {
    let researcher;
    const { id } = req.params;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        message: "El id del investigador no es válido"
      });
    }
  
    try {
        researcher = await Researcher.findById(id);
      if(!researcher) {
          return res.status(404).json(
              {
                  message: 'El investigador no fue encontrado'
              }
          )
      }
    } catch (error) {
      return res.status(500).json({
          message: error.message
      })
    }
  
    res.researcher = researcher;
    next()
  };

// Obtener todos los investigadores [GET ALL]
const getAllResearchers = async(req, res) => {
    try {
        const researchers = await Researcher.find();
        console.log('GET ALL', researchers);
        if(researchers === 0){
            return res.status(204).json([]);
        }
        res.json(researchers)
    } catch (error) {
        res.status(500).json({
            message: 'Error al traer a todos los investigadores: ' + message.error
        })
    }
}

// Crear nuevo investigador [POST]
const createResearcher = async(req, res) => {
    const { nombre, especialidad, email, lista_proyectos } = req?.body;

    if(!nombre || !especialidad || !email) {
        return res.status(400).json({
            message: 'Los campos nombre, especialidad y email son obligatorios!'
        })
    }

    const researcher = new Researcher({
        nombre, 
        especialidad, 
        email, 
        lista_proyectos
    })

    try {
        const newResearcher = await researcher.save();
        console.log(newResearcher);
        res.status(201).json(newResearcher);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Traer a un investigador por su id [GET BY ID]
const getResearcherById = async(req, res) => {
    res.json(res.researcher);
}

// Editar a un investigador [PUT]
const updateResearcherById = async(req, res) => {
    try {
        const researcher = res.researcher;
        researcher.nombre = req.body.nombre || researcher.nombre;
        researcher.especialidad = req.body.especialidad || researcher.especialidad;
        researcher.email = req.body.email || researcher.email;
        researcher.lista_proyectos = req.body.lista_proyectos || researcher.lista_proyectos;

        const updatedResearcher = await researcher.save();
        res.json(updatedResearcher);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Editar a un investigador [PATCH]
const patchResearcherById = async(req, res) => {

    if(!req.body.nombre && !req.body.especialidad && !req.body.email && !req.body.lista_proyectos) {
        res.status(400).json({
            message: 'Al menos uno de estos campos debe ser enviado: nombre, especialidad, email o lista_proyectos'
        })
    }

    try {
        const researcher = res.researcher;
        researcher.nombre = req.body.nombre || researcher.nombre;
        researcher.especialidad = req.body.especialidad || researcher.especialidad;
        researcher.email = req.body.email || researcher.email;
        researcher.lista_proyectos = req.body.lista_proyectos || researcher.lista_proyectos;

        const updatedResearcher = await researcher.save();
        res.json(updatedResearcher);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//Eliminar a un investigador [DELETE]
const deleteResearcherById = async(req, res) => {
    try {
        const researcher = res.researcher;
        await researcher.deleteOne({
            _id: researcher._id
        });
        res.json({
            message: `El investigador ${researcher.nombre} fue eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getResearcher,
    getAllResearchers,
    createResearcher,
    getResearcherById,
    updateResearcherById,
    patchResearcherById,
    deleteResearcherById
}