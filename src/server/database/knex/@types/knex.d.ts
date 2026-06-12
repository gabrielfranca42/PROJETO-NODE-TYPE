import { IPessoa, ICidade, IUsuario } from "../../models";

declare module 'knex' {  
    export interface Tables {
        pessoas: IPessoa;
        cidades: ICidade;
        usuarios: IUsuario;
    }
}
    