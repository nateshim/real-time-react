const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DATABASE,
    password: process.env.POOL_PASSWORD,
    port: process.env.POOL_PORT,
});
const getUserFromID = (body) => {
    return new Promise(function(resolve, reject) {
        const {user_id} = body;
        pool.query('SELECT * FROM users WHERE user_id = ($1)', [user_id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
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
        const spriteid = 0;
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
                        pool.query('INSERT INTO users (username, email, encryptedpassword, spriteid) VALUES ($1, $2, $3, $4)', [username, email, password, spriteid], (error, results) => {
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

module.exports = {
    getUserFromID,
    getUser,
    getUsers,
    createUser,
}