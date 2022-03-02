import mongoose from "mongoose";
import generateId from "../Helpers/generateId.js";
import bcrypt from "bcrypt";


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
        default: generateId(),
    },
    confirm:{
        type:Boolean,
        default:false,
    }
});

// function que reescribira la password hasheada para la evitar perdidas 
VeterinarioSchema.pre('save', async function(next){
    
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10) // se define el numero de iteraciones de hash para la  pss
    this.password= await bcrypt.hash(this.password, salt)
});

VeterinarioSchema.methods.ConfirmPassword = async ( passFomulario,passDB )=>{
    return await bcrypt.compare(passFomulario, passDB)
}

// primera variable es la que interactuara con la db y lo registra como modelo, con el 2do registra el schema del modelo
const VeterinarioModel = mongoose.model('VeterinarioModel',VeterinarioSchema)

export default VeterinarioModel;