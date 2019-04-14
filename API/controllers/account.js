//const accounts = require('../db/account');
import accounts from '../models/account';

// export default class User 

  module.exports= class Account {
    static getAccounts(req, res) {
        return res.status(200).json({
            accounts,
        });
    }

     static getAccount(req, res) {
        const accntNmuber = req.params.accn;
           accounts.forEach((item) => {
            if (item.accountNumber === accntNmuber) {
            return res.status(200).json({
                  item,
          
              });
            }
         });
        }       
      
    static createAccount(req, res) {
      //data from the request body
        const accountData = req.body;
        let error = '';

        accounts.forEach((val, key) => {
            if (val.accountNumber === accountData.accountNumber) {
                error = 'account already exists';
            }
        });

        if (error) {
            return res.status(200).json({
                error,
            });
        }

        accounts.push(accountData);
        return res.status(200).json({
            success: 'false',
            message: 'account created successfuly',
            accounts,
        });
    }

    

  static updateAccount(req,res)
  {
    const accountNumber = req.params.id;
    var accountFound;
    var itemIndex;
    accounts.map((acc, index) => {
      if (acc.accountNumber === accountNumber) {
        accountFound = acc;
        itemIndex = index;
      }
    });
  
    if (!accountFound) {
      return res.status(404).send({
        success: 'false',
        message: 'account not found',
      });
    }
  
    if (!req.body.id) {
      return res.status(400).send({
        success: 'false',
        message: 'id is required',
      });
    } else if (!req.body.accountNumber) {
      return res.status(400).send({
        success: 'false',
        message: 'account is required',
      });
    }
    else if(!req.body.createdOn)
    {
        return res.status(400).send({
            success: 'false',
            message: 'date created on is required',
          });

    }
    else if(!req.body.owner)
    {
        return res.status(400).send({
            success: 'false',
            message: 'owner id on is required',
          });

    }
    else if(!req.body.type)
    {
        return res.status(400).send({
            success: 'false',
            message: 'type  is required',
          });

    }
    else if(!req.body.status)
    {
        return res.status(400).send({
            success: 'false',
            message: 'status is required',
          });

    }
    else if(!req.body.balance)
    {
        return res.status(400).send({
            success: 'false',
            message: 'balance is required',
          });

    }
  
    const editAccount = {
      id: accountFound.id,
      accountNumber: req.body.accountNumber || accountFound.accountNumber,
      createdOn: req.body.createdOn || accountFound.createdOn,
      owner: req.body.owner || accountFound.owner,
      type: req.body.type || accountFound.type,
      type: req.body.status || accountFound.status,
      status: req.body.balance || accountFound.balance
    };
  
    accounts.splice(itemIndex, 1,editAccount);
  
    return res.status(201).send({
      success: 'true',
      message: 'account upDate successfully',
      editAccount,
    });
  }


//-------------------------
static activeDeactive(req,res)
{
  const accountNumber =req.params.accNumber;
  const accountStatus=req.body.status;
  accounts.map((acc, index) => {
    
    if (!accountNumber) {

    return res.status(404).send({
      success: 'false',
      message: 'put account number please!',
    });
  }else if(accountNumber === acc.accountNumber){
     acc.status=accountStatus;
    return res.status(200).send({
      status: 'integer',
      message: 'account status changed to '+acc.status,
      acc,
    });
    
    
    }

  });
}


static accountDelete(req, res) {
  const accNo =req.params.accNo;
  accounts.map((acc, index)=> {
    if (acc.accountNumber === accNo) {
      console.log(acc);
      accounts.splice(index,1);
    return res.status(200).json({
      Status: 'integer',
      message: 'account deleted successfuly',
      });
    }
 });


    return res.status(404).send({
      success: 'false',
      message: 'account not found',
    });

 
}

  }