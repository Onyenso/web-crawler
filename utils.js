const fetch = require("node-fetch")
const cheerio = require("cheerio")


// An object of crawled urls
const seenUrls = {}

// This is for testing purposes
const crawledUrls = []

// A function that recursively crawls a given url using a depth-first algorithm
const crawl = async ({ url }) => {
    

    // Base case: if we've gone through the url before, return
    if (seenUrls[url]) {

        return;
    }

    console.log("Crawling... " + url)
    
    // Set url to crawled
    seenUrls[url] = true
    crawledUrls.push(url)

    
    try {

        // Send GET request to url
        const response = await fetch(url)

        // Convert response to text
        const html = await response.text()
        
        // Get HTML document from text
        const document = cheerio.load(html)

        // Get array of urls that we care about from document
        const links = extractLinks(document, url);

        // If no urls were not found
        if (links === null || !(typeof links === "object")) {

            console.log("No URLs found")
            return
        }

        /**
         * Divde the array links according to the number of workers needed.
         * Then send the parts to each worker thread using worker.postMessage().
         * In each worker thread, accept the message from parent thread
         * using parentPort.on()
         */

        // Crawl each of the urls in array
        links.forEach(link => crawl({url: link}))

        return crawledUrls

    }
    catch(e) {
        console.error(e)
    }
}



// A function that extracts urls from a document and returns an array of the urls
const extractLinks = (document, inputURL) => [

    ...new Set(
      document('a') // Get anchor tags from document.
        .map((_, a) => {

            /* This is in order to get domain of inputUrl
            
            Search for "https://" and maybe "https://wwww." in inputURL.
            The .match() returns and array of all matches.
            */
            let array = inputURL.match(/https:\/\/(www.)?/gi)

            // If invalid url
            if (array === null) return null

            // Find the first occurence of "/" after "https://" or "https://www." and get the index.
            let index_end = inputURL.indexOf("/", array[0].length) // => /

            /*
            Domain of inputURL would be anything between array[0] i.e "https://"
            and index_end i.e index of "/".
            */
            let domainName = inputURL.slice(array[0].length, index_end)

            // Get values of href attribute from anchor tags.
            let link = document(a).attr('href')

            // If document has no links
            if (!link) return null

            /*
            Return only values that are relative or (absoloute AND match domain).
            The third condition, link.includes(domainName), is to accomodate
            subdomains like https://cloud.amazon.com/ or https://accounts.google.com/.
            */
            if (link.startsWith("/") || (link.includes("https") && link.includes(domainName))) {
                

                // If link is a relative path, make it absolute
                if (link.startsWith("/")) link = `https://${domainName}${link}`;
                
                return link
            }
        }) 
        .toArray() // Convert links to an array.
    ),
];


module.exports = { extractLinks, crawl }

