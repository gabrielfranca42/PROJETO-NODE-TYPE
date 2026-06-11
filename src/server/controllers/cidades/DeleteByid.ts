import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadeProvider } from '../../database/providers/cidade';
import { validation } from '../../shared/middleware';

export const deleteById = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<{}, {}, IParamsProps>, res: Response) => {
    const result = await CidadeProvider.deleteById(req.params.id);

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: 'O PARAMETRO "id" precisa ser informada '
            }
        });

    }

    const result = await CidadeProvider.deleteById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default: result.message
            }
        });
    }


    return res.status(StatusCodes.CREATED).json(result);
}



