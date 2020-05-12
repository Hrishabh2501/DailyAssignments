const models = require('../../models')
const passwordHash = require('password-hash')


async function loggedIn(req, res, next) {
    console.log(req.body.email, 'ENTER LOGIN')
    try {
        const user = await models.Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            const passwordMatched = passwordHash.verify(
                req.body.password,
                user.password
            );

            if (passwordMatched) {

                res.status(200).json({
                    // user,
                    message: "SUCCESSFULLY LOGGED-IN",
                    success: true,
                    data: user,
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "PASSWORD INCORRECT",
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: "EMAIL NOT EXIST",
            });
        }



    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = { loggedIn }