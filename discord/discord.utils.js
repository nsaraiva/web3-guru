import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';
import bodyParser from 'body-parser';
bodyParser.json();

export function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');
      
console.log('buf: ' + buf + ' signature: ' + signature + ' timestamp: ' + timestamp + ' clientKey: ' + clientKey);

      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }

export async function DiscordRequest(endpoint, options) {
  console.log(endpoint);
    // Append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;    
    // Stringify payloads
    if (options.body) options.body = JSON.stringify(options.body);
        //Use node-fetch to make requests
        const res = await fetch(url, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                'Content-type': 'application/json; charset=UTF-8',
                'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)'
            },
            ...options
        });

        //console.log(res);
        // Throw API errors
        console.log(res.status);
        if (!res.ok) {
            const data = await res.json();
            console.log(res.status);
            throw new Error(JSON.stringify(data));
        }
        //return original response
        return res;
}
