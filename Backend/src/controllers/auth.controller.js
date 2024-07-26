import { User } from "../models/user/User.js";
import { getUserRole } from "../utils/auth.utils.js"; 

export const Authentication = async (req, res) => {
    const { username, password } = req.body;
    
    try {     
        let rols = ''  
        
        const users = await User.findOne({
            where: {
                username: username,
                password: password
             },
            rejectOnEmpty: true
        });
        const getRole = await getUserRole(username);
        if (getRole.success) {
            rols = getRole.rol
        }
        if (users) {
            return res.json({ isValid: users.isValid, message: 'Usuario Logueado', rol: rols }); 
        }               
    } catch (error) {
        return res.json({ isValid: false, message: 'Error de credenciales', rol: ''});
    }
};
