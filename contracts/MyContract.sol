// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MyContract {
   

    //Map addresses to account balances
    mapping (address => uint) public balance_pool;

    //Create an event to be able to send information back to the client
    event returnMsg(uint amount);

    //Deposits founds to contract
     function deposit(uint amount) public {
        if(amount <= 0){
             revert("The deposit must be greater than 0.00!");
        }else{
            balance_pool[msg.sender] += amount;
            emit returnMsg(amount);
        }
    }

    // Withdraw founds from contract
    function withdrawFounds(uint amount) public {
        if(amount <= balance_pool[msg.sender]){
            balance_pool[msg.sender] -= amount;
             emit returnMsg(amount);
        }else{
            revert("Can't withdraw more than current balance!");
        }
   
    }
    //Returns the clients balance
    function getMyBalance() public view returns (uint){
        return balance_pool[msg.sender];
    }
}


//Alternative error
  /* require(
            amount > 0,
            "The deposit must be greater than 0.00!"
 );*/