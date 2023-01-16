import Web3 from 'web3';

const web3 = new Web3();

export function CheckAddress(message) {
    const addr = message.content;
    try{
        if (web3.utils.checkAddressChecksum(addr)) {
            message.react('👍');
            message.react('⭐')
        } else {
        return "👎";
        }
    } catch (error) {
        return "👎";
    }
}
