import Web3 from 'web3';
import ABI from '../web3/ABI.json' assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({path: '../../.env'})

const tokenAddress = process.env.TOKEN_ADDRESS 
const toAddress = '0x297bC2A48c16fcFd773D651341003E9ba2e398A3'
const fromAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY 

const contractABI = ABI;
const contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

const decimals = Web3.utils.toBN(18);
const amount = Web3.utils.toBN(1000);
const value = amount.mul(Web3.utils.toBN(10).pow(decimals));

const data = contract.methods.transfer(toAddress, value).encodeABI()

const Web3js = new Web3(new Web3.providers.HttpProvider(process.env.PRIVATE_KEY))

sendErcToken();

function sendErcToken() {
   let txObj = {
       gas: Web3js.utils.toHex(100000),
       "to": tokenAddress,
       "value": "0x00",
       "data": data,
       "from": fromAddress
   }

   Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
       if (err) {
           return callback(err)
       } else {
           console.log(signedTx)
           return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
               if (err) {
                   console.log(err)
               } else {
                   console.log(res)
               }
           })
       }
   })
}