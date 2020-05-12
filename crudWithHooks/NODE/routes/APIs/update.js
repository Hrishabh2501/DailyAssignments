const models=require('../../models')

async function updateUser(req,res,next)
{
    console.log('ENTER UPDATE',req.params.uid,req.body.changeFName)
    try {
        const user = await models.Users.findOne({
            where:{
                id:req.params.uid
            }
        })
        
        if(user)
        {
            const change = await models.Users.update({ firstName: req.body.changeFName }, {
                where: {
                  firstName: user.firstName
                }
              })
        }

        res.status(200).json({
            user,
            success:true,
            message:"FIRSTNAME SUCCESSFULLY UPDATED"
        })

    } catch (error) {
        res.status(500)
        next(error)
    }
}

module.exports = {updateUser}