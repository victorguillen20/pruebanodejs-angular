import { Rol } from '../models/rol/Rol.js';

export const findRoleById = async (rol_idrol) => {
    try {
        const rol = await Rol.findByPk(rol_idrol);
        if (!rol) {
            return { success: false, message: 'Rol no encontrado' };
        }
        return { success: true, rol };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al buscar el rol' };
    }
};

export const validateUsername = (username) => {
    const minLength = 8;
    const maxLength = 20;

    if (typeof username !== 'string') {
        return { isValid: false, message: 'El nombre de usuario debe ser una cadena de texto' };
    }

    if (username.length < minLength || username.length > maxLength) {
        return { isValid: false, message: `El nombre de usuario debe tener entre ${minLength} y ${maxLength} caracteres` };
    }

    return { isValid: true, message: 'Nombre de usuario válido' };
};

