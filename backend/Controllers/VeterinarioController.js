import VeterinarioModel from "../Models/VeterinarioModel.js"

const registerVeterinario = async (req, res)=>{

    const {email}= req.body;

    //prevenir user duplicado
    const userExist = await VeterinarioModel.findOne({email})

    if(userExist){ 
        const error = new Error(`El correo "${email}" ya esta registrado`)
        return res.status(400).json({msg: error.message})
    }

try {
    //register new vet 
    const veterinario = new VeterinarioModel(req.body);
    
    const vetRegister = await veterinario.save();

    console.log('Registrando Veterinario')
    res.json ({msg:'Registrando Veterinario'})
} catch (error) {
    console.log(error)
}

}
const loginVeterinario =(req,res)=>{
    res.json({msg:'Desde /Api/Veterinario/Login'})
}

const profileVeterinario= (req,res)=>{
    res.json({msg:'Desde /Api/Veterinario/Perfil'})
}

const confirmUser = async  (req,res)=>{
    const {token}=req.params

    const userConfirm = await VeterinarioModel.findOne({token})

    if(!userConfirm){
        const error = new Error('Token no valido')

        return res.status(404).json({msg: error.message})
    }
    
    try {
        
        userConfirm.token=null;
        userConfirm.confirm= true;
        await userConfirm.save()
        
        res.json({msg: 'usuario confirmado confirmado'}) 
    } catch (error) {
        console.log(error)
    }
    
} 

export {registerVeterinario,loginVeterinario, profileVeterinario,confirmUser}