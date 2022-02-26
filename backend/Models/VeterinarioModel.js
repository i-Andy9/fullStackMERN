import mongoose from "mongoose";
import idGenerator from "../Helpers/idGenerator.js";

const VeterinarioSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    phone:{
        type:String,
        default:null, 
        trim:true,
    },
    web:{
        type:String,
        default:null,
        trim:true,
    },
    token:{
        type:String,
        default: idGenerator(),
    },
    confirm:{
        type:Boolean,
        default:false,
    }
});

// primera variable es la que interactuara con la db y lo registra como modelo, con el 2do registra el schema del modelo
const VeterinarioModel = mongoose.model('VeterinarioModel',VeterinarioSchema)

export default VeterinarioModel;