
module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'brainstation',
        database: 'capstone-project',
        charset: "utf8"
    },
    migrations: {
        tableName: 'migrations'
    }
}