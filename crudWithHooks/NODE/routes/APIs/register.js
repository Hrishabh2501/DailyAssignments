const models = require('../../models')
const passwordHash = require('password-hash')

async function createUser(req, res, next) {
    try {
        const user = await models.Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            let hashedPassword = passwordHash.generate(req.body.password);
            req.body.password = hashedPassword;

            const user = await models.Users.create(req.body);

            res.status(200).json({
                success: true,
                data: user,
                message: "USER SUCCESSFULLY REGISTERED"
            })
        }
        else {

            res.status(401).json({
                success: false,
                message: "EMAIL ALREADY EXISTS",
            });
        }
    }
    catch (error) {
        res.status(500);
        next(error)
    }
}

module.exports = { createUser }