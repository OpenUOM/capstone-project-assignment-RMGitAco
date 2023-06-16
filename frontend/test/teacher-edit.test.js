import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
test('Testing edit teachers', async t => {
    await t.navigateTo("/");
    await t.click(Selector("#teacher-edit-10003"));

    await t.typeText(Selector("#teacher-name"), "Changed Teacher Name");
    await t.typeText(Selector("#teacher-age"), "99");
    await t.click(Selector("#teacher-edit"));

    await t.navigateTo("/");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Changed Teacher Name");

    await t.click(Selector("#teacher-delete-10003"));
});
