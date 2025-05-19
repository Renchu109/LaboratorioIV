const Publication = require('../models/Publication');

//MIDDLEWARE
const getPublication = async (req, res, next) => {
    let publication;
    const { id } = req.params;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        message: "El id de la publicación no es válido"
      });
    }
  
    try {
        publication = await Publication.findById(id);
      if(!publication) {
          return res.status(404).json(
              {
                  message: 'La publicación no fue encontrada'
              }
          )
      }
    } catch (error) {
      return res.status(500).json({
          message: error.message
      })
    }
  
    res.publication = publication;
    next()
  };

// Traer todas las publicaciones [GET ALL]
const getAllPublications = async(req, res) => {
    try {
        const publications = await Publication.find();
        console.log('GET ALL', publications)
        if(publications.length === 0) {
            return res.status(204).json([])
        }

        res.json(publications)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Crear una nueva publicación [POST]
const createPublication = async(req, res) => {
    const { titulo, resumen, fecha_publicacion, proyecto_relacionado, lista_autores } = req?.body;

    if(!titulo || !resumen || !fecha_publicacion ||  !proyecto_relacionado || !lista_autores) {
        return res.status(400).json({
            message: 'Los campos titulo, resumen, fecha_publicacion, proyecto_relacionado, lista_autores son obligatorios!'
        })
    }

    const publication = new Publication({
        titulo, 
        resumen, 
        fecha_publicacion, 
        proyecto_relacionado, 
        lista_autores
    })

    try {
        const newPublication = await publication.save();
        console.log(newPublication);
        res.status(201).json(newPublication)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Traer una publicación por id [GET BY ID]
const getPublicationById =  async(req, res) => {
    res.json(res.publication);
}

// Editar una publicación [PUT]
const updatePublicationById =  async(req, res) => {
    try {
        const publication = res.publication;
        publication.titulo = req.body.titulo || publication.titulo;
        publication.resumen = req.body.resumen || publication.resumen;
        publication.fecha_publicacion = req.body.fecha_publicacion || publication.fecha_publicacion;
        publication.proyecto_relacionado = req.body.proyecto_relacionado || publication.proyecto_relacionado;
        publication.lista_autores = req.body.lista_autores || publication.lista_autores;

        const updatedPublication = await publication.save();
        res.json(updatedPublication)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Editar una publicación [PATCH]
const patchPublicationById =  async(req, res) => {

    if(!req.body.titulo && !req.body.resumen && !req.body.fecha_publicacion && !req.body.proyecto_relacionado && !req.body.lista_autores) {
        res.status(400).json({
            message: 'Al menos uno de estos campos debe ser enviado: titulo, resumen, fecha_publicacion, proyecto_relacionado o lista_autores'
        })
    }

    try {
        const publication = res.publication;
        publication.titulo = req.body.titulo || publication.titulo;
        publication.resumen = req.body.resumen || publication.resumen;
        publication.fecha_publicacion = req.body.fecha_publicacion || publication.fecha_publicacion;
        publication.proyecto_relacionado = req.body.proyecto_relacionado || publication.proyecto_relacionado;
        publication.lista_autores = req.body.lista_autores || publication.lista_autores;

        const updatedPublication = await publication.save();
        res.json(updatedPublication)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Eliminar una publicación [DELETE]
const deletePublicationById = async(req, res) => {
    try {
        const publication = res.publication;
        await publication.deleteOne({
            _id: publication._id
        });
        res.json({
            message: `La publicación ${publication.titulo} fue eliminada correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getPublication,
    getAllPublications,
    createPublication,
    getPublicationById,
    updatePublicationById,
    patchPublicationById,
    deletePublicationById
}