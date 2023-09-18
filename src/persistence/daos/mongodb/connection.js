import mongoose from 'mongoose';
import config from '../../../../config.js';

try {
    await mongoose.connect(config.MONGO_ATLAS_URL);
    console.log('Conectado a la base de datos de MongoDb!');
} catch (error) {
    console.log(error);
}