const models = require('../../models')

async function deleteUser(req, res, next) {
    console.log('ENTER DELETE',req.params.uid)
    try {
        const user = await models.Users.destroy({
            where: {
                id: req.params.uid
            }
        })
        res.status(200).json({
            success: true,
            message: "USER SUCCEFULLY DELETED"
        })

    }
    catch (error) {
        next(error)
        res.status(500)
    }
}

module.exports = { deleteUser }