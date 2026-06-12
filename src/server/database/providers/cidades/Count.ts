import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const count = async (filter: string = ''): Promise<number | Error> => {
    try {
        const result = await Knex (ETableNames.cidades)
            .where('nome', 'ilike', `%${filter}%`)
            .count<[{ count: number }]>('* as count');
            
        if  (Numbe.isInteger(Number(count))) return Numbe(count);


        return new Error('Erro ao contar registros.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao contar registros.');
    }
            
            
            