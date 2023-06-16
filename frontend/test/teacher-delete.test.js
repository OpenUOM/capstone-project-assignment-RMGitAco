import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing delete teachers', async t => {
    await t.navigateTo("/addTeacher");
    await t.typeText(Selector("#teacher-id"), "300000");
    await t.typeText(Selector("#teacher-name"), "Hasitha Fernando");
    await t.typeText(Selector("#teacher-age"), "45");
    await t.click(Selector("#teacher-add"));

    await t.navigateTo("/");

    await t.click(Selector("#teacher-delete-300000"));

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).notContains("Hasitha Fernando");
});