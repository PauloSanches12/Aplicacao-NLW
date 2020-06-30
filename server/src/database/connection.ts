import knex from 'knex'; // Para utilizar comandos via javascript para interação com banco de dados:
import path from 'path'; // já vem como padrão no node, padroniza o caminho para acessar algo.

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default connection;
