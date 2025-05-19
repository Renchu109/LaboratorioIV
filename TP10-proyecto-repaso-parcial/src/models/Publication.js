const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new mongoose.Schema(
    {
        titulo: String,
        resumen: String,
        fecha_publicacion: Date,
        proyecto_relacionado: [{
            type: Schema.Types.ObjectID,
            ref: 'Project'
        }],
        lista_autores: [{
            type: Schema.Types.ObjectID,
            ref: 'Researcher'
        }]
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Publication', publicationSchema);