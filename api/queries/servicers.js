const promise = require('bluebird');

const options = {
    // Initialization Options
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://'+ process.env.DB_USER + ':' + process.env.DB_PW + '@' + process.env.SERVER_HOST + ':5432/' + process.env.MAIN_DB;
const db = pgp(connectionString);

function getAllServicers(req, res, next) {
    db.any('SELECT * FROM public.servicers')
        .then(function (data) {
            res.status(200)
                .json({
                    count: data.length,
                    data: data,
                    message: 'GET All servicers'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleServicer(req, res, next) {
    const servicerID = parseInt(req.params.id);
    db.one('SELECT * FROM public.servicers WHERE servicer_id = $1', servicerID)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data,
                    message: 'GET Single servicer'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllServicers: getAllServicers,
    getSingleServicer: getSingleServicer
};