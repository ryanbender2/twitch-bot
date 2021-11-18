/**
* Sleep for a given amount of time.
* 
* @param ms time to sleep in ms
* @returns Nothing, await this
*/
export function sleep(ms: number): Promise<void> {
   return new Promise((resolve) => setTimeout(resolve, ms));
}