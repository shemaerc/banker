
import accounts from '../db/account';
import transaction from '../db/transaction';


function idGeneretor(dbInf)
    {
    var count=0;
    dbInf.map((dbSpecificInfo, index) => {
      count=dbSpecificInfo.id+1;
    }); return count;
  }

  
  module.exports= class transaction1 {
    static getTransactions(req, res) {
        return res.status(200).json({
            transaction,
        });
    }
    static getTransaction(req, res) {
      const id = parseInt(req.params.id);
    
      transaction.forEach((item) => {
          if (item.id === id) {
            return res.status(200).json({
                item,

            });
          }
        });
        return 'valid id required';
      }

    static debitCredit(req, res) {
      //data from the request body
      var accountNo = req.params.account;
      var transactionType =req.params.type;
      var transactionData = req.body;
      let error = '';
       var newBalance=0;
       
       accounts.forEach((item) => {

        if (item.accountNumber === accountNo && (item.status === "draft" || item.status === "dormant") ) {
        return res.status(400).json({
          message:' transaction fail! this account is not active',
          });
        }else if(!req.body.amount){
          return res.status(400).json({
            message:' Amount required',
            });
        }
        
     });

         if(transactionType === 'debit' && accountNo)
         { 
           transaction.forEach((val, key) => {
            if (val.id=== transactionData.id) {
                error = 'transaction already exists';
            }else if(newBalance === 0){
              accounts.forEach((item) => {
                if (item.accountNumber === accountNo) {
                  item.balance=parseInt(item.balance)+parseInt(transactionData.amount);
                  newBalance=item.balance;
                  
                }
                  });
             const New_Transaction={
                id:idGeneretor(transaction),
                accountNumber:accountNo,
                amount:parseInt(transactionData.amount),
                cashier:2,
                type:'debit',
                balance:newBalance                   

             };
             transaction.push(New_Transaction);
             return res.status(200).json({
               status:'integer',
               message:'transaction successfully made',
               New_Transaction,
          });
         }
         
       });

       return res.status(200).json({
        status:'integer',
        message:'invalid account number',
   });
   

   }
       
         else if(transactionType === 'credit' && accountNo)
         {

            
          transaction.forEach((val, key) => {
            if (val.id=== transactionData.id) {
                error = 'transaction already exists';
            }else if(newBalance === 0){
              accounts.forEach((item) => {
                if (item.accountNumber === accountNo) {
                  item.balance=item.balance-parseInt(transactionData.amount);
                  newBalance=item.balance;
                }
                  });
             const newTransactionValue={
                id:idGeneretor(transaction),
                accountNumber:accountNo,
                amount:parseInt(transactionData.amount),
                cashier:2,
                type:'credit',
                balance:newBalance                   

             };
             transaction.push(newTransactionValue);
             return res.status(200).json({
               status:'integer',
               message:'transaction successfuly made',
              newTransactionValue,
              
          });
                }


                
              });


              return res.status(200).json({
                status:'integer',
                message:'invalid account number',
           });
         }

        
   }
  
}
        