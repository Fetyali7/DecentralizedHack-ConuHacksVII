const { Client, PrivateKey, AccountCreateTransaction, Hbar } = require("@hashgraph/sdk");

require("dotenv").config();

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.0.0.49363879;
    const myPrivateKey = process.env.ba067a1acd31c4f0e16d268fb12136275ea12a3fa8890bc8f6af38cc71afd1bc;

    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);
    
    const newAccountPrivateKey = PrivateKey.generateED25519(); 
    const newAccountPublicKey = newAccountPrivateKey.d8823f57ef5a75e50f9b2800d41e249f3585258c848bc3d5529e52a70e02b782;
    
    client.close();
}
main();
