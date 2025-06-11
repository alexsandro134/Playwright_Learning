import { test as baseTest } from '@playwright/test';
import { TodoMVCPage } from '../page-object/TodoMVC.page'

export const test = baseTest.extend<{ todoMVCPage: TodoMVCPage }>({
  todoMVCPage: async ({ page }, use) => {
    await use(new TodoMVCPage(page));
  },
});