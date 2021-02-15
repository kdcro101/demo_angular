import { browser, by, element } from 'protractor';

export class AppPage {
    async navigateTo(path: string): Promise<unknown> {
        return browser.get(browser.baseUrl + path);
    }

    async getToolbarText(): Promise<string> {
        return element(by.css('body > app-root > mat-drawer-container > mat-drawer-content > div > mat-toolbar > mat-toolbar-row > span:nth-child(2)')).getText();
    }
    async getTitle():Promise<string>{
        return browser.getTitle()
    }
}
