import { User } from "../models/user/User.js";
import { Client } from "../models/client/Cliente.js";


export const getMarcadores = async (req, res) => {
    try {
        // Total de usuarios registrados
        const totalUsuarios = await User.count();

        // Total de usuarios por estado
        const totalActivos = await User.count({ where: { userstatus_idstatus: 'A' } });
        const totalBloqueados = await User.count({ where: { userstatus_idstatus: 'B' } });
        const totalInactivos = await User.count({ where: { userstatus_idstatus: 'I' } });

        // Total de clientes registrados
        const totalClientes = await Client.count();

        // Devolvemos los datos en un JSON
        res.json({
            totalusuarios: totalUsuarios,
            totalbloqueados: totalBloqueados,
            totalinactivos: totalInactivos,
            totalactivos: totalActivos,
            totalclientes: totalClientes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}