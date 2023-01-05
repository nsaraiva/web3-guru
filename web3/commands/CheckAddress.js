import Web3 from 'web3';

const web3 = new Web3();

export function CheckAddress(addr) {
    try{
        if (web3.utils.checkAddressChecksum(addr)) return "Valid address";
        return "Invalid address";
    } catch (error) {
        return "Invalid address";
    }
}
