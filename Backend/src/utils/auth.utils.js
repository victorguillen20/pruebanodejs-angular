import { Rol } from "../models/rol/Rol.js";
import { User } from "../models/user/User.js";

export const getUserRole = async (username) => {
    try {
        const user = await User.findOne({
            where: { username: username },
            include: [{
                model: Rol,
                as: 'rols', 
                attributes: ['rolname']
            }]
        });

        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        return { success: true, rol: user.rols.rolname };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al obtener el rol del usuario' };
    }
};
