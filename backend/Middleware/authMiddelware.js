import Jwt from "jsonwebtoken"
import VeterinarioModel from "../Models/VeterinarioModel.js";

// se pueden crear middlewares para verificar si un cliente pago o restringir ciertas areas
const checkAuth = async ( req, res, next ) => {

    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
      
        try { 

            token = req.headers.authorization.split(' ')[1];

            const decode= Jwt.verify(token, process.env.JWT_SECRET) 

            req.veterinario = await VeterinarioModel.findById(decode.id).select('-password -token -confirm') 

            return next()
        } catch (e) {

            const error = new Error('Token no valido ')  
            return  res.status(403).json({msg: error.message})

        } 
    }

    if(!token){const error = new Error('Token no valido o inexistente') 
    res.status(403).json({msg: error.message}) }

    next()
}

export default checkAuth