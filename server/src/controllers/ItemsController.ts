import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index (request: Request, response: Response) { //Criação de uma rota de listagem de itens do banco.
        const items = await knex('items').select('*'); //Sempre que for fazer uma conexão com o banco usar await.
        
        const serializedItems = items.map(item =>{ //map percorre todos os itens que retorna do banco e podem ser alterados
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.6:3333/uploads/${item.image}`, // usado há crase para exibir o endereço de URL completo, assim podendo adicionar variaveis na linha.
            };
        }) 
    
        return response.json(serializedItems);
    }
}

export default ItemsController;