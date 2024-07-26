import { User } from '../models/user/User.js';

import { findRoleById, 
    validateUsername,
    findUserByUsername,
    validatePassword
 } from '../utils/role.utils.js';


export const createUser = async (req, res) => {
    const { username, email, password, rol_idrol, creationdate, usercreate} = req.body;

    try {

        const roleCheck = await findRoleById(rol_idrol);
        if (!roleCheck.success) {
            return res.status(400).json({success: false, message: 'Error al crear el usuario' });
        }
        const validauser = validateUsername(username);
        if (!validauser.isValid) {
            return res.status(400).json({success: validauser.isValid, message: validauser.message});
        }
        const userExists = findUserByUsername();
        if (userExists.success) {
            return res.status(401).json({success: false, message: 'Usuario existente.'});
        }
        const passvalid = validatePassword(password);
        if (!passvalid) {
            return res.status(401).json({success: false, message: passvalid.message});
        }
        const newUser = await User.create({
            username,
            email,
            password,
            rol_idrol,
            creationdate,
            usercreate,                                    
        });

        return res.status(201).json({ success: true, message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
};
