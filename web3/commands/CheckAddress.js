import Web3 from 'web3';

const web3 = new Web3();

export function CheckAddress(addr) {
    try{
        if (web3.utils.checkAddressChecksum(addr)) return "👍";
        return "👎";
    } catch (error) {
        return "👎";
    }
}
