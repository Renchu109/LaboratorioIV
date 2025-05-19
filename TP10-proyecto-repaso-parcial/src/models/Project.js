const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
    {
        nombre: String,
        descripcion: String,
        fecha_inicio: Date,
        fecha_finalizacion: Date,
        estado: {
            type: String,
            enum: ['propuesta', 'en curso', 'finalizado'],
            default: 'propuesta'
        },
        investigadores: [{
            type: Schema.Types.ObjectID,
            ref: 'Researcher'
        }]
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Project', projectSchema)