const sum = require('./sample');

test('add two number', ()=>{
    expect(sum(1, 4)).toBe(5)
})
