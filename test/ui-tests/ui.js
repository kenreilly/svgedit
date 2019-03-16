// https://github.com/DevExpress/testcafe
// https://devexpress.github.io/testcafe/documentation/test-api/
// https://github.com/helen-dikareva/axe-testcafe
import {Selector} from 'testcafe';
import {
  approveStorage, approveStorageAndOpenMainMenu
} from '../ui-test-helper.js';

fixture`TestCafe UI tests`
  .page`http://localhost:8000/editor/svg-editor.html`;

test('Editor - No parameters: Export button', async (t) => {
  await approveStorageAndOpenMainMenu(t)
    .expect(Selector('#tool_export')).ok('Has open button');
});

test('Editor - No parameters: Export button clicking', async (t) => {
  await approveStorageAndOpenMainMenu(t)
    .click('#tool_export')
    .expect(Selector('#dialog_content select')).ok('Export dialog opens');
});

test('Editor - No parameters: Drag control point of arc path', async (t) => {
  const randomOffset = () => Math.round(10 + Math.random() * 40);
  await approveStorage(t)
    .click('#tool_source')
    .selectTextAreaContent('#svg_source_textarea')
    .typeText('#svg_source_textarea', `<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
 <g class="layer">
  <title>Layer 1</title>
  <path d="m187,194a114,62 0 1 0 219,2" fill="#FF0000" stroke="#000000" stroke-width="5"/>
 </g>
</svg>`)
    .click('#tool_source_save')
    .click('#svg_1')
    .click('#svg_1')
    .drag('#pathpointgrip_0', randomOffset(), randomOffset(), {offsetX: 2, offsetY: 2})
    .drag('#pathpointgrip_1', randomOffset(), randomOffset(), {offsetX: 2, offsetY: 2})
    .expect(Selector('#svg_1').getAttribute('d')).notContains('NaN');
});
