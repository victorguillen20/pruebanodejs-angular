import { Client } from "../models/client/Cliente.js";

export const existsClient = async (identificacion) => {
    try {
        const client = await Client.findOne({
            where: {identification: identificacion},
            rejectOnEmpty: true
        });
        return { isValid: client, message: 'El Cliente ya se encuentra regitrado'} ;        
    } catch (error) {
        return { isValid: false, message: 'Error del servidor'} ;
    }
};

export const validateIdentificationLength = (identificacion) => {
    // Validar que la identificación tenga entre 10 y 13 dígitos
    if (/^\d{10,13}$/.test(identificacion)) {
        return { isValid: true, message: 'Identificación válida.'} ;
    } else {
        return { isValid: false, message: 'La identificación debe tener entre 10 y 13 dígitos.'};
    }
};

export const validateOnlyNumbers = (identificacion) => {
    // Verifica si la identificación solo contiene números
    if (/^\d+$/.test(identificacion)) {
        return { isValid: true, message: 'Identificación contiene solo números.' };
    } else {
        return { isValid: false, message: 'La identificación debe contener solo números.' };
    }
};


export const validateAddressLength = (direccion) => {
    const minLength = 20;
    const maxLength = 100;

    if (direccion.length >= minLength && direccion.length <= maxLength) {
        return { isValid: true, message: 'Dirección válida.' };
    } else {
        return { isValid: false, message: `Debe tener entre ${minLength} y ${maxLength} caracteres.` };
    }
};


export const validatePhoneNumber = (phoneNumber) => {
    // Expresión regular para validar el número de teléfono
    const phoneRegex = /^09\d{8,}$/;

    if (phoneRegex.test(phoneNumber)) {
        return { isValid: true, message: 'Número de teléfono válido.' };
    } else {
        return { isValid: false, message: 'El número de teléfono debe comenzar con "09", contener solo dígitos y tener al menos 10 dígitos.' };
    }
};



