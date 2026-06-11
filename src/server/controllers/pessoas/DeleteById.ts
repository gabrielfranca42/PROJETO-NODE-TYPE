import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps {
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamsProps, {}, IPessoa>, res: Response) => {
    const result = await PessoasProvider.deleteById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};