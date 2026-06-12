import knex, { Knex } from 'knex';
import path from 'path';

export const  deleloment:Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, 'seeds'),
    },
    pool: {
        afterCreate: (conn, cb) => {
            conn.run('PRAGMA foreign_keys = ON');
            cb();
        }
    }
}