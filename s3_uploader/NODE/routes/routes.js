const models = require("../models");
const AWS = require("aws-sdk");
const ID = "AKIAIVF3XP6SXP2ULL3A";
const SECRET = "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";
const passwordHash = require('password-hash')
const BUCKET_NAME = "new-s3-uploader";
const regex = new RegExp('[^.]+$');
const moment = require('moment')
// var multer = require('multer')

async function createUser(req, res, next) {
  try {
    // const user = await models.UserT.create(req.body)
    const user = await models.UserT.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (user) {
        res.status(200).json({
            success: false,
            message: "EMAIL ALREADY EXISTS",
        });
    } else {
        let hashedPassword = passwordHash.generate(req.body.password);
        req.body.password = hashedPassword;

        const user = await models.UserT.create(req.body);
        if (user) {
            // const BUCKET_FOLDER =
            //   user.firstName + "_" + user.lastName + "_" + user.id;

            const s3 = new AWS.S3({
                accessKeyId: ID,
                secretAccessKey: SECRET,
            });



            s3.headBucket({ Bucket: BUCKET_NAME }, function (err, data) {
                if (err) {
                    s3.createBucket(params, function (err, data) {
                        if (err) console.log(err, err.stack);
                        else {
                            console.log("Bucket Created Successfully", data.Location);

                            var params = {
                                Bucket: BUCKET_NAME,
                                Key: BUCKET_FOLDER + "/",
                                ACL: "public-read",
                                Body: "body does not matter",
                            };
                            s3.upload(params, function (err, data) {
                                if (err) {
                                    console.log("Error creating the folder: ", err);
                                } else {
                                    console.log("Successfully created a folder on S3");
                                }
                            });
                        }
                    });
                } else {
                    console.log("Bucket Already Exists ");
                    var params = {
                        Bucket: BUCKET_NAME,
                        Key: BUCKET_FOLDER + "/",
                        ACL: "public-read",
                        Body: "body does not matter",
                    };
                    s3.upload(params, function (err, data) {
                        if (err) {
                            console.log("Error creating the folder: ", err);
                        } else {
                            console.log("Successfully created a folder on S3");
                        }
                    });
                }
            });

            res.status(200).json({
                success: true,
                data: user,
                message: "SUCCESSFULLY SIGN-UP",
            });
        }

        res.status(200).json({
            user,
        });
    }
} catch (error) {
    res.status(404);
    next(error);
}
}

async function loggedIn(req, res, next) {
  try {

    const user = await models.UserT.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (user) {
        const passwordMatched = passwordHash.verify(
            req.body.password,
            user.password
        );
        console.log(passwordMatched);
        if (passwordMatched) {
            user.update({ isLoggedIn: true });

            res.status(200).json({
                // user,
                message: "SUCCESSFULLY LOGGED-IN",
                success: true,
                data: user,
            });
        } else {
            res.status(200).json({
                success: false,
                message: "PASSWORD INCORRECT",
            });
        }
    } else {
        res.status(200).json({
            success: false,
            message: "EMAIL NOT EXIST",
        });
    }
} catch (error) {
    res.status(404);
    next(error);
}
}

async function loggedOut(req, res, next) {
  try {
        const user = await models.UserT.findOne({
            where: {
                email: req.body.email,
            },
        });

        user.update({ isLoggedIn: false });
        res.status(200).json({
            success: true,
            message: "SUCCESSFULLY SIGN-OUT",
        });
    } catch (error) {
        res.status(404);
        next(error);
    }
}

async function uploadS3(req, res, next) {
  try {
    console.log('jjj')
    const user = await models.UserT.findOne({
        where:
        {
            email: req.body.email
        }
    })
    let imageFile = req.files.file;

    const BUCKET_FOLDER = user.firstName + "_" + user.lastName + "_" + user.id;

    imageFile.mv(`${__dirname}/public/${user.firstName + user.id + imageFile.name}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET,
        });

        var params = {
            Bucket: BUCKET_NAME,
            Key: BUCKET_FOLDER + "/" + imageFile.name,
            Body: imageFile.data,
            ACL: "public-read",
        };
        s3.upload(params, function (err, data) {
            if (err) {
                console.log("Error creating the folder: ", err);
            } else {
                console.log("Successfully UPLOADED file on S3");
                loc = data.Location
                dName = data.key
                extension = dName.match(regex);
                // console.log(extension)
                if (extension === 'png' || 'jpeg' || 'jpg'){
                    type = 'image'
                } 
                else if (extension === 'doc') {
                    type = 'doc'
                }
                else {
                    type = 'pdf'
                }
          
                var params = {
                    Bucket: BUCKET_NAME,
                    Delimiter: '/',
                    Prefix: BUCKET_FOLDER + '/'
                };
                s3.listObjects(params, async function (err, data) {
                    if (err) {
                        return 'There was an error viewing your album: ' + err.message
                    } else {
                       
                        data.Contents.forEach(async function (obj, index) {
                            if (obj.Key === dName) {

                                const uData =  models.Data.create({
                                    fName: obj.Key.replace(BUCKET_FOLDER + '/', ""),
                                    fType: type,
                                    fSize: (obj.Size / 1000) + ' KB',
                                    file: loc,
                                    fDate: moment(obj.LastModified).format('L'),
                                    email: user.email,


                                })                         
                            
                                res.status(200).json({
                                    success: true,
                                    message: "SUCCESSFULLY UPLOADED",
                                    
                                });
                            }
                              
                        })  
                        res.status(200).json({
                            success: true,
                            message: "SUCCESSFULLY UPLOADED",
                            
                        });                       
                    }
                })

            }
        });
    });
}
catch (error) {
    res.status(404);
    next(error);
}
  }


async function getData(req,res,next){
  const data = await models.Data.findAll({
    where:
    {
        email: req.query.email
    }
})

res.status(200).json({
    success:true,
    data
})
}


async function deleteData(req,res,next){
  console.log('ENTER DELETE')
  const user = await models.UserT.findOne({
      where:{
      email:req.body.email
  }})

  let delFile=req.body.delete

  BUCKET_FOLDER = user.firstName + "_" + user.lastName + "_" + user.id;

  const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET,
  });

  var params = {
      Bucket: BUCKET_NAME,
      Delimiter: '/',
      Prefix: BUCKET_FOLDER + '/'
  };

 
  s3.listObjects(params, async function (err, data) {
      console.log("LISTOBJECTS")
      if (err) {
          console.log('There was an error viewing your album: ' + err.message)
          return 'There was an error viewing your album: ' + err.message
      } else {
          data.Contents.forEach(async function (obj, index) {
              console.log(obj)
              if (obj.Key === BUCKET_FOLDER+'/'+delFile) {

                  var params = {  Bucket: BUCKET_NAME, Key: obj.Key };

                  s3.deleteObject(params, function(err, data) {
                      console.log("DELETEOBJECTS")
                  if (err) console.log(err, err.stack);  
                  else     console.log('DELETeD');                
                  });  
                  
                  const del = await models.Data.destroy({
                      where:
                      {
                          email:req.body.email,
                          fName:delFile

                      }
                  })
              
                  res.status(200).json({
                      success: true,
                      message: "SUCCESSFULLY DELETED",
                      
                  });
              }
                
          })  
            
      }
  })
}



module.exports = {
  createUser,
  loggedIn,
  loggedOut,
  uploadS3,
  getData,
  deleteData
};