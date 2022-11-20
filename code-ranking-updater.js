const { By, Builder } = require("selenium-webdriver");
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');

async function updateAllCodesRanking() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  try {
    await driver.get('https://www.topparrain.com/en/users/sign_in');
    await driver.findElement(By.xpath("//button[@aria-label='Consent']")).click();
    await driver.findElement(By.id('user_email')).sendKeys('ngmg.test@gmail.com');
    let field = await driver.findElement(By.id('user_password'));
    for (let i = 0; i < 8; i++) {
      await field.sendKeys('TP');
    }
    await field.sendKeys('8!');
    await driver.findElement(By.xpath("//input[@value='Log in']")).click();
    await driver.get('https://www.topparrain.com/en/referral_codes');
    //await driver.findElement(By.id('update_all_codes_ranking')).click();
  } catch (ex) {
    console.log(ex);
    console.log(await driver.getPageSource());
  } finally {
    console.log('quit');
    await driver.quit();
  }
}

updateAllCodesRanking();

