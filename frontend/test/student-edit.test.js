import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`

test('Testing edit students', async t => {
    await t.navigateTo("/addStudent");
    await t.typeText(Selector("#student-id"), "999999");
    await t.typeText(Selector("#student-name"), "Pasindu Basnayaka");
    await t.typeText(Selector("#student-age"), "45");
    await t.typeText(Selector("#student-Hometown"), "catholic");
    await t.click(Selector("#student-add"));

    await t.navigateTo("/student");
    await t.click(Selector("#student-edit-999999"));

    await t.typeText(Selector("#student-name"), "Changed Student Name");
    await t.typeText(Selector("#student-age"), "99");
    await t.typeText(Selector("#student-Hometown"), "Hometown");
    await t.click(Selector("#student-edit"));

    await t.navigateTo("/student");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Changed Student Name");

    await t.navigateTo("/student");
    await t.click(Selector("#student-delete-999999"));
});