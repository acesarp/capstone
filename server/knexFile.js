
module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'restclient',
        password: 'Vancouver2020',
        database: 'capstone-project-knex',
        charset: "utf8"
    },
    migrations: {
        tableName: 'migrations_knex'
    }
}