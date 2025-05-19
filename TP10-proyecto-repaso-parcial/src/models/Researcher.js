const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researcherSchema = new mongoose.Schema(
    {
        nombre: String,
        especialidad: String,
        email: String,
        lista_proyectos: [{
            type: Schema.Types.ObjectID,
            ref: 'Project'
        }]
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Researcher', researcherSchema);