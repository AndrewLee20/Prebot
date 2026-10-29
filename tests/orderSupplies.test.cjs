const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSync } = require('esbuild');

// 프로젝트의 TypeScript를 기존 esbuild로 실행하므로 추가 패키지가 필요 없다.
const bundle = buildSync({
  stdin: {
    contents: `export * from './services/orderService'; export * from './data/menu';`,
    resolveDir: path.resolve(__dirname, '../src'),
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const compiled = { exports: {} };
new Function('module', 'exports', bundle.outputFiles[0].text)(compiled, compiled.exports);
const { createOrderPayload, printOrderJson, menuItems } = compiled.exports;

function line(id, size = 'L', quantity = 1, temperature = 'ICE', dineType = 'FOR_HERE') {
  const item = menuItems.find((menu) => menu.id === id);
  return { menuId: id, item, size, quantity, temperature, dineType, key: `${id}:${size}:${temperature}` };
}
function payload(items) {
  return createOrderPayload({
    id: 'order-test', orderNumber: 7, status: 'RECEIVED', items,
    totalPrice: 10000, createdAt: '2026-10-21T06:30:25.000Z',
  });
}
const supply = (item, quantity, size) => ({ item, ...(size ? { size } : {}), quantity });

test('음료 1개: 같은 사이즈 컵/뚜껑, 빨대, 물티슈', () => {
  assert.deepEqual(payload([line('americano')]).supplies, [
    supply('cup', 1, 'L'), supply('lid', 1, 'L'), supply('straw', 1), supply('wet_tissue', 1),
  ]);
});
test('여러 음료: 수량을 곱하고 같은 사이즈 물품은 합산', () => {
  assert.deepEqual(payload([line('americano', 'L', 2), line('cafe-latte', 'L', 1, 'HOT')]).supplies, [
    supply('cup', 3, 'L'), supply('lid', 3, 'L'), supply('straw', 3), supply('wet_tissue', 3),
  ]);
});
test('서로 다른 사이즈: 컵/뚜껑 분리, 공통 소모품 합산', () => {
  assert.deepEqual(payload([line('americano', 'L', 2), line('americano', 'M')]).supplies, [
    supply('cup', 2, 'L'), supply('lid', 2, 'L'), supply('straw', 3), supply('wet_tissue', 3),
    supply('cup', 1, 'M'), supply('lid', 1, 'M'),
  ]);
});
test('케이크는 포크와 물티슈만: 음료와 함께 주문해도 합산', () => {
  assert.deepEqual(payload([line('americano'), line('cheesecake', 'S', 2)]).supplies, [
    supply('cup', 1, 'L'), supply('lid', 1, 'L'), supply('straw', 1), supply('wet_tissue', 3),
    supply('fork', 2),
  ]);
  assert.deepEqual(payload([line('chocolate-cake', 'S')]).supplies, [supply('fork', 1), supply('wet_tissue', 1)]);
});
test('모든 기존 메뉴에 물품 규칙 적용, 매장/포장 규칙 동일', () => {
  for (const item of menuItems) {
    const selection = line(item.id, item.sizes[0], 1, item.temperatures[0]);
    const here = payload([selection]);
    const takeout = payload([{ ...selection, dineType: 'TO_GO' }]);
    assert.equal(here.orderType, 'for_here');
    assert.equal(takeout.orderType, 'takeout');
    assert.deepEqual(here.supplies, takeout.supplies);
  }
});
test('기존 주문번호/메뉴/옵션 유지, 입력 불변, JSON 문자열 출력 한 번', () => {
  const items = [line('americano', 'L', 2)];
  const before = JSON.stringify(items);
  const result = payload(items);
  assert.equal(result.orderId, 7);
  assert.deepEqual(result.items, [{ menu: 'Americano', temperature: 'ICE', size: 'L', quantity: 2 }]);
  assert.equal(JSON.stringify(items), before);
  const messages = [];
  const original = console.log;
  try {
    console.log = (message) => messages.push(message);
    printOrderJson(result);
  } finally { console.log = original; }
  assert.equal(messages.length, 1);
  assert.ok(messages[0].includes(JSON.stringify(result, null, 2)));
});
test('빈 주문, 혼합 주문, 잘못된 수량은 JSON 생성 전 차단', () => {
  assert.throws(() => payload([]));
  assert.throws(() => payload([line('americano'), line('cafe-latte', 'M', 1, 'HOT', 'TO_GO')]));
  assert.throws(() => payload([line('americano', 'L', 0)]));
});
