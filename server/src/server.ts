import express from 'express';
import path from 'path'; //Lidar com caminhos, tornar padrão o caminho até o conteudo.
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express(); // Instanciando o express a uma variavel.

app.use(cors());

app.use(express.json()); // Fazer com que o express reconheça requisição http em formato json. 

app.use(routes); // Para poder usar as rotas do arquivo routes. 

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); //Rota para acessar arquivos estaticos da aplicação.

app.use(errors());

app.listen(3333); //Porta que vai ouvir a saida da aplicação.