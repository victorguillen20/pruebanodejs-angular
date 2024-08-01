import { Rol } from '../models/rol/Rol.js';
import { User } from '../models/user/User.js';

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

export const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            return { success: false, message: 'No existe el usuario' };
        }
        return { success: true, user };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error del servidor' };
    }
};

export const validateUsername = (username) => {
    const minLength = 8;
    const maxLength = 20;
    const hasLetter = /[a-zA-Z]/;
    const hasNumber = /\d/;
    const noSpecialChars = /^[a-zA-Z0-9]*$/;

    if (typeof username !== 'string') {
        return { isValid: false, message: 'El nombre de usuario debe ser una cadena de texto' };
    }

    if (username.length < minLength || username.length > maxLength) {
        return { isValid: false, message: `El nombre de usuario debe tener entre ${minLength} y ${maxLength} caracteres` };
    }

    if (!hasLetter.test(username)) {
        return { isValid: false, message: 'El nombre de usuario debe contener al menos una letra' };
    }

    if (!hasNumber.test(username)) {
        return { isValid: false, message: 'El nombre de usuario debe contener al menos un número' };
    }

    if (!noSpecialChars.test(username)) {
        return { isValid: false, message: 'El nombre de usuario no debe contener caracteres especiales' };
    }

    return { isValid: true, message: 'Nombre de usuario válido' };
};


export const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 30;
    const hasNumber = /\d/;
    const hasUppercase = /[A-Z]/;

    if (password.length < minLength || password.length > maxLength) {
        return { success: false, message: 'La contraseña debe tener entre 8 y 30 caracteres.' };
    }
    if (!hasNumber.test(password)) {
        return { success: false, message: 'La contraseña debe tener al menos un número.' };
    }
    if (!hasUppercase.test(password)) {
        return { success: false, message: 'La contraseña debe tener al menos una letra mayúscula.' };
    }

    return { success: true, message: 'Contraseña válida.' };
};

export const getUsernameById = async (iduser) => {
    try {
        const user = await User.findOne({
            where: { iduser },
            attributes: ['username']
        });

        return user ? user.username : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserIdByUsername = async (username) => {
    try {
        const user = await User.findOne({
            where: { username }
        });
        
        if (user) {
            return user.iduser;
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error al obtener el ID de usuario:', error);
        throw error; 
    }
};

export async function updatePassword(username, email, newPassword) {
    try {
        const user = await User.findOne({
            where: {
                username: username,
                email: email
            }
        });

        if (!user) {
            return {
                success: false,
                message: 'Usuario no encontrado con ese nombre de usuario y correo electrónico.'
            };
        }

        await User.update(
            { password: newPassword },
            { where: { iduser: user.iduser } }
        );

        return {
            success: true,
            message: 'Contraseña actualizada exitosamente.'
        };
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        return {
            success: false,
            message: 'Hubo un error al actualizar la contraseña. Por favor, inténtalo de nuevo.'
        };
    }
};

export async function checkUserExistence(username, email) {
    try {
        // Buscar el usuario por username y email
        const user = await User.findOne({
            where: {
                username: username,
                email: email
            }
        });

        // Verificar si el usuario existe
        if (user) {
            return {
                success: true,
                message: 'El usuario existe en la base de datos.'
            };
        } else {
            return {
                success: false,
                message: 'El usuario no existe en la base de datos.'
            };
        }
    } catch (error) {
        console.error('Error al comprobar la existencia del usuario:', error);
        return {
            success: false,
            message: 'Hubo un error al verificar la existencia del usuario. Por favor, inténtalo de nuevo.'
        };
    }
}

