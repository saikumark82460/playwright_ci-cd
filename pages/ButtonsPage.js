class ButtonPage{
    constructor(page){
        this.page=page;
        this.doubleClickMessage=page.locator("#doubleClickMessage");
        // this.rightClickMessage=page.locator('p',{hasText:'You have done a right click'})
        this.rightClickMessage=page.locator("#rightClickMessage");
        this.clickMessage=page.locator("#dynamicClickMessage");
    }
    getButton(buttonText){
        return this.page.locator(`//button[text()='${buttonText}']`)
    }
    async performButtonAction(buttonText){
        for(const field in buttonText){
        if(field==="dbClickButton"){
            await this.getButton(buttonText[field]).dblclick();
        }
        else if(field==="rightClickButton"){
            await this.getButton(buttonText[field]).click({button:'right'});
        }
        else if(field==="clickButton"){
            await this.getButton(buttonText[field]).click();
        }
     }
    }
}
module.exports=ButtonPage