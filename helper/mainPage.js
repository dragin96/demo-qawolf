const expectPlaywrigth = require("expect-playwright");
const BasePO = require('./basePage');
const basePO = new BasePO();

class MainPagePO {
    selectors = {
        header: {
            blockLink: basePO.classInclude('Header_fastLink'),
            link: basePO.classInclude('Header_fastLinkItem'),
            linkHref: basePO.classInclude('Header_fastLinkItem') + ' a',
            burger: basePO.classInclude('Header_navigation'),
            backButton: '.Icon--back_24',
            activeLink: basePO.classInclude('Header_isActive'),
        },
        promCard: 'figure' + basePO.classStartsWith('Index_promoCard'),
        titleLeader: 'text=Лидеры роста',
        titleRecommendations: 'text=ФИНАМ рекомендует',
        bottomMenu: {
            search: {
                input: '.Search__input',
                clear: '.Icon--clear_16'
            },
        },
        quoteItems: {
            cardList: basePO.classInclude('CardList_list'),
            card: basePO.classInclude('Card_frame')
        }
    };
    async checkHeader(page) {
        await page.waitForSelector(this.selectors.header.link);
        const expectedHeaderLinkText = ['Популярные', 'Российские', 'США', 'Дорогие', 'Дешевые'];
        for(const textHref of expectedHeaderLinkText){
            await page.waitForSelector('text=' + textHref);
            expectPlaywrigth(page).toHaveText(this.selectors.header.blockLink, textHref);
        }
    }
    async checkMainPage(page) {
        // проверка шапки
        await this.checkHeader(page);
        // проверка пром-блоков
        const LENGTH_PROM_CARD = 1;
        const promCard = await page.$$(this.selectors.promCard);
        expect(LENGTH_PROM_CARD === promCard.length).toBeTruthy();

        await page.waitForSelector(this.selectors.quoteItems.card);
        const cards = await page.$$(this.selectors.quoteItems.card);
        expect(cards.length >= 8).toBeTruthy();
        await page.waitForSelector(this.selectors.titleLeader);
        await page.waitForSelector(this.selectors.titleRecommendations);
    }
}

module.exports = MainPagePO;
