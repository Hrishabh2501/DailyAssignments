const models = require('../../models')

async function getUser(req, res, next) {
    console.log('ENTER FETCH',req.params.uid)
    try {
        const user = await models.Users.findOne({
            where: {
                id: req.params.uid
            }
        })
        res.status(200).json({
            user,
            success: true,
            message: "USER DISPLAY"
        })

    }
    catch (error) {
        next(error)
        res.status(500)
    }
}

module.exports = { getUser }