import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";
 
interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id' | 'cidadeId'> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().optional().max(150),
        cidadeId: yup.number().integer().optional().moreThan(0),
        nomeCompleto: yup.string().optional().min(3),
    })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    const result = await PessoasProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: result.message
            }
        });
    }


    const result = await PessoasProvider.getById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: result.message
            }
        });
    }



    return res.status(StatusCodes.OK).json(result);
};