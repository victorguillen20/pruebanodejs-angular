import { User } from '../models/user/User.js';
import { Cash } from '../models/cash/Cash.js';
import { Usercash } from '../models/user/Usercash.js';
import { Userstatus } from '../models/status/Userstatus.js';
import { Rol } from '../models/rol/Rol.js';
import { Op } from 'sequelize';


import { findRoleById, 
    validateUsername,
    findUserByUsername,
    validatePassword,
    getUsernameById
 } from '../utils/user.utils.js';


export const createUser = async (req, res) => {
    const { username, email, password, rol_idrol, creationdate, usercreate, userapproval, dateapproval, userstatus_idstatus } = req.body;

    try {
        const userExists = await findUserByUsername(username);
        if (userExists.success) {
            return res.status(401).json({success: false, message: 'Usuario existente.'});
        }
        const validauser = validateUsername(username);
        if (!validauser.isValid) {
            return res.status(400).json({success: false, message: validauser.message});
        } 
        const passvalid = validatePassword(password);
        if (!passvalid.success) {
            return res.status(401).json({success: false, message: passvalid.message});
        }         
        
        const newUser = await User.create({
            username,
            email,
            password,
            rol_idrol,
            creationdate,
            usercreate,
            userapproval,
            dateapproval,
            userstatus_idstatus
        });

        return res.status(201).json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
};

export const userAproved = async (req, res) => {
    const { username, userapproval, dateapproval, userstatus_idstatus } = req.body;

    try {
        const [updated] = await User.update(
            {
                userapproval,
                dateapproval,
                userstatus_idstatus
            },
            {
                where: { username }
            }
        );

        if (updated) {
            return res.status(200).json({ success: true, message: 'Usuario aprobado' });
        }

        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const cashValues = async (req, res) => {
    try {
        const cashes = await Cash.findAll({
            include: [{
                model: Usercash,
                as: 'usercashes',
                include: [{
                    model: User,
                    as: 'users'
                }]
            }]
        });

        // Mapea los datos y luego los aplana en un solo arreglo
        const values = (await Promise.all(cashes.map(async (cash) => {
            return await Promise.all(cash.usercashes.map(async (uc) => {
                const user = uc.users;
                const usercreated = await getUsernameById(user.usercreate);
                return {
                    cashdescription: cash.cashdescription,
                    username: user.username,
                    creationdate: user.creationdate.toISOString().split('T')[0],
                    usercreate: usercreated
                };
            }));
        }))).flat();

        return res.status(200).json({ values });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const UserdatasForAdmin = async (req, res) => {
    try {
        // Encuentra todos los usuarios con sus roles y estados asociados, excluyendo a los administradores
        const users = await User.findAll({
            where: {
                rol_idrol: { [Op.ne]: 1 } // Excluir rol_idrol = 1 (Administrador)
            },
            include: [
                {
                    model: Userstatus,
                    as: 'userstatuses', // alias utilizado para la relación
                    attributes: ['description'] // solo necesitamos la descripción del estado
                },
                {
                    model: Rol,
                    as: 'rols', // alias utilizado para la relación
                    attributes: ['rolname'] // solo necesitamos el nombre del rol
                }
            ],
            attributes: ['username', 'email', 'creationdate'] // atributos del usuario que necesitamos
        });

        // Mapeamos los datos para estructurar la respuesta
        const userData = users.map(user => ({
            username: user.username,
            email: user.email,
            creationdate: user.creationdate.toISOString().split('T')[0], // formato de fecha simplificado
            rolname: user.rols ? user.rols.rolname : 'Rol no definido',
            description: user.userstatuses ? user.userstatuses.description : 'Estado no definido'
        }));

        return res.status(200).json({ userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const UpdateUsers = async (req, res) => {
    const { username, email, userstatus_idstatus } = req.body;

    try {
        // Buscar al usuario por su username
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Actualizar el email si se proporciona
        if (email !== undefined && email !== null) {
            user.email = email;
        }

        // Actualizar el userstatus_idstatus si se proporciona
        if (userstatus_idstatus !== undefined && userstatus_idstatus !== null) {
            user.userstatus_idstatus = userstatus_idstatus;
        }

        // Guardar los cambios en la base de datos
        await user.save();

        return res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

export const getUnapprovedUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                userapproval: null
            },
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
            ],
            attributes: ['username', 'email', 'creationdate']
        });

        const unapprovedUsers = users.map(user => ({
            username: user.username,
            email: user.email,
            creationdate: user.creationdate.toISOString().split('T')[0],
            rolname: user.rols ? user.rols.rolname : 'Rol no definido',
            description: user.userstatuses ? user.userstatuses.description : 'Estado no definido'
        }));

        return res.status(200).json(unapprovedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

