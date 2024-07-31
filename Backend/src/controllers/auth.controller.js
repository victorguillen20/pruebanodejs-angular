import { User } from "../models/user/User.js";
import { getUserRole, isUserApproved, isUserLocked } from "../utils/auth.utils.js"; 

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
        let rols = '';
        const getRole = await getUserRole(username);
        if (getRole.success) {
            rols = getRole.rol
        }
        if (users) {
            return res.json({ isValid: true, message: 'Usuario Logueado', rol: rols, username: username }); 
        }         
    } catch (error) {
        return res.json({ isValid: false, message: 'Error de credenciales', rol: '', username: ''});
    }
};
