import { User } from '../models/user/User.js';
import { Rol } from '../models/rol/Rol.js';
import { Userstatus } from '../models/status/Userstatus.js';

import { findRoleById, 
    validateUsername,
    findUserByUsername,
    validatePassword,
    getUserIdByUsername
 } from '../utils/user.utils.js';


export const createUser = async (req, res) => {
    const { username, email, password, rol_idrol, creationdate, usercreate} = req.body;

    try {
        const roleCheck = await findRoleById(rol_idrol);
        if (!roleCheck.success) {
            return res.status(400).json({success: false, message: 'Error al crear el usuario' });
        }
        const validauser = validateUsername(username);
        if (!validauser.isValid) {
            return res.status(400).json({success: validauser.isValid, message: validauser.message});
        }
        const userExists = findUserByUsername();
        if (userExists.success) {
            return res.status(401).json({success: false, message: 'Usuario existente.'});
        }
        const passvalid = validatePassword(password);
        if (!passvalid) {
            return res.status(401).json({success: false, message: passvalid.message});
        }
        const newUser = await User.create({
            username,
            email,
            password,
            rol_idrol,
            creationdate,
            usercreate,                                    
        });

        return res.status(201).json({ success: true, message: 'Usuario creado exitosamente'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
};

export const getUserbyUsername = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({
            where: { username },
            include: [
                {
                    model: Rol,
                    as: 'rols',
                    attributes: ['rolname']
                },
                {
                    model: Userstatus,
                    as: 'userstatuses', 
                    attributes: ['description']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            email: user.email,
            rolname: user.rols.rolname,
            userstatus_description: user.userstatuses.description 
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getidbyUsername = async (req, res) => {
    const { username } = req.body;

    try {
        const userid = await getUserIdByUsername(username);
        return res.status(200).json({ userid: userid });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const getUsersUnAproval = async (req, res) => {
    const { usercreate } = req.body;

    try {
        const users = await User.findAll({
            where: {
                usercreate: usercreate,
                userapproval: null
            },
            attributes: ['username', 'email', 'creationdate']
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const formattedUsers = users.map(user => ({
            username: user.username,
            email: user.email,
            creationdate: user.creationdate.toISOString().split('T')[0]
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
}