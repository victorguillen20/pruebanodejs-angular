import { User } from '../models/user/User.js';
import { Rol } from '../models/rol/Rol.js';
import { findRoleById } from '../utils/role.utils.js';

// Función para crear un nuevo usuario y asignarle un rol
export const createUser = async (req, res) => {
    const { username, email, password, rol_idrol, creationdate, usercreate, userapproval, dateapproval, userstatus_idstatus } = req.body;

    try {

        const roleCheck = await findRoleById(rol_idrol);
        if (!roleCheck.success) {
            return res.status(400).json({success: false, message: 'Error al crear el usuario' });
        }

        // Crear el nuevo usuario
        const newUser = await User.create({
            username,
            email,
            password,
            rol_idrol,
            creationdate,
            usercreate,
            userapproval,
            dateapproval,
            userstatus_idstatus
        });

        return res.status(201).json({ success: true, message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
};
