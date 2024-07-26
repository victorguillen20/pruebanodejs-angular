import { Client } from '../models/client/Cliente.js';
import { existsClient, 
    validateIdentificationLength, 
    validateOnlyNumbers,
    validateAddressLength,
    validatePhoneNumber  } from '../utils/client.utils.js';

export const getClient = async (req, res) => {
    const {idclient} = req.body;

    const client = await Client.findByPk(idclient);

    res.json({ name: client.name,
        lastname: client.lastname,
        identification: client.identification,
        email: client.email,
        phonenumber: client.phonenumber,
        address: client.address,
        referenceaddress: client.referenceaddress
    });
}


export const registerClient = async (req, res) => {
    try {
        const {name, lastname, identification, email, phonenumber, address, referenceaddress} = req.body
        const clientExists = await existsClient(identification);
        if (clientExists.isValid) {
            return res.json({registerClient: false, message: 'El cliente ya se encuentra registrado'});
        }
        const identificacionLenght = validateIdentificationLength(identification);
        if (!identificacionLenght.isValid){
            return res.json({registerClient: false, message: identificacionLenght.message});
        }
        const soloNumeros = validateOnlyNumbers(identification);
        if (!soloNumeros.isValid) {
            return res.json({registerClient: false, message: soloNumeros.message});
        }
        const addressLength = validateAddressLength(address);
        if (!addressLength.isValid){
            return res.json({registerClient: false, message: addressLength.message});
        }
        const referenceLenght = validateAddressLength(referenceaddress);
        if (!referenceLenght.isValid) {
            return res.json({registerClient: false, message: referenceLenght.message});
        }
        const validaPhone = validatePhoneNumber(phonenumber);
        if (!validaPhone.isValid) {
            return res.json({registerClient: false, message: validaPhone.message});
        }
        const newClient = await Client.create({
            name, 
            lastname, 
            identification, 
            email, 
            phonenumber, 
            address, 
            referenceaddress
        })
        return res.json({registerClient: true, message: ''});
    } catch (error) {
        return res.json({registerClient: true, message: 'Error del servidor'});
    }
    
}