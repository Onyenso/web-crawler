#! node

const { crawl } = require("./utils")

// Get command line arguments.
const URL = process.argv[2]

// Check validity of CLI arguements.
if (!URL || !URL.match(/https:\/\/?/gi)) {
    console.log("Error: Type in URL with format: https://example.com")
    // Exit program with 1
    process.exit(1)
}



crawl({url: URL})


// Exit with 0 when program ends.
process.exitCode = 0



/**
 * Note to the Hiring Manager:
 * 
 * I acknowledge that the Node.js workers requirement was not implemented. Here's
 * why:
 * 
 * It might interest you to know that I have been a Full-stack Web Programmer using
 * Javascript for front-end and Python (Django) for back-end. I had no prior
 * experience of using Node.js, JavaScript shell scripting, and Javascript testing.
 * Consequently, I learned how to use them in approximately 1 week duration to 
 * enable me build this project. I noted that Node.js' documentation about workers
 * was a bit complex. Therefore, I had to build a minimum viable product in the shortest
 * possible time. I do hope the project meets the minimum requirements. I would appreciate
 * feedback on my implementation even if it doesn't meet the minimum requirements.
 */


