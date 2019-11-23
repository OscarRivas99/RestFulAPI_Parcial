const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var FrutaSchema = Schema({
        nombre: {
            type: String,
            required: true,
           unique:true
        },
        peso: Number,
        color: String,
        crece_en_arbol: {
            type: String,
            required: true
        },
       
        calorias: Number
    }, {
        timestamps: true
    });
    
    



module.exports = mongoose.model("Frutas", FrutaSchema);