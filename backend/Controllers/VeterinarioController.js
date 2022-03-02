import VeterinarioModel from "../Models/VeterinarioModel.js";
import generateJWT from "../Helpers/generateJWT.js";
import generateId from "../Helpers/generateId.js";

const registerVeterinario = async (req, res) => {
  const { email } = req.body;

  //prevenir user duplicado
  const userExist = await VeterinarioModel.findOne({ email });

  if (userExist) {
    const error = new Error(`El correo "${email}" ya esta registrado`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    //register new vet
    const veterinario = new VeterinarioModel(req.body);

    const vetRegister = await veterinario.save();

    console.log("Registrando Veterinario");
    res.json({ msg: "Registrando Veterinario" });
  } catch (error) {
    console.log(error);
  }
};

const profileVeterinario = (req, res) => {

  const {veterinario} = req

  res.json({ perfil: req.veterinario });
};

const confirmUser = async (req, res) => {
  const { token } = req.params;

  const userConfirm = await VeterinarioModel.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Token no valido");

    return res.status(404).json({ msg: error.message });
  }

  try {
    userConfirm.token = null;
    userConfirm.confirm = true;
    await userConfirm.save();

    res.json({ msg: "usuario confirmado confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const authenticateUser = async (req,res) => {

    const {email, password}=req.body

    const user= await VeterinarioModel.findOne({email})

    //verify user exist
    if(!user){ 
        console.log('user no existe')
        const error = new Error ('Usuario no existe') 
       return  res.status(404).json({msg:error.message}) 
    }
    
    // verificar si el usuario ha confirmado su cuenta
    if(!user.confirm){
        const error = new Error ('Tu cuenta no ha sido confirmada')
        console.log('Tu cuenta no ha sido confirmada')
        return res.status(403).json({ msg:error.message })
    } 
    
    //  revisar password ingresada 
    if(await user.ConfirmPassword( password, user.password )){ 
       console.log({ token : generateJWT(user.id) })  
       res.json({ token : generateJWT(user.id) })  
    }else{  
        console.log('password mala') 
        const error = new Error ('La password ingresada es incorrecta') 
        return res.status(403).json({ msg : error.message })
    }
 
};

const resetPassword = async (req, res) => {

  const {email}=req.body

  const  vetExist = await VeterinarioModel.findOne({email})

  if(!vetExist){ 
    console.log('no exites vet registrados con ese correo')
    const error = new Error('El email del usuario ingresado no existe')
    return res.status(404).json({msg:error.message})
  }

  try {
    
    vetExist.token = generateId();
    await vetExist.save();
    res.json({msg: 'Hemos enviado un mail con las intrucciones a seguir'})

  } catch (error) {
    console.log(error)    
  }
}

const verifyToken = async (req, res) => { 
  /* console.log(req.params) */
  const {token}=req.params

  const tokenAuth = await VeterinarioModel.findOne({token})

  if(tokenAuth){
    //autenticar el token 
    res.json({msg: 'token valido, el usuario existe'})
  }else{
    const error = new Error('El token que intenta ingresar no existe')
    return res.status(400).json({msg: error.message})
  }
}

const newPassword = async (req, res) => {
  const {token}=req.params
  const {password}=req.body

  const vet = await VeterinarioModel.findOne({token})

  if(!vet){
    const e = new Error('El token enviado no es valido')
    return res.status(400).json({msg: e.message})
  }
 
  try { 
    vet.token= null
    vet.password= password
    await vet.save(); 
    res.json({msg: 'password modificada correctamente'})

  } catch (error) {
    console.log(error)
  }
 }

export {
  registerVeterinario, 
  profileVeterinario,
  confirmUser,
  authenticateUser,
  resetPassword,
  verifyToken,
  newPassword,
};
