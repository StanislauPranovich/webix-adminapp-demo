// @ts-check
const { test, expect, chromium } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/#!/main/dash');
  await expect(page).toHaveTitle(/Webix Demo App/);
});

test('dashboard', async ({ page }) => {
  await page.goto('http://localhost:8080/#!/main/dash');
  for (const element of await page.locator('.webix_sidebar .webix_tree_item').all()) {
    await element.click()
    await element.hover()
  }
});

test('forms', async ({ page }) => {
  await page.goto('http://localhost:8080/#!/main/forms');
  for (const elem of await page.getByLabel('Notes').all())
    await elem.fill('some text')
});

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:8080/#!/main/tables');
  await page.screenshot({ path: 'testScreenshots/tablesScreenshotPrev.png' });
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Dashboard' }).click();
  await page.screenshot({ path: 'testScreenshots/tablesScreenshotNext.png' });

  await page.goto('http://localhost:8080/#!/main/forms');
  await page.screenshot({ path: 'testScreenshots/formsScreenshotPrev.png' });
  await page.getByRole('listitem').filter({ hasText: 'Old Buddy' }).getByRole('button', { name: 'Remove item' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Supplier' }).getByRole('button', { name: 'Remove item' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Avid Supporter' }).getByRole('button', { name: 'Remove item' }).click();
  await page.getByPlaceholder('Click to add tags').click();
  await page.getByRole('option', { name: 'Customer' }).getByRole('checkbox').click();
  for (const elem of await page.getByLabel('Notes').all()) await elem.fill('some text')
  await page.getByRole('combobox', { name: 'Birthday' }).click();
  await page.getByText('16').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('s@gmail.com');
  await page.getByRole('combobox', { name: 'Make' }).click();
  await page.getByRole('option', { name: 'Typhon&Co' }).click();
  await page.getByRole('combobox', { name: 'Color' }).click();
  await page.getByRole('gridcell', { name: '#000000' }).locator('div').click();
  await page.getByRole('combobox', { name: 'Model' }).click();
  await page.getByRole('option', { name: 'Pytheas RY-1M4L1VE' }).click();
  await page.screenshot({ path: 'testScreenshots/formsScreenshotNext.png' });
})();
