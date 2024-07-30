import { Turn } from "../models/turn/Turn.js";
import { generateDescription } from "../utils/turn.utils.js";
import { getUserIdByUsername } from "../utils/user.utils.js";
import { Cash } from "../models/cash/Cash.js";

export const TurnRegister = async (req, res) => {
    const { description, date, cash_cashid, username } = req.body;

    try {     
        const generarturno = await generateDescription(description);
        const usergestorid = await getUserIdByUsername(username);
        const newTurn = await Turn.create({            
            description: generarturno,
            date,
            cash_cashid,
            usergestorid
        });

        return res.status(201).json({ success: true, message: 'Turno Generado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const getTotalTurns = async (req, res) => {
    try {
        const totalTurns = await Turn.count();

        return res.status(200).json({ total: totalTurns });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const getTotalTurnsByGestor = async (req, res) => {
    const { usergestorid } = req.body;

    try {
        const totalTurns = await Turn.count({
            where: { usergestorid }
        });

        return res.status(200).json({ total: totalTurns });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const getAllTurns = async (req, res) => {
    try {
        const turns = await Turn.findAll({
            attributes: ['description', 'date'],
            include: [{
                model: Cash,
                as: 'cash',
                attributes: ['cashdescription']
            }]
        });
        const formattedTurns = turns.map(turn => ({
            description: turn.description,
            date: turn.date.toISOString().split('T')[0], // Extraer solo la parte de la fecha
            cashdescription: turn.cash.cashdescription // Extraer la descripción del cash
        }));

        return res.status(200).json(formattedTurns);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

