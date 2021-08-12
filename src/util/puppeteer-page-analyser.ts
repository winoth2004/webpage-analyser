import puppeteer from 'puppeteer';

type Request = puppeteer.HTTPRequest;
type Response = puppeteer.HTTPResponse;

export default async function getPageReport(url :string, isDocumentOnly :boolean) {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const counter = {
        request: 0,
        finish: 0,
        failed: 0
    };

    const results: any[] = []; // collects all results
    const pageRequestHandler = (request: Request) => {
        counter.request = counter.request + 1;
        if (isDocumentOnly && results.length) {
            request.response();
        } else {
            request.continue();
        }
    };
    const pageRequestFinishedHandler = async (request: Request) => {
        counter.finish = counter.finish + 1;
        const response = await request.response();
        const responseHeaders = response.headers();
        let hasRedirectionChain :boolean = false;
        if (request.redirectChain().length !== 0) {
            // body can only be access for non-redirect responses
            hasRedirectionChain = true;
        }

        const information = {
            url: request.url(),
            requestHeaders: request.headers(),
            responseHeaders: responseHeaders,
            responseSize: responseHeaders['content-length'],
            hasRedirectionChain,
        };
        results.push(information);
    };
    const pageRequestFailedHandler = async (request: Request) => {
        counter.failed = counter.failed + 1;
        request.abort();
    };
    const terminateBrowser = async () => {
        try {
            await browser.close();
        }
        catch(e) {
            // do nothing
        }
        return Promise.resolve();
    };

    try {
        await page.setRequestInterception(true);
        page.on('request', pageRequestHandler);
        page.on('requestfinished', pageRequestFinishedHandler);
        page.on('requestfailed', pageRequestFailedHandler);

        const pageAnalyserPromise :Promise<void | Response> = page.goto(url, { waitUntil: 'domcontentloaded' });
        await pageAnalyserPromise;
        console.log('resolved');
    }
    catch(e) {
        console.log('exception');
    }
    finally {
        console.log(`Request ${counter.request}`);
        console.log(`Finish ${counter.finish}`);
        console.log(`Failed ${counter.failed}`);
        await terminateBrowser();
        return results;
    }
}