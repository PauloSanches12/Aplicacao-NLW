import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response){ //listar infomações por filtro: cidade, uf e items. Será pego as informações da Query.
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim())); // trim é para remover os espaçamentos entre os ids retornados

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city)).where('uf',String(uf))
            .distinct()
            .select('points.*');

        
        const serializedPoints = points.map(point => { //map percorre todos os itens que retorna do banco e podem ser alterados
            return {
                ...point,
                image_url: `http://192.168.1.6:3333/uploads/${point.image}`, // usado há crase para exibir o endereço de URL completo, assim podendo adicionar variaveis na linha.
            };
        })

        return response.json(serializedPoints);

    }

    async show(request: Request, response: Response){
        const { id } = request.params; // Buscando id de um ponto de coleta.

        const point = await knex('points').where('id', id).first(); //Busca o primeiro id igual ao parametro id do array.

        if (!point){ // Se não encontrar o point, retorna uma messagem de erro.
            return response.status(400).json({ message: "Point não encontrado." });
        }

        const serializedPoint = { 
            ...point,
            image_url: `http://192.168.1.6:3333/uploads/${point.image}`,
        }

        const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', '=', id).select('items.title'); // Irá retornar todos os items relacionados com o id da linha 6.

        return response.json({ point: serializedPoint, items }); // Se encontrar o point, retorna o ponto e os items relacionados com ele.
    }

    async create(request: Request, response: Response) { // Criar ponto de coleta da aplicação.
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        const trx = await knex.transaction(); // metodo para se a segunda inserção falhar, a primeira não vai executar. ocrre um rollback na primeira inserção. 
        const point = { // Informações a serem cadastradas no banco.
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        const insertedIds = await trx('points').insert(point); // Cadastrar as informações no banco.

        const point_id = insertedIds[0];

        const pointItems = items.split(',').map((item: string) => Number(item.trim())).map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })

        await trx('point_items').insert(pointItems);

        await trx.commit(); //Vai inserir as informações dentro do banco de dados, precisa por causa do transaction.

        return response.json({
            id: point_id,
            ...point,
        })
    }
}

export default PointsController;