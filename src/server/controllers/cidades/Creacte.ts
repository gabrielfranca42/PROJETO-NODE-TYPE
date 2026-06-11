import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


import { CidadeProvider } from '../../database/providers/cidade';
import { validation } from '../../shared/middleware';


interface IBodyProps extends Omit<ICidade, 'id'> { }

export const createValidation = vallidation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    })),
}));



export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    const result = await CidadeProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default:
                    result.message
            }
        });

    }


    return res.status(StatusCodes.CREATED).json(result);
}

