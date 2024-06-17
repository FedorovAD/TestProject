import pgPromise from 'pg-promise'

export const dbClient = pgPromise()({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "showcase_test"
})

