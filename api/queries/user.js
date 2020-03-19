const promise = require('bluebird');
const bcrypt = require('bcrypt');
const validator = require("email-validator");

const options = {
    // Initialization Options
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PW + '@' + process.env.SERVER_HOST + ':5432/' + process.env.MAIN_DB;
const db = pgp(connectionString);

function signUp(req, res, next) {
    db.any('SELECT * FROM public.users WHERE email = $1', req.body.email)
        .then(function (data) {
            if (data.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else if (!validator.validate(req.body.email)) {
                return res.status(400).json({
                    message: 'Bad email provided'
                })
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        req.body.password = hash;
                        db.none('INSERT INTO public.users(email, password)' +
                            'VALUES(${email}, ${password})',
                            req.body)
                            .then(function () {
                                res.status(201).json({
                                    status: 'success',
                                    message: 'Created a new user'
                                });
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    }
                });
            }
        })
}

function removeUser(req, res, next) {
    const userID = parseInt(req.params.userId);
    db.result('DELETE FROM public.users WHERE id = $1', userID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} user`
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    signUp: signUp,
    removeUser: removeUser
};