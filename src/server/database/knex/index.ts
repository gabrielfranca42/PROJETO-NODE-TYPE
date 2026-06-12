import {knex} from 'knex';
import 'dotenv/config';
import pg from 'pg';

import {development, production, test  }  from './Environment';

if (process.env.NODE_ENV === 'production') {
   pg.types.setTypeParser(20, 'text', (value) => Number(value));
}

const getEnvironment = () =>{
    switch (process.env.NODE_ENV) {
        case 'production':
            return production;
        case 'test':
            return test;
        default:
            return development;
    }
};

const environment = getEnvironment();

export const KnexInstance = knex(environment);