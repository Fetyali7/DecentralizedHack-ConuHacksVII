const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");

require("dotenv").config();

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    const newAccountId = "0.0.49364015";

    const sendHbar = await new TransferTransaction()
     .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000)) //Sending account
     .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000)) //Receiving account
     .execute(client);

    const transactionRx = await sendHbar.getReceipt(client);
    console.log(`Status of txn: ${transactionRx.status}`)
    
    const getNewBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);
    
    console.log(`New balance: ${getNewBalance.hbars.toTinybars()}`)

    client.close();
}
main();
