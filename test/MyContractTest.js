const truffleAssert = require('truffle-assertions');

const MyContract = artifacts.require('MyContract.sol');

contract(MyContract,function(accounts){
    
    let instance;
    let test_address1;
    let test_address2;
    let current_amount;

    const ERROR_PREFIX = "VM Exception while processing transaction";
    const DEPOSIT_ERROR = "The deposit must be greater than 0.00!";
    const WITHDRAW_ERROR = "Can't withdraw more than current balance!";
    //Create test instance with ganache test accounts
    before(async () => {
        instance = await MyContract.deployed();
        test_address1 = accounts[0];
        test_address2 = accounts[1];
        current_amount = 0;
    });

    it('Client should NOT be able to deposit 0!', async()=>{
        //Assert that the contract throw an error
        await truffleAssert.reverts(instance.deposit(current_amount), DEPOSIT_ERROR);
    });

    it('Client should be able to deposit!', async()=>{
        deposit_amount = 1000;
        result = await instance.deposit(deposit_amount);

        //Get the event msg
        event_msg = result.logs[0].args[0].words[0]
        assert(event_msg == deposit_amount);
        current_amount = deposit_amount;
    });

   
    it('Client should be able to withdraw', async()=>{
        withdraw_amount = 500;
        withdraw_result = await instance.withdrawFounds(withdraw_amount);
        //Get the event msg
        event_msg = withdraw_result.logs[0].args[0].words[0]
        assert(event_msg == withdraw_amount);
        current_amount -= withdraw_amount;

        //Double check that the correct amount is withdrawn
        balance_result = await instance.getMyBalance();
        new_balance = balance_result.words[0]
        assert(current_amount == new_balance);
    });

    it('Client should NOT be able to withdraw more than current balance', async()=>{
        withdraw_amount  = current_amount + 5000
        await truffleAssert.reverts(instance.withdrawFounds(withdraw_amount), WITHDRAW_ERROR);
    });

    it('Client should be able to see own account balance', async()=>{
        result = await instance.getMyBalance();
        client_balance = result.words[0]
        assert(client_balance == current_amount);
    });

});