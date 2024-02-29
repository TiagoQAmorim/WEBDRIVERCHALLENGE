import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

// All code should be put in the three functions at the bottom of the file that have the comment "Code Here"
describe('Web Frontend Testing', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
      console.log('Tests completed successfully');
    }
  });

  // Test case 1
  it('should load the homepage', async function () {
    await driver.get('https://www.wikipedia.org/');
    const title = await driver.getTitle();
    expect(title).to.equal('Wikipedia');
  });

  // Test case 2

  it('should search for ifixit', async function () {
    await driver.get('https://www.wikipedia.org/');
    await searchIfixit();
    const title = await driver.getTitle();
    expect(title).to.equal('iFixit - Wikipedia');
  });

  // Test case 3

  it('should have "San Luis Obispo, California" listed as the headquarters', async function () {
    const headQuartersText = await getHeadQuarters();
    expect(headQuartersText).to.equal("San Luis Obispo, California");
  });

  // Test case 4

  it('should have the url "https://de.wikipedia.org/wiki/IFixit" after switching the language to German', async function () {
    await switchToGerman();
    const url = await driver.getCurrentUrl();
    expect(url).to.equal('https://de.wikipedia.org/wiki/IFixit');
  });

  // Functions to be coded

  async function searchIfixit() {
    const searchInput = await driver.findElement(By.id('searchInput'));
    await searchInput.sendKeys('ifixit');
    const searchButton = await driver.findElement(By.css('[type="submit"]'));
    await searchButton.click();
  }

  async function getHeadQuarters() {
    const headquartersHeader = await driver.findElement(By.xpath("//*[contains(text(), 'Headquarters')]"));
    const headquartersCell = await headquartersHeader.findElement(By.xpath("./following-sibling::td"));
    return (await headquartersCell.getText()).substring(0, 27);
  }

  async function switchToGerman() {
    await driver.findElement(By.id('p-lang-btn-checkbox')).click();
    const deutschElement = await driver.wait(until.elementLocated(By.xpath("//li[@title='Deutsch']")), 10000);
    await deutschElement.click();
  }
});
