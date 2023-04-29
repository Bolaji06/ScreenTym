// const sum = require('./sample.js')

// test('add two number', ()=>{
//     expect(sum.sum(1, 4)).toBe(5)
// });

const companyData = require('./company.js');

global.fetch = jest.fn(() =>{
    Promise.resolve({
        json: () => Promise.resolve({data: 'test data'}),
    })
});

describe('Test API request and UI update', ()=>{
    test('companyData should return data from API', async () =>{
        const data = await companyData();

        expect(data).toEqual({data: 'test data'})
    });
    test('updateUI should upadet the UI data', ()=>{
        console.log({data: 'test data'})
    })
})
