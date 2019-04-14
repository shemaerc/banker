//const users = require ('../db/users');
import users from '../models/users';

// export default class User {
  module.exports= class User {
    static getUsers(req, res) {
        return res.status(200).json({
            users,
        });
    }
    static getUser(req, res) {
      const id = parseInt(req.params.id);
    
        users.forEach((item) => {
          if (item.id === id) {
            return res.status(200).json({
                item,

            });
          }
        });
        return id;
      }

    static register(req, res) {
      //data from the request body
        const userData = req.body;
        let error = '';

        users.forEach((val, key) => {
            if (val.email === userData.email) {
                error = 'user already exists';
            }
        });

        if (error) {
            return res.status(200).json({
                error,
            });
        }

        users.push(userData);
        return res.status(200).json({
            users,
        });
    }

    static login(req, res) {
      // get sign data from the request body
      const { email, password } = req.body;
    console.log(email);
      if (!email || !password) {
        res.status(400).json({
          status: 'fail',
          message: 'Email and password are required',
        });
      } else {

      const userData = req.body;
      users.map((item) => {
        console.log(item);
          if (item.email === userData.email && item.password ===userData.password) {
              return res.status(200).json({
                message:' YOU ARE SUCCESSFULL SIGIN!',
                item,
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
  
    if (!req.body.id) {
      return res.status(400).send({
        success: 'false',
        message: 'id is required',
      });
    } else if (!req.body.firstName) {
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
