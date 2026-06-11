import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadeProvider } from "../../database/providers/cidade";
import { validation } from "../../shared/middleware";

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    // CORREÇÃO: Incluído o req.query.id que estava faltando.
    // Também definimos valores padrão caso page ou limit não sejam enviados.
    const { page = 1, limit = 7, filter = '', id = 0 } = req.query;

    // Passando os parâmetros na ordem correta que o seu Provider espera
    // (Ajuste a ordem dos argumentos conforme a assinatura real do seu CidadeProvider.getAll)
    const result = await CidadeProvider.getAll(Number(page), Number(limit), filter, Number(id));

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};