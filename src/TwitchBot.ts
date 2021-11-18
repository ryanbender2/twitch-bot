import * as puppeteer from "puppeteer";


export async function createBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch();
}