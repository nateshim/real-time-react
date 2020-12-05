const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DATABASE,
    password: process.env.POOL_PASSWORD,
    port: process.env.POOL_PORT,
});

const getUser = (body) => {
    return new Promise(function(resolve, reject) {
        const {email, password} = body;
        pool.query('SELECT * FROM users WHERE email = ($1) AND encryptedpassword = ($2)', [email, password], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
const getUsers = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        const {username, email, password } = body;
        pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.rows.length !== 0) {
                resolve('username')
            } else {
                pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    if (results.rows.length !== 0) {
                        resolve('email')
                    } else {
                        pool.query('INSERT INTO users (username, email, encryptedpassword) VALUES ($1, $2, $3)', [username, email, password], (error, results) => {
                            if (error) {
                                reject(error)
                            }
                            resolve(results.rows[0])
                        })
                    }
                })
            }
        })
    })
}

const deleteUser = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`User deleted with id: ${id}`)
        })
    })
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
}