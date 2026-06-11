import * as create from "./Creacte";
import * as getById from "./GetByld";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateByind";
import * as deleteById from "./DeleteByid";

export const CidadesController = {
    ...create,
    ...getById,
    ...getAll,
    ...updateById,
    ...deleteById
};