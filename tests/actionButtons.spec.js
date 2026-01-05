const {test, expect} = require('@playwright/test');
const ButtonPage = require('../pages/ButtonsPage');
const UploadFilePage = require('../pages/UploadFilePage');
const BrowserWindowsPage = require('../pages/BrowserWindowsPage');
const AlertPage = require('../pages/AlertsPage')
const data = require("../data/testData.json");
const path = require('path');

test.describe('Action Buttons test suite', () => {
   test('perform actions on Buttons', {tag: "@regression"}, async ({page}) => {
     const button = new ButtonPage(page);
     await page.goto('/buttons');
     await button.performButtonAction(data.Actions);
     await expect(button.doubleClickMessage).toHaveText('You have done a double click');
     await expect(button.rightClickMessage).toHaveText('You have done a right click');
     await expect(button.clickMessage).toHaveText('You have done a dynamic click');
   });
   test('perform action on upload file and download image file',{tag:["@regression","@snaity"]}, async ({page}) => {
      const uploads = new UploadFilePage(page);
      await page.goto('/upload-download');
      await uploads.uploadFile(path.resolve(__dirname,'../uploads/sampleFile.txt'));
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        uploads.downloadButton.click()
      ])
      await download.saveAs(path.resolve(__dirname,'../downloads/mountainImage.jpeg'));
   });
   test('handle browser windows',{tag:["@regression","@sanity"]}, async ({page}) => {
      const browserWindows = new BrowserWindowsPage(page);
      await page.goto('/browser-windows');
      const count = await browserWindows.browserWindowButtons().count();
      console.log('Count of buttons:', count);
      for(let i=0; i<count; i++){
         let newPage  = await browserWindows.clickOnbroswerWindowButtons(i);
         if(i===0 || i==1){
            await expect(newPage.locator('#sampleHeading')).toHaveText('This is a sample page');
            await newPage.close();
         }
         else if(i===2){
            await expect(newPage.locator('body')).toHaveText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.')
         }
      }
   })
   test.skip('handle Alerts', {tag:["@regression","@sanity"]}, async ({page}) => {
       const alert = new AlertPage(page);
       await page.goto('/alerts');
    //    const alertCount = await alert.alertButton.count();
    //    console.log('Alert button count:', alertCount);
       for(let i=0; i<4; i++){
         const dialogPromise = page.waitForEvent('dialog');
          await alert.getAlertButtons(i).click();
          const dialog = await dialogPromise;
            console.log(`Dialog message for button index ${i}:`, dialog.message());
            if(i===3){
             await dialog.accept('playwright');
            }
            else if(i===2){
             await dialog.dismiss();
            }
            else{
             await dialog.accept();
            }
       }
   })
}); 