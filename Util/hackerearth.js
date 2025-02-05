const puppeteer = require("puppeteer");

async function getHackerearthContests() {
    const browser = await puppeteer.launch({ headless: false,timeout: 60000 });
    const page = await browser.newPage();
    
    await page.goto("https://www.hackerearth.com/challenges/", { waitUntil: "load", timeout: 0 });

    const contests = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".challenge-card-modern")).map(card => ({
            
            title: card.querySelector(".challenge-list-title")?.innerText.trim(),
            date: card.querySelector(".date")?.innerText.trim(),
            link: card.querySelector("a")?.href
        }));
    });
  await browser.close();
    return contests;
}

module.exports = getHackerearthContests;
