class AlertsPage{
    constructor(page){
        this.page=page;
        this.alertButtons = [
            page.locator('#alertButton'),
            page.locator('#timerAlertButton'),
            page.locator('#confirmButton'),
            page.locator('#promtButton'),
    ];
    }
    getAlertButtons=(index)=>{
        return this.alertButtons[index]
    }
}
module.exports = AlertsPage;