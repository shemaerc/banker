import users from '../db/users';
//import idgenerete from 'idGen';
import jwt from 'jsonwebtoken';

function idGeneretor(dbInf)
    {
    var count=0;
    dbInf.map((dbSpecificInfo, index) => {
      count=dbSpecificInfo.id+1;
    }); return count;
  }

 module.exports= class User {
    static getUsers(req, res) {
        return res.status(200).json({
            users,
        });
    }
    static getUser(req, res) {
      const id = parseInt(req.params.id);
    
        users.forEach((user) => {
          if (user.id === id) {
            return res.status(200).json({
                user,

            });
          }
        });
        return id;
      }

    static register(req, res) {
        const User1= req.body;
        const email=req.body.email;
        let error = '';
        users.forEach((newUser, key) => {
            if (newUser.email === User1.email) {
                error = 'user already exists';
            }
        });
      
       if (!req.body.firstName) {
          return res.status(400).send({
            success: 'false',
            message: 'firstName is required',
          });
        } else if (!req.body.lastName) {
          return res.status(400).send({
            success: 'false',
            message: 'lastName is required',
          });
        } else if(!req.body.email){
          return res.status(400).send({
            success: 'false',
            message: 'Email is required',
          });
        }else if (!req.body.password) {
          return res.status(400).send({
            success: 'false',
            message: 'password is required',
          });
        } else if (!req.body.type) {
          return res.status(400).send({
            success: 'false',
            message: 'user type is required',
          });
        } else if (req.body.type === "staff") {
                  if(!req.body.isAdmin){
                             return res.status(400).send({
                              success: 'false',
                             message: 'is admin or cachier feel it please',
                          });
                        }
        }
        if (error) {
            return res.status(200).json({
                error,
            });
        }
  var token = jwt.sign({email},'mySecrete',{
          expiresIn:86400
       });
       if(User1.type === 'client'){
       const User= {
          token:token,  
          id: idGeneretor(users),
          email: User1.email,
          firstName: User1.firstName,
          lastName: User1.lastName,
          password: User1.password,
          type: User1.type,
        };
        users.push(User);
        return res.status(200).json({
            User,
        });
      }else{
        const User= {
          token:token,  
          id: idGeneretor(users),
          email: User1.email,
          firstName: User1.firstName,
          lastName: User1.lastName,
          password: User1.password,
          type: User1.type,
          isAdmin: User1.isAdmin
        };
        users.push(User);
        return res.status(200).json({
            User,
        });
      }
       
       
        
    }

    static login(req, res) {
      
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          status: 'fail',
          message: 'Email and password are required',
        });
      } else {
      
      const userData = req.body;
      users.map((user) => {
          if (user.email === userData.email && user.password ===userData.password) {
             
              var token = jwt.sign({email},'mySecrete',{
                    expiresIn:86400
                 });
                 return res.status(200).json({
                  message:' YOU ARE SUCCESSFULL SIGIN!',
                  token,
                    user,
              });
          }else {
            res.status(404).json({
              status: 'fail',
              message: 'User not found, Incorrect email or password',
            });
          }
      });
    }
  }

  static updateUser(req,res)
  {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let itemIndex;
    users.map((specific_user, index) => {
      if (specific_user.id === id) {
        userFound = specific_user;
        itemIndex = index;
      }
    });
  
    if (!userFound) {
      return res.status(404).send({
        success: 'false',
        message: 'user not found',
      });
    }
  
   if (!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'firstName is required',
      });
    } else if (!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'lastName is required',
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        success: 'false',
        message: 'password is required',
      });
    } else if (!req.body.type) {
      return res.status(400).send({
        success: 'false',
        message: 'user type is required',
      });
    } else if (req.body.type === "staff") {
              if(!req.body.isAdmin){
                         return res.status(400).send({
                          success: 'false',
                         message: 'is admin or cachier feel it please',
                      });
                    }
    }
  
    const editUser = {
      token:req.body.token || userFound.token,
      id: userFound.id,
      email: req.body.email || userFound.email,
      firstName: req.body.firstName || userFound.firstName,
      lastName: req.body.lastName || userFound.lastName,
      password: req.body.password || userFound.password,
      type: req.body.type || userFound.type,
      isAdmin: req.body.isAdmin || userFound.isAdmin
    };
  
    users.splice(itemIndex, 1, editUser);
  
    return res.status(201).send({
      success: 'true',
      message: 'user upDate successfully',
      editUser,
    });



  }

  static deleteUser(req,res)
  {
    const id = parseInt(req.params.id);
  
    users.map((specific_user, index) => {
      console.log(specific_user);
      console.log(id);
      if (specific_user.id === id) {
         users.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'user deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        success: 'false',
        message: 'user not found',
      });
  
   
  }

}
