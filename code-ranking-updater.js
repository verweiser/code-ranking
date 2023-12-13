const { By, Builder } = require("selenium-webdriver");
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');

async function updateAllCodesRanking(args) {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  try {
    let url = args[0] + '/users/sign_in?locale=en';
    await driver.get(url);
    console.log('>> LOGIN');
    console.log(await driver.getCurrentUrl());
        console.log(await driver.getPageSource());
    //await driver.findElement(By.xpath("//button[@aria-label='Consent']")).click();
    await driver.findElement(By.id('user_email')).sendKeys(args[1]);
    await driver.findElement(By.id('user_password')).sendKeys(args[2]);
    await driver.findElement(By.id('recaptcha-anchor')).click();
    await driver.findElement(By.xpath("//input[@value='Log in']")).click();
    console.log('>> AFTER LOGIN');
    console.log(await driver.getCurrentUrl());
        console.log(await driver.getPageSource());
    console.log('<< AFTER LOGIN');
    await driver.get(args[0] + '/en/referral_codes');
    console.log('>> CODES');
    console.log(await driver.getCurrentUrl());
    await driver.findElement(By.id('update_all_codes_ranking')).click();
    console.log('>> RESULT');
    console.log(await driver.findElement(By.id('update_ranking')).findElement(By.xpath('./div[2]/div')).getText());
  } catch (ex) {
    console.log(ex);
    console.log(await driver.getPageSource());
  } finally {
    console.log('quit');
    await driver.quit();
  }
}

let args = process.argv.slice(2);
updateAllCodesRanking(args);

