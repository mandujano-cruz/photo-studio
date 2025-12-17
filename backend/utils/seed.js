const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const ClientInstance  = require('./supersaasClient'); 
const ADMIN_EMAIL = process.env.ROOT_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ROOT_ADMIN_PASSWORD;
const SALT_ROUNDS = 10;

async function seedAdminUser() {
    try {        
        console.log('--- Verificando la existencia del usuario administrador... ---');

        const existingUser = await User.findOne({ email: ADMIN_EMAIL });

        if (existingUser) {
            console.log(`Usuario administrador (${ADMIN_EMAIL}) ya existe. Saliendo de la siembra.`);
            return;
        }

        const hash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

        const newUser = await User.create({
            email: ADMIN_EMAIL,
            password: hash,
            full_name: 'Administrador Principal',
            role: 'admin', 
        });
        
        console.log(`👤 Usuario interno creado: ${newUser.email}`);

        const supersaasData = {
            full_name: newUser.full_name,
            name: newUser.email,
            password: ADMIN_PASSWORD,
            role: newUser.role === 'admin' ? 4 : 3,
        };

        const supersaasResponse = await ClientInstance.users.create(supersaasData);
        

        const tempUrl = supersaasResponse.replace('.json', '');
        const parts = tempUrl.split('/');
        const supersaasIdString = parts[parts.length - 1];
        const supersaasIdNumber = parseInt(supersaasIdString, 10);

        const finalUser = await User.findByIdAndUpdate(
            newUser._id,
            { $set: { supersaasId: supersaasIdNumber } },
            { new: true }
        );

        console.log(`Usuario administrador finalizado y sincronizado con SuperSaaS ID: ${finalUser.supersaasId}`);
        
    } catch (error) {
        console.error('ERROR DURANTE LA SIEMBRA DEL ADMINISTRADOR:', error);
    }
}

module.exports = seedAdminUser;