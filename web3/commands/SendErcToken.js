import Web3 from 'web3';
import ABI from '../ABI.json' assert { type: "json" };
import dotenv from 'dotenv';

dotenv.config()

const Web3js = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER))

const tokenAddress = process.env.TOKEN_ADDRESS; 
const fromAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

const contractABI = ABI;
const contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress });

export async function SendERCToken(toAddress, amount){
    try {
        const signTransaction = await SignTransaction(toAddress, amount);
        if(signTransaction.status !== 'error'){
            const sendSignedTransaction = await SendSignedTransaction(signTransaction.message);
            return sendSignedTransaction;
        } else{
            return signTransaction;
        }
    }catch (error) {
        return new Object({type: 'SendERCToken', status: 'error', message: error});
    }
};

async function SignTransaction(toAddress, amount) {
    const decimals = Web3.utils.toBN(18);
    const tokenAmount = Web3.utils.toBN(amount);
    const value = tokenAmount.mul(Web3.utils.toBN(10).pow(decimals));
    try{
        const data = contract.methods.transfer(toAddress, value).encodeABI();
        
        let result = new Object();

        let txObj = {
            gas: Web3js.utils.toHex(100000),
            "to": tokenAddress,
            "value": "0x00",
            "data": data,
            "from": fromAddress
        };

        await Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => { // Signs an Ethereum transaction with a given private key.
            if (err) {
                result = {type: 'signTransaction', status: 'error', message: err};
            } else {
                result = {type: 'signTransaction', status: 'success', message: signedTx};
            }
        })
        return result;
    }catch (error) {
        return new Object({type: 'encodeABI', status: 'error', message: error});
    }
};

async function SendSignedTransaction(signedTx){
    let result = new Object();
    await Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
        if (err){
            console.log(err);
            result = {type: 'sendSignedTransaction', status: 'error', message: err};
        } else {
            result = {type: 'sendSignedTransaction', status: 'success', message: res};
        }
    })
    return result;
};