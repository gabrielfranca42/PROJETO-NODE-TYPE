import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadeProvider } from "../../database/providers/cidade";
import { validation } from "../../shared/middleware";

interface IParamsProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),
    })),
}));

export const getById = async (req: Request<{}, {}, {}, IParamsProps>, res: Response) => {
    const result = await CidadeProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};
