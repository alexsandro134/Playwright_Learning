import { test, expect, Page } from '@playwright/test';
import { TodoMVCPage } from '../../page-object/TodoMVC.page'
test.describe.configure({ mode: 'serial' });

let page: Page;
let toDoMVCPage
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    toDoMVCPage = new TodoMVCPage(page)
});

test.afterAll(async () => {
    await page.close();
});

test('Add new todo item', async ({ }) => {
    await toDoMVCPage.navigate()
    await toDoMVCPage.fillinTodo('Buy groceries')
    await page.keyboard.press('Enter');
    await expect(await toDoMVCPage.getTask('Buy groceries')).toBeVisible();

    await toDoMVCPage.fillinTodo('Walk the dog')
    await page.keyboard.press('Enter');
    await expect(await toDoMVCPage.getTask('Walk the dog')).toBeVisible();
})

test('Mark todo as complete', async ({ }) => {
    await toDoMVCPage.markTaskComplete('Buy groceries')
    await expect(toDoMVCPage.chkboxComplete('Buy groceries')).toBeChecked();
});

test('Filter todos', async ({ }) => {

    await toDoMVCPage.filterActive()
    await expect(await toDoMVCPage.getTask('Walk the dog')).toBeVisible();
    await expect(await toDoMVCPage.getTask('Buy groceries')).not.toBeVisible();

    // Expects page to have a heading with the name of Installation.
    await toDoMVCPage.filterCompleted()
    await expect(await toDoMVCPage.getTask('Walk the dog')).not.toBeVisible();
    await expect(await toDoMVCPage.getTask('Buy groceries')).toBeVisible();

    await toDoMVCPage.filterAll()
    await expect(await toDoMVCPage.getTask('Walk the dog')).toBeVisible();
    await expect(await toDoMVCPage.getTask('Buy groceries')).toBeVisible();
});

test('Delete todo item', async ({ }) => {
    await toDoMVCPage.hoverTask('Buy groceries')
    await toDoMVCPage.deleteTask('Buy groceries')
    await expect(await toDoMVCPage.getTask('Buy groceries')).not.toBeVisible();
});
