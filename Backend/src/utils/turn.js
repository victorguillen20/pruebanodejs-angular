export const validateDescription = (description) => {
    const shiftPattern = /^[A-Z]{2}\d{4}$/;

    if (typeof description !== 'string') {
        return { isValid: false, message: 'La descripción del turno debe ser una cadena de texto' };
    }

    if (!shiftPattern.test(description)) {
        return { isValid: false, message: 'La descripción del turno debe tener 2 letras mayúsculas seguidas de 4 números' };
    }

    return { isValid: true, message: 'Descripción del turno válida' };
};
