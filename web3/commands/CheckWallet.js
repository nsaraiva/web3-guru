import { SendERCToken } from "./SendErcToken.js";

const amount = 1;

export async function CheckWallet(message) {
    const toAddress = message.content;

    try{
        const result = await SendERCToken(toAddress, amount);

        if(result.status === 'success'){
            message.channel.send(`<@${message.author.id}> missão cumprida!!! Você acabou de ganhar uma estrelinha. 😃`);
            message.react('👍');
            message.react('⭐');
        }

        if(result.status === 'error'){
            switch (result.type) {
                case 'signTransaction' || 'sendSignedTransaction':
                    message.channel.send(`😕 <@${message.author.id}> algo deu errado... Tente novamente mais tarde.`);
                    break;
                case 'encodeABI':
                    message.react('👎');
                    message.channel.send(`🤔 <@${message.author.id}> isso não parece ser um endereço válido.`);
                    break;
            }        
        }
    }catch (error) {
        console.error(error);
        message.channel.send(`😕 <@${message.author.id}> algo deu errado... Tente novamente mais tarde.`);
    }
};

 