# Web Crawler

A command line script that you can call with a URL and it will begin crawling all links on
that website and printing out every link it finds to console.log.

For example:

If you put in the url https://www.amazon.com it would check the HTML for that website and then
any link it finds, print the link to console.log and try to load the HTML for that page and print
any more links it finds on the new page.
This process continues until all links are exhausted. Only links within the same domain should
be visited and printed out.

Key Features:

- The program only crawsl links that match the domain of the input URL.
- Supports absolute and relative links and follow redirects.
- Does not crawl the same document twice.

# Usage

- Intall [Node.js](https://nodejs.org).
- Install dependencies in the package.json file using npm or yarn
- Then you can run:

```
./crawl.js https://example.com
```


# Testing

A testing suite using Jest framwork was implemented. You can run this by runinng:

```
npm run test
```


