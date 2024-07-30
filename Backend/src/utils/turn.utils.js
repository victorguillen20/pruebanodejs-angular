import { Turn } from "../models/turn/Turn.js";

export const generateDescription = async (prefix) => {
    let suffix = 1;
    let description;
    let exists = true;

    while (exists) {
        // Generar la descripción con el sufijo actual
        description = `${prefix}${suffix.toString().padStart(4, '0')}`;

        // Verificar si la descripción ya existe en la base de datos
        const turn = await Turn.findOne({ where: { description } });
        if (turn) {
            // Si la descripción existe, incrementar el sufijo
            suffix++;
        } else {
            // Si la descripción no existe, salir del bucle
            exists = false;
        }
    }

    return description;
};
