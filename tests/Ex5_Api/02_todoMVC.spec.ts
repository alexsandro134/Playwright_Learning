import { test, request, expect } from '@playwright/test'
import { Todo } from '../../types/Ex5/UserData.type';

test.skip('Intercept todos API call', async ({ page, request }) => {
    await page.route('**/api/todos', async route => {
        const response = route.fulfill({
            status: 200,
            contentType: 'application/json, text/plain, */*',
            body: JSON.stringify({
                todos: [
                    {
                        id: 1,
                        text: 'Alex test',
                        completed: true
                    },
                    {
                        id: 2,
                        text: 'Alex test 02',
                        completed: false
                    }
                ]
            })
        })
    })

    await page.goto('https://demo.playwright.dev/todomvc/#/')
    const elements = await page.locator('label[data-testid="todo-title"]')
    const label = await elements[0].textContent()
    await expect(label).toEqual('Alex test')
});

test('Inject API data and verify UI', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/')

    const mockApiData = [
        { id: 'todo-1', title: 'API Todo 1', completed: false },
        { id: 'todo-2', title: 'API Todo 2', completed: true },
        { id: 'todo-3', title: 'API Todo 3', completed: false },
    ]

    await page.evaluate((todos) => {
        localStorage.setItem('react-todos', JSON.stringify(todos))
    }, mockApiData)

    await page.reload()

    let elements = await page.locator('label[data-testid="todo-title"]').all()
    for (let i = 0; i < mockApiData.length; i++) {
        let label = await elements[i].innerText()
        await expect(label).toEqual(mockApiData[i].title)
    }

    const completeElement = await page.locator('[data-testid="todo-item"]', { hasText: 'API Todo 2' })
    await expect(completeElement).toHaveAttribute('class', 'completed')
    const activeElements = await page.locator('[data-testid="todo-item"]', { hasNotText: 'API Todo 2' }).all()
    for (const element of activeElements) {
        await expect(element).not.toHaveClass('completed')
    }

    const btnActive = await page.getByText('Active')
    await btnActive.click()
    await page.waitForTimeout(500);
    let afterFilterElements = await page.locator('label[data-testid="todo-title"]').all()
    await expect(afterFilterElements.length).toEqual(2)
    for (let i = 0; i < afterFilterElements.length; i++) {
        let label = await afterFilterElements[i].innerText()
        let activeData = mockApiData.filter((data) => data.completed === false).map(data => data.title)
        await expect(activeData).toContain(label)
    }

    // const btnCompleted = await page.getByText('Completed')
    const btnCompleted = await page.getByRole('link', { name: 'Completed' })
    await btnCompleted.click()
    await page.waitForTimeout(500);
    elements = await page.locator('label[data-testid="todo-title"]').all()
    await expect(elements.length).toEqual(1)
    for (let i = 0; i < elements.length; i++) {
        let label = await elements[i].innerText()
        let activeData = mockApiData.filter((data) => data.completed === true).map(data => data.title)
        await expect(activeData).toContain(label)
    }
})

test('UI changes update storage', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Add todo via UI
    await page.fill('.new-todo', 'Test todo from UI');
    await page.press('.new-todo', 'Enter');

    // Your challenge: Verify localStorage was updated
    const storageData = await page.evaluate(() => {
        return localStorage.getItem('react-todos');
    });

    const todos = JSON.parse(storageData);
    const found = todos.find(data => data.title === 'Test todo from UI')
    await expect(found.title).toEqual('Test todo from UI')
    await expect(found.completed).toEqual(false)
});