import { TwitchBot } from "./TwitchBot";
import { EmailClient } from "./Email";
import fs from "fs";
import winston from "winston";


function getTwitchLoginInformation(): Map<string, string> {
    var info: Map<string, string> = new Map<string, string>();
    var lines = fs.readFileSync('.env', 'utf8').split('\n')
            .map(line => line.trim())
            .filter(line => !line.startsWith('#') && line);
    lines.forEach(line => {
        var parts = line.split('=').map(line => line.trim());
        info.set(parts[0], parts[1]);
    });
    return info;
}

/**
 * Setup logger.
 * 
 * @returns logger
 */
function getLogger(): winston.Logger {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm A' }),
            winston.format.printf(({ level, message, timestamp }) => {
                return `[${level.toUpperCase()} ${timestamp}] ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console()
        ],
        level: 'debug'
    });
}

async function main(): Promise<void> {
    // get Logger
    const logger = getLogger();

    logger.info("Welcome to the TwitchBot!");

    // get login information
    logger.info('getting login information');
    var twitchLogin = getTwitchLoginInformation();
    var username = twitchLogin.get('username');
    var password = twitchLogin.get('password');
    var email = twitchLogin.get('email');
    var emailPass = twitchLogin.get('email_password');

    if (username === undefined || password === undefined || email === undefined || emailPass === undefined) {
        logger.error('unable to get login information');
        return;
    }

    var emailClient = new EmailClient(email, emailPass);

    // logger.info('creating twitch bot');
    // var bot = new TwitchBot(username, password, logger);
    // var browser = await bot.createBrowser();

    // logger.info('starting twitch bot...');
    // await bot.start(browser);
}

main();