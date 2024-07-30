import { Client } from '../models/client/Cliente.js';
import { Contract } from '../models/contract/Contract.js';
import { Service } from '../models/service/Service.js';
import { Methodpayments } from '../models/payments/Methodpayment.js';
import { Statuscontract } from '../models/status/Statuscontract.js';
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

export const getAllClients = async (req, res) => {
    try {
      const clients = await Client.findAll({
        attributes: { exclude: ['idclient'] }
      });
  
      res.json(clients);
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Error del servidor' });
    }
  };

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
        return res.json({registerClient: false, message: 'Error del servidor'});
    }
    
}

export const registerContract = async (req, res) => {
    try {
        const { startdate, enddate, service_idservice, 
            statuscontract_idstatus, identification, 
            methodpayment_idmethodpayment } = req.body;
        
        // Buscar el idclient utilizando identification
        const client = await Client.findOne({
            where: { identification }
        });

        if (!client) {
            return res.json({ registerContract: false, message: 'Cliente no encontrado' });
        }

        // Crear el contrato utilizando el idclient obtenido
        const newContract = await Contract.create({
            startdate,
            enddate,
            service_idservice,
            statuscontract_idstatus,
            client_idclient: client.idclient,
            methodpayment_idmethodpayment
        });

        return res.json({ registerContract: true, message: 'Contrato registrado' });
    } catch (error) {
        console.error(error);
        return res.json({ registerContract: false, message: 'Error del servidor' });
    }
};

export const updateContract = async (req, res) => {
    try {
        const { startdate, enddate, service_idservice, methodpayment_idmethodpayment } = req.body;
        let value = 2
        // Verificar si el contrato existe
        const contract = await Contract.findByPk(idcontract);
        if (!contract) {
            return res.json({ registerContract: false, message: 'Contract not found' });
        }

        // Actualizar solo los campos que no sean nulos
        if (startdate !== undefined && startdate !== null) contract.startdate = startdate;
        if (enddate !== undefined && enddate !== null) contract.enddate = enddate;
        if (service_idservice !== undefined && service_idservice !== null) contract.service_idservice = service_idservice;
        contract.statuscontract_idstatus = 2;        
        if (methodpayment_idmethodpayment !== undefined && methodpayment_idmethodpayment !== null) contract.methodpayment_idmethodpayment = methodpayment_idmethodpayment;

        await contract.save();

        return res.json({ updateContract: true, message: 'Contrato Actualizado' });
    } catch (error) {
        console.error(error);
        return res.json({ updateContract: false, message: 'Error del servidor' });
    }
};

export const updateClient = async (req, res) => {
    const { name, lastname, identification, email, phonenumber, address, referenceaddress } = req.body;

    try {
        const client = await Client.findOne({ where: { identification } });

        if (!client) {
            return res.json({ updateClient: false, message: 'Cliente no encontrado' });
        }

        // Actualizar solo los campos que no sean nulos o indefinidos
        if (name !== undefined && name !== null) client.name = name;
        if (lastname !== undefined && lastname !== null) client.lastname = lastname;
        if (email !== undefined && email !== null) client.email = email;
        if (phonenumber !== undefined && phonenumber !== null) client.phonenumber = phonenumber;
        if (address !== undefined && address !== null) client.address = address;
        if (referenceaddress !== undefined && referenceaddress !== null) client.referenceaddress = referenceaddress;

        await client.save();

        return res.json({ updateClient: true, message: 'Cliente actualizado' });
    } catch (error) {
        console.error(error);
        return res.json({ updateClient: false, message: 'Error del servidor' });
    }
};

export const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll({
            attributes: ['idcontract', 'startdate', 'enddate'],
            include: [
                {
                    model: Service,
                    attributes: ['servicename', 'velocity', 'price'],
                    as: 'services'
                },
                {
                    model: Client,
                    attributes: ['identification'],
                    as: 'clients'
                },
                {
                    model: Methodpayments,
                    attributes: ['description'],
                    as: 'methodpayments'
                },
                {
                    model: Statuscontract,
                    attributes: ['description'],
                    as: 'statuscontracts'
                }
            ]
        });

        const formattedContracts = contracts.map(contract => {
            const { idcontract, startdate, enddate, services, clients, methodpayments, statuscontracts } = contract.toJSON();

            return {
                idcontract,
                startdate: startdate.toISOString().split('T')[0],
                enddate: enddate.toISOString().split('T')[0],
                servicename: services.servicename,
                velocity: services.velocity,
                price: services.price,
                identification: clients.identification,
                descriptionpago: methodpayments.description,
                descriptioncontrato: statuscontracts.description
            };
        });

        res.json(formattedContracts);
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error del servidor' });
    }
};