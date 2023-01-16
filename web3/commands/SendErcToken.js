import Web3 from 'web3';
import ABI from '../ABI.json' assert { type: "json" };
import dotenv from 'dotenv';

dotenv.config()

const Web3js = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER))

const tokenAddress = process.env.TOKEN_ADDRESS; 
const fromAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY 

const contractABI = ABI;
const contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

const decimals = Web3.utils.toBN(18);
const amount = Web3.utils.toBN(1);
const value = amount.mul(Web3.utils.toBN(10).pow(decimals));

export function SendErcToken(message) {
    try{
        const toAddress = message.content;
        const data = contract.methods.transfer(toAddress, value).encodeABI();

        let txObj = {
            gas: Web3js.utils.toHex(100000),
            "to": tokenAddress,
            "value": "0x00",
            "data": data,
            "from": fromAddress
        };

        Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
            if (err) {
                console.log(err);
            } else {
                console.log(signedTx);
                return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
                    if (err) {
                        console.log(err);
                        message.channel.send(`😕 <@${message.author.id}> algo deu errado... Tente novamente mais tarde.`);
                        message.react('👎');
                    } else {
                        console.log(res);
                        message.channel.send(`<@${message.author.id}> missão cumprida!!! Você acabou de ganhar uma estrelinha. 😃`);
                        message.react('👍');
                        message.react('⭐');
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        message.channel.send(`🤔 <@${message.author.id}> isso não parece ser um endereço válido.`);
        message.react('👎');
    }
}