import { User } from "../models/user/User.js";
import { getUserRole, isUserApproved, isUserLocked } from "../utils/auth.utils.js"; 
import jwt from 'jsonwebtoken';
import { config } from '../JWT/config.js';

export const Authentication = async (req, res) => {
    const { username, password } = req.body;
    
    try {     
         
        const aproved = await isUserApproved (username);
        if (!aproved.success) {
            return res.json({isValid: false, message: aproved.message});
        }

        const locked = await isUserLocked (username);
        if (locked.success) {
            return res.json({isValid: false, message: locked.message });
        }
        
        const users = await User.findOne({
            where: {
                username: username,
                password: password
             },
            rejectOnEmpty: true
        });
        if (!users) {
            return res.json({ isValid: false, message: 'Credenciales inválidas', rol: '', username: '' }); 
        } 
        let rols = '';
        const getRole = await getUserRole(username);
        if (getRole.success) {
            rols = getRole.rol
        }
        //Generar el token de JWT
        const token = jwt.sign({ iduser: users.iduser, username: users.username, role: rols}, config.secret, { expiresIn: '1h'});

        return res.json({ isValid: true, message: 'Usuario Logueado', rol: rols, username: username, token: token});
        
    } catch (error) {
        return res.json({ isValid: false, message: 'Error de credenciales', rol: '', username: ''});
    }
};
