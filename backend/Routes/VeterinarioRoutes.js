import  express from 'express';
import { registerVeterinario, loginVeterinario, profileVeterinario, confirmUser} from '../Controllers/VeterinarioController.js';

const router = express.Router();

router.post('/',registerVeterinario);
router.get('/Login',loginVeterinario);
router.get('/Profile',profileVeterinario);
router.get('/confirmUser/:token',confirmUser);
export default router;