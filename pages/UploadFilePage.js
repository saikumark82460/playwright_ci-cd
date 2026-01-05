class UploadFilePage {
    constructor(page) {
        this.page = page;
        this.uploadFileInput = page.locator('#uploadFile');
        this.downloadButton = page.locator('//a[text()="Download"]')
    }
    async uploadFile(filePath) {
        await this.uploadFileInput.setInputFiles(filePath)
    }
}
module.exports = UploadFilePage;