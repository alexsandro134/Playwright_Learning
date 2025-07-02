import { Page, test, expect } from "@playwright/test";
import { generateContactForm } from "../../utils/builderUser";
import { Automationexsercise } from "../../page-object/Automationexercise.page";

test.only("Contact Form_Valid data", async ({ page }) => {
    const form = generateContactForm();
    await page.goto("https://automationexercise.com/");
    await page.getByText(" Contact us").click();
    await page.waitForURL("https://automationexercise.com/contact_us");

    const txtGetInTouch = await page.getByText("Get In Touch");
    await expect(txtGetInTouch).toBeVisible();

    const automationexercisePage = new Automationexsercise(page);
    await automationexercisePage.inputContactForm(form);

    await page.waitForTimeout(5000)
    
    let btnSuccess = await page.locator('a.btn-success')
    await expect(btnSuccess).toBeVisible()
    // const txtSubmitSuccessfully = await page.locator("div.status")
    // let innerText = await txtSubmitSuccessfully.innerText();
    // await expect(innerText).toEqual(
    //     "Success! Your details have been submitted successfully."
    // );
});

test("Contact Form_Invalid data", async ({ page }) => {
    const form = generateContactForm("invalid");
    await page.goto("https://automationexercise.com/");
    await page.getByText(" Contact us").click();
    await page.waitForURL("https://automationexercise.com/contact_us");

    const txtGetInTouch = await page.getByText("Get In Touch");
    await expect(txtGetInTouch).toBeVisible();

    const automationexercisePage = new Automationexsercise(page);
    await automationexercisePage.inputContactForm(form);

    await page.locator('input[name="submit"]').click();
    let message = await automationexercisePage.getValidityPropertiesEmailInput()
    await expect(message).toEqual("Please include an '@' in the email address. 'invalid-email' is missing an '@'.");
});

// Please fill out this field.
test("Contact Form_Blank data", async ({ page }) => {
    const form = generateContactForm("blank");
    await page.goto("https://automationexercise.com/");
    await page.getByText(" Contact us").click();
    await page.waitForURL("https://automationexercise.com/contact_us");

    const txtGetInTouch = await page.getByText("Get In Touch");
    await expect(txtGetInTouch).toBeVisible();

    const automationexercisePage = new Automationexsercise(page);
    await automationexercisePage.inputContactForm(form);

    let message = await automationexercisePage.getValidityPropertiesEmailInput()
    await expect(message).toEqual("Please fill out this field.");
});
