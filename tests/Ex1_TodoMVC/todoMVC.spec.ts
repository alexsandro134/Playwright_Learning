import { test, expect } from '../../fixture/resources.fixture';
import { TodoMVCPage } from '../../page-object/TodoMVC.page'
test.describe.configure({ mode: 'serial' });

// let toDoMVC = new TodoMVCPage(page)

test('Add new todo item', async ({ todoMVCPage, page }) => {
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).toBeVisible();
})

test('Mark todo as complete', async ({ todoMVCPage }) => {
    await todoMVCPage.markTaskComplete('Buy groceries')
    await expect(todoMVCPage.chkboxComplete('Buy groceries')).toBeChecked();
});

test('Filter todos', async ({ todoMVCPage }) => {
    await todoMVCPage.markTaskComplete('Buy groceries')
    
    await todoMVCPage.filterActive()
    await expect(await todoMVCPage.getTask('Walk the dog')).toBeVisible();
    await expect(await todoMVCPage.getTask('Buy groceries')).not.toBeVisible();

    // Expects page to have a heading with the name of Installation.
    await todoMVCPage.filterCompleted()
    await expect(await todoMVCPage.getTask('Walk the dog')).not.toBeVisible();
    await expect(await todoMVCPage.getTask('Buy groceries')).toBeVisible();

    await todoMVCPage.filterAll()
    await expect(await todoMVCPage.getTask('Walk the dog')).toBeVisible();
    await expect(await todoMVCPage.getTask('Buy groceries')).toBeVisible();
});

test('Delete todo item', async ({ todoMVCPage, page }) => {
    await todoMVCPage.deleteTask('Buy groceries');
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
});
