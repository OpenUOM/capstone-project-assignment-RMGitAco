import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`

test('Testing add students', async t => {

    await t.navigateTo("/");

    
    await t.click(Selector("app-navbar").withAttribute("title", "Add New Student"));
    await t.typeText(Selector("#student-id"), "999999");
    await t.typeText(Selector("#student-name"), "Pasindu Basnayaka");
    await t.typeText(Selector("#student-age"), "45");
    await t.typeText(Selector("#student-Hometown"), "Catholic");
    await t.click(Selector("#student-add"));

    await t.navigateTo("/student");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Pasindu Basnayaka");
});
