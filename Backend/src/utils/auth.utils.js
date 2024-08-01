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

export const isUserApproved = async (username) => {
    try {
      const user = await User.findOne({
        where: {
          username: username
        }
      });
  
      // Verificar si se encontró el usuario y si userapproval no es null o vacío
      if (user && user.userapproval) {
        return {
          success: true,
          message: `El usuario ${username} está aprobado.`
        };
      } else {
        return {
          success: false,
          message: `El usuario ${username} no está aprobado.`
        };
      }
    } catch (error) {
      console.error('Error al verificar el estado de aprobación del usuario:', error);
      throw {
        success: false,
        message: 'Error al verificar el estado de aprobación del usuario.'
      };
    }
  };

  export const isUserLocked = async (username) => {
    try {
      const user = await User.findOne({
        where: {
          username: username
        }
      });
  
      if (user && user.userstatus_idstatus === 'B') {
        return {
          success: true,
          message: `El usuario ${username} se encuentra bloqueado.`
        };
      } else {
        return {
          success: false,
          message: `El usuario ${username} no está bloqueado.`
        };
      }
    } catch (error) {
      console.error('Error al verificar el estado del usuario:', error);
      return {
        success: false,
        message: 'Error al verificar el estado del usuario.'
      };
    }
  };