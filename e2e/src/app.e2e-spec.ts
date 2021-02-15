import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should default to /question-1 when no state is provided', async () => {
        await page.navigateTo("");
        expect(await page.getToolbarText()).toEqual('Devices');
        expect(await page.getTitle()).toEqual('Devices');
        // expect(true).toEqual(true);
    });
    it('should display title "Devices" when url=/question-1', async () => {
        await page.navigateTo("question-1");
        expect(await page.getToolbarText()).toEqual('Devices');
        expect(await page.getTitle()).toEqual('Devices');
        // expect(true).toEqual(true);
    });
    it('should display title "To do" when url=/question-2', async () => {
        await page.navigateTo("question-2");
        expect(await page.getToolbarText()).toEqual('To do');
        expect(await page.getTitle()).toEqual('To do');
        // expect(true).toEqual(true);
    });
    it('should display title "Movies" when url=/question-3', async () => {
        await page.navigateTo("question-3");
        expect(await page.getToolbarText()).toEqual('Movies');
        expect(await page.getTitle()).toEqual('Movies');
        // expect(true).toEqual(true);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
