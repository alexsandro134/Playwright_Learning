import { test as baseTest } from '@playwright/test';
import { TodoMVCPage } from '../page-object/TodoMVC.page'
import { HerokuApp } from '../page-object/HerokuApp.page';

type MyFixtures = {
    todoMVCPage: TodoMVCPage
    herokuApp: HerokuApp
}

export const test = baseTest.extend<MyFixtures>({
    todoMVCPage: async ({ page }, use) => {
        const todoMVCPage = new TodoMVCPage(page);
        await todoMVCPage.navigate();
        await todoMVCPage.fillinTodo('Buy groceries')
        await todoMVCPage.fillinTodo('Walk the dog')
        await use(todoMVCPage);
    },

    herokuApp: async ({page}, use) => {
        const herokuApp = new HerokuApp(page)
        await herokuApp.navigate();

        await use(herokuApp)
    }
});

export { expect } from '@playwright/test'