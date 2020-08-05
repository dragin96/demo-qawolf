const qawolf = require("qawolf");
const MainPO = require("../helper/mainPage");
let browser;
let page;
const mainPO = new MainPO();

describe('main Page',()=>{
  beforeEach(async ()=>{
    browser = await qawolf.launch();
    const context = await browser.newContext();
    await qawolf.register(context);
    page = await context.newPage();
    await page.goto("https://prod-app7539715-e67afbf12729.pages.vk-apps.com/index.html");
  });
  afterEach(async ()=>{
    await qawolf.stopVideos();
    await browser.close();
  });
  it("mainPage finde quote", async () => {
    const SEARCH_QUOTE =  [{text: 'магнит', expected: "Магнит ао"},{text: 'sber', expected: "Сбербанк"}];
    // проверка элементов на главной главная
    await mainPO.checkMainPage(page);

    await page.waitForSelector(mainPO.selectors.header.burger, {state: "attached"});
    await page.click(mainPO.selectors.header.burger);
    for (const quote of SEARCH_QUOTE){
      await page.click(mainPO.selectors.bottomMenu.search.input);
      await page.fill(mainPO.selectors.bottomMenu.search.input, quote.text);
      await page.waitForSelector("text=" + quote.expected, {state: "attached"});
      await page.click(mainPO.selectors.bottomMenu.search.clear)
    }
  });
  it("click  button back -> return main page", async () => {
    // проверка элементов на главной главная
    await page.waitForSelector("text=Популярные", {state: "attached"});
    await page.click('text=Популярные');
    await page.waitForSelector('.Header_isActive__6dylh >> text=Популярные');
    // check inner page
    await page.click(mainPO.selectors.header.backButton);
    // мы на главной!
    await mainPO.checkMainPage(page);
  });
  it('click hrefs header -> open catalog quote',  async () => {
    const headerLinkText = ['Популярные', 'Российские', 'США', 'Дорогие', 'Дешевые'];
    const MIN_LEN_CARD_IN_PAGE = 8;
    for(const textHref of headerLinkText){
      await page.waitForSelector("text=" + textHref, {state: "attached"});
      await page.click('text='+ textHref);
      await page.waitForSelector(mainPO.selectors.header.activeLink);
      await page.waitForSelector(mainPO.selectors.header.activeLink + '>> text='+textHref);

      await Promise.all([
        page.waitForSelector(mainPO.selectors.quoteItems.cardList),
        page.waitForSelector(mainPO.selectors.quoteItems.card)
      ]);
      const cards = await page.$$(mainPO.selectors.quoteItems.card);
      expect(cards.length >= MIN_LEN_CARD_IN_PAGE).toBeTruthy();
    }
  });
});



