const Project = require('../models/Project')

//MIDDLEWARE
const getProject = async (req, res, next) => {
    let project;
    const { id } = req.params;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        message: "El id del proyecto no es válido"
      });
    }
  
    try {
        project = await Project.findById(id);
      if(!project) {
          return res.status(404).json(
              {
                  message: 'El proyecto no fue encontrado'
              }
          )
      }
    } catch (error) {
      return res.status(500).json({
          message: error.message
      })
    }
  
    res.project = project;
    next()
};

const getResearcherId = async(req, res, next) => {
    let researcher;
    const { id } = req.params;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        message: "El id del investigador no es válido"
      });
    }
  
    try {
        researcher = await researcher.findById(id);
      if(!researcher) {
          return res.status(404).json(
              {
                  message: 'El proyecto no fue encontrado'
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
}

// Obtener todos los proyectos [GET ALL]
const getAllProjects = async(req, res) => {
    try {
        const projects = await Project.find();
        console.log('GET ALL', projects)
        if(projects.length === 0) {
            return res.status(204).json([]);
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({message: 'Error al traer todos los proyectos: ' + error.message})
    }
}

// Crear un nuevo proyecto [POST]
const createProyect = async(req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_finalizacion, estado, investigadores } = req?.body;

    if(!nombre || !fecha_inicio || !fecha_finalizacion || !estado) {
        return res.status(400).json({
            message: 'los campos nombre, fecha inicio, fecha finalizacion y estado son obligatorios!'
        })
    }

    const project = new Project({
        nombre,
        descripcion,
        fecha_inicio,
        fecha_finalizacion,
        estado,
        investigadores
    })

    try {
        const newProject = await project.save();
        console.log(newProject);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Traer un proyecto por su id [GET BY ID]
const getProjectById = async(req, res) => {
    res.json(res.project);
}

// Editar un proyecto por su id [PUT]
const updateProjectById = async(req, res) => {
    try {
        const project = res.project;
        project.nombre = req.body.nombre || project.nombre;
        project.descripcion = req.body.descripcion || project.descripcion;
        project.fecha_inicio = req.body.fecha_inicio || project.fecha_inicio;
        project.fecha_finalizacion = req.body.fecha_finalizacion|| project.fecha_finalizacion;
        project.estado = req.body.estado || project.estado;
        project.investigadores = req.body.investigadores || project.investigadores;

        const updatedProject = await project.save();
        res.json(updatedProject)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Editar un proyecto por su id [PATCH]
const patchProjectById = async(req, res) => {

    if(!req.body.nombre && !req.body.descripcion && !req.body.fecha_inicio && !req.body.fecha_finalizacion && !req.body.estado && !req.body.investigadores) {
        res.status(400).json({
            message: 'Al menos uno de estos campos debe ser enviado: nombre, descripción, fecha_inicio, fecha_finalizacion, estado o investigadores'
        })
    }

    try {
        const project = res.project;
        project.nombre = req.body.nombre || project.nombre;
        project.descripcion = req.body.descripcion || project.descripcion;
        project.fecha_inicio = req.body.fecha_inicio || project.fecha_inicio;
        project.fecha_finalizacion = req.body.fecha_finalizacion|| project.fecha_finalizacion;
        project.estado = req.body.estado || project.estado;
        project.investigadores = req.body.investigadores || project.investigadores;

        const updatedProject = await project.save();
        res.json(updatedProject)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//Eliminar un proyecto por su id [DELETE]
const deleteProjectById = async(req, res) => {
    try {
        const project = res.project;
        await project.deleteOne({
            _id: project._id
        })
        res.json({
            message: `El proyecto ${project.nombre} fue eliminado correctamenete`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Asignar un investigador al proyecto [PUT]
const asignResearcherById = async(req, res) => {
    const project = res.project;
    const researcher = res.researcher;
    try {
        if(!project.investigadores.includes(id)) {
            project.investigadores.push(id);
            await project.save();
        }

        if(!researcher.projects.includes(project)) {
            researcher.projects.push(project);
            await researcher.save();
        }

        res.status(200).json({
            message: 'Investigador asignado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getProject,
    getResearcherId,
    getAllProjects,
    createProyect,
    getProjectById,
    updateProjectById,
    patchProjectById,
    deleteProjectById,
    asignResearcherById 
}