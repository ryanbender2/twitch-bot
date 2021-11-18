import puppeteer from "puppeteer";
import { Logger } from "winston";

export class TwitchBot {
    TWITCH_PAGE = 'https://www.twitch.tv/';
    twitchUsername: string;
    twitchPassword: string;
    logger: Logger;

    constructor(twitchUsername: string,twitchPassword: string, logger: Logger) {
        this.twitchUsername = twitchUsername;
        this.twitchPassword = twitchPassword;
        this.logger = logger;
        this.logger.info(`TwitchBot(username=${this.twitchUsername},password=${this.twitchPassword})`);
    }

    /**
     * Create a browser.
     * 
     * @returns a new browser instance.
     */
    public async createBrowser(): Promise<puppeteer.Browser> {
        this.logger.info('creating new browser');
        return puppeteer.launch({headless: false});
    }

    private async createPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
        this.logger.info('creating new page');
        var page = await browser.newPage();
        this.logger.info('going to twitch main page');
        await page.goto(this.TWITCH_PAGE, { waitUntil: 'networkidle0' });
        return page;
    }

    /**
     * Start the server.
     * 
     * @param browser browser
     */
    public async start(browser: puppeteer.Browser): Promise<void> {
        var page = await this.createPage(browser);

        this.logger.info('logging into twitch');
        await this.login(page);
    }

    /**
     * Login to twitch.
     * 
     * @param page twitch page
     */
    private async login(page: puppeteer.Page): Promise<void> {
        this.logger.debug('clicked login button');
        await page.click('#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > nav >' +
                'div > div.Layout-sc-nxg1ff-0.dRSNDF > div.Layout-sc-nxg1ff-0.fMmThn' +
                '> div > div.Layout-sc-nxg1ff-0.grKyER.anon-user > div:nth-child(1) > button');
            
        this.logger.debug('waiting for login popup');
        await page.waitForSelector('#login-username', { visible: true });

        this.logger.debug('entering username');
        await page.type('#login-username', this.twitchUsername);
        this.logger.debug('entering password');
        await page.type('#password-input', this.twitchPassword);

        this.logger.debug('clicking login');
        await page.click('body > div.ReactModalPortal > div > div > div > div > div > ' +
                'div.Layout-sc-nxg1ff-0.khyYIz > div > div > div.Layout-sc-nxg1ff-0.kamdZy > ' +
                'form > div > div:nth-child(3) > button');
        await page.waitForNetworkIdle();

        this.logger.debug('entering 6 digit code');
        await this.doCodeEnter(page);
    
    }

    private async getCodeBoxes(page: puppeteer.Page): Promise<puppeteer.ElementHandle[]> {
        await page.waitForSelector('body > div.ReactModalPortal > div > div > div > div > div > ' +
                'div.Layout-sc-nxg1ff-0.khyYIz > div > div > div.Layout-sc-nxg1ff-0.kamdZy > div:nth-child(2)' +
                ' > div > div:nth-child(1) > div > input', { visible: true });
        return await page.$$('body > div.ReactModalPortal > div > div > div > div > div > ' +
                'div.Layout-sc-nxg1ff-0.khyYIz > div > div > div.Layout-sc-nxg1ff-0.kamdZy > ' +
                'div:nth-child(2) > div > div > div input');
    }

    private async doCodeEnter(page: puppeteer.Page): Promise<void> {
        var codeBoxes = this.getCodeBoxes(page);
    }
}