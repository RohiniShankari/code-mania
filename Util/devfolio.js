const puppeteer = require("puppeteer");

async function getDevfolioHackthons() {
    const browser = await puppeteer.launch({ headless: false,timeout: 60000 });
    const page = await browser.newPage();
    
    await page.goto("https://devfolio.co/hackathons", { waitUntil: "load", timeout: 0 });

    const contests = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".hackathons__StyledGrid-sc-b6d16d24-0")).map(card => ({
            
            title: card.querySelector(".sc-hZgfyJ")?.innerText.trim(),
            date: card.querySelector(".sc-hZgfyJ")?.innerText.trim(),
            link: card.querySelector("a")?.href,
            location: card.querySelector("sc-dkzDqf")?.innerText.trim(),
        }));
    });
  await browser.close();
    return contests;
}

module.exports = getDevfolioHackthons;

