import  express from 'express';
import { registerVeterinario, profileVeterinario, confirmUser, authenticateUser, resetPassword, newPassword,verifyToken} from '../Controllers/VeterinarioController.js';
import checkAuth from '../Middleware/authMiddelware.js';

const router = express.Router();

//public area
router.post('/',registerVeterinario);
router.get('/confirmUser/:token',confirmUser);
router.post('/Login',authenticateUser);
router.post('/forgetPassword',resetPassword)
router.route('/forgetPassword/:token').get(verifyToken).post(newPassword)

//priv area
router.get('/Profile',checkAuth , profileVeterinario);

export default router;