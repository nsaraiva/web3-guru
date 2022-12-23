import Web3Quotes from './web3quotesbr.json' assert { type: "json" };

export function RandomQuotes (){
    const {quotes} = Web3Quotes;
    const quotesLength = quotes.length;
    const quote = quotes[Math.floor(Math.random() * quotesLength)];

    return `"${quote.quote}" - ${quote.author}`;
}