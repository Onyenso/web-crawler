const fetch = require("node-fetch")
const cheerio = require("cheerio")
const { extractLinks, crawl } = require("./utils.js")


// extractLinks() test suite
describe("Test for extractLinks()", () => {

    test("extractLinks returns an array for valid url", () => {

        let url = "https://scrapeme.live/shop/"
    
        let run = async (url) => {
            // Send GET request to url
            const response = await fetch(url)
    
            // Convert response to text
            const html = await response.text()
            
            // Get HTML document from text
            const document = cheerio.load(html)
    
            return extractLinks(document, url)
    
        }
    
        expect(typeof run(url)).toBe("object");
    })
    
    test("extractLinks returns no urls for invalid url", () => {
    
        const ur = "invalidUrl"
    
        let run = async (url) => {
            // Send GET request to url
            const response = await fetch(url)
    
            // Convert response to text
            const html = await response.text()
            
            // Get HTML document from text
            const document = cheerio.load(html)
    
            console.log(extractLinks(document, url))
    
            return extractLinks(document, url)
    
        }
        
        expect(run(ur).length == null).toBe(true);
    })

})


// Test suite for crawl()
describe("Test for crawl()", () => {

    test("crawl() should not crawl any url twice", () => {

        let url = "https://scrapeme.live/shop/"

        let run = async (url) => {

            // Recall that crawl() is supposed to return an array of disticnt 
            // crawled urls on successful completion
            let crawledUrls = await crawl({url: url})

            const counts = {};

            for (link of crawledUrls) {

                counts[link] = counts[link] ? counts[link] + 1 : 1;
            }
            return counts
        }

        expect(typeof run(url)[url] <= 1).toBe(true);
    })
})

