import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`

test('Testing delete students', async t => {
    await t.navigateTo("/addStudent");
    await t.typeText(Selector("#student-id"), "222222");
    await t.typeText(Selector("#student-name"), "Hiruni Gajanayake");
    await t.typeText(Selector("#student-age"), "45");
    await t.typeText(Selector("#student-Hometown"), "buddhist");
    await t.click(Selector("#student-add"));

    await t.navigateTo("/student");

    await t.click(Selector("#student-delete-222222"));

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).notContains("Hiruni Gajanayake");
});