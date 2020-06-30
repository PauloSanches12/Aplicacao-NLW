import Knex from 'knex'; // Importa o knex para utilizar a inserção por meio de javascript.

export async function seed(knex: Knex) { //Insere informações no banco.
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos Eletônicos', image: 'eletronicos.svg' },
        { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { title: 'Óleo de Cozinha', image: 'oleo.svg' },
    ]);
}

// Utilizado pra que o banco de dados ja tenha algumas informções padrão já cadastradas.  