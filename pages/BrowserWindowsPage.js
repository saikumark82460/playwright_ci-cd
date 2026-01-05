class BrowserWindowsPage{
    constructor(page){
        this.page=page;
    }
    browserWindowButtons=()=>{
        return this.page.locator('button.btn-primary');
    }
    async clickOnbroswerWindowButtons(index){
        const [newPage] =await Promise.all([
            this.page.waitForEvent('popup'),
            this.browserWindowButtons().nth(index).click()
        ])
        await newPage.waitForLoadState();
        return newPage;
    }
}
module.exports = BrowserWindowsPage;