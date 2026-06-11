import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
    nomeCompleto?: string;
}
export const getAllValidation = validation(get => ({
    query: get<IQueryProps>(yup.object().shape({
        page: yup.number().integer().optional().moreThan(0),
        limit: yup.number().integer().optional().moreThan(0),
        filter: yup.string().optional(),
        nomeCompleto: yup.string().optional(),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const { page = 1, limit = 7, filter = '', nomeCompleto = '' } = req.query;

    const result = await PessoasProvider.getAll(Number(page), Number(limit), filter, nomeCompleto);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};
