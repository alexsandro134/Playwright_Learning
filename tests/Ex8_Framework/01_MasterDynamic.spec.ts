import { Page, test } from "@playwright/test";
test('Master dynamic selectors', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Add some todos to work with
    await page.fill('.new-todo', 'Dynamic Todo 1');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Dynamic Todo 2');
    await page.press('.new-todo', 'Enter');

    // Your implementation challenges:

    // Challenge 1: Find todo by partial text match
    // Goal: Find todo containing "Dynamic" (not exact text match)
    // Your thinking: What selector handles partial text?
    const dynamicTodo = page.getByText('Dynamic')
    const todoItems = page.locator('li[@data-testid="todo-item"]').filter({ has: dynamicTodo })

    // Challenge 2: Find todo by position
    // Goal: Find the 2nd todo item (regardless of text)
    // Your thinking: How do you select by position?
    const secondTodoItem = page.locator('li[@data-testid="todo-item"]').locator('nth=1')
    
    // Challenge 3: Find todo by attribute
    // Goal: Find todo with specific data attributes
    // Your thinking: How do you target data-* attributes?
    const checkedItem = page.locator('li[@data-testid="todo-item"]').getAttribute('checked')

    // Challenge 4: Complex filtering
    // Goal: Find uncompleted todos only
    // Your thinking: How do you filter by element state?
});