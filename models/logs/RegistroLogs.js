const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const RegistroLogsSchema = mongoose.Schema({
    registro: {
        type: String,
        required: true
    },
    registro_json: {
        type:  Schema.Types.Mixed,
        required: true
    },
    actualizacion: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: String,
        trim: true,
        required: true,
        default: 'ACTIVO',
    }
});
RegistroLogsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RegistroLogs', RegistroLogsSchema);