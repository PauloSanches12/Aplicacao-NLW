import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController'; // Importação da classe com o metodo de criação de pontos de coleta. 
import ItemsController from './controllers/ItemsController'; // Importação da classe com o metodo de listagem informações.

const routes = express.Router();
const upload = multer(multerConfig); // Fazer upload de imagem.

const pointsController = new PointsController(); // Instanciar classe de PointsController.
const itemsController = new ItemsController(); 

routes.get('/items', itemsController.index ); // Metodo dentro da classe para listar as informações criadas.
routes.post('/points', upload.single('image'), celebrate({body: Joi.object().keys({ // celebrate é para fazer a validação dos campos.
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required(),
})}, {
    abortEarly: false
}) ,pointsController.create); // Metodo dentro da classe para criar os pontos de coleta.
routes.get('/points/:id', pointsController.show); //Metodo dentro da classe para listar um item especifico.
routes.get('/points', pointsController.index); //Metodo para listar varias informações.

export default routes;