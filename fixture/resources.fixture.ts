import { test as baseTest } from '@playwright/test';
import { TodoMVCPage } from '../page-object/TodoMVC.page'

type MyFixtures = {
    todoMVCPage: TodoMVCPage
}

export const test = baseTest.extend<MyFixtures>({
    todoMVCPage: async ({ page }, use) => {
        const todoMVCPage = new TodoMVCPage(page);
        await todoMVCPage.navigate();
        await todoMVCPage.fillinTodo('Buy groceries')
        await todoMVCPage.fillinTodo('Walk the dog')
        await use(todoMVCPage);

        // await todoMVCPage.deleteTask('Buy groceries')
        // await todoMVCPage.deleteTask('Walk the dog')
    }
});

export { expect } from '@playwright/test'