import { Page } from "@playwright/test";

export class TodoMVCPage {
    constructor(private page: Page) { }

    public inputTodo = this.page.getByPlaceholder('What needs to be done?')
    public linkCompleted = this.page.getByRole('link').getByText('Completed')
    public linkAll = this.page.getByRole('link').getByText('All')
    public linkActive = this.page.getByRole('link').getByText('Active')
    public chkboxComplete = (task: string) => { return this.page.getByText(task).locator('..').getByRole('checkbox') }
    public btnDeleteTask = (task: string) => { return this.page.locator(`//label[contains(text(), '${task}')]/following-sibling::button`) }
    public txtTask = (task: string) => { return this.page.getByText(task) }

    async navigate() {
        await this.page.goto('/todomvc/#');
    }

    async fillinTodo(task: string) {
        await this.inputTodo.fill(task)
        await this.inputTodo.press('Enter');
    }

    async markTaskComplete(task: string) {
        await this.chkboxComplete(task).check()
    }

    async deleteTask(task: string) {
        (await this.getTask(task)).hover()
        await this.btnDeleteTask(task).click()
    }

    async getTask(task: string) {
        return await this.txtTask(task)
    }

    async filterAll() {
        await this.linkAll.click()
    }

    async filterActive() {
        await this.linkActive.click()
    }

    async filterCompleted() {
        await this.linkCompleted.click()
    }
}