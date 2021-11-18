import { createBrowser } from "./TwitchBot";
import { sleep } from "./utils";
import * as puppeteer from "puppeteer";



async function main(): Promise<void> {
    const browser = await createBrowser();
    const page = await browser.newPage();
    await sleep(3000);
    console.log(page);
}

main();