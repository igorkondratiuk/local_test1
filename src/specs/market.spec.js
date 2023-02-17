//const axios = require('axios');
import axios from 'axios'
import { assert } from 'chai'

describe('price data', () => {

    let data;
    let pyramida=[];
    let n;
    let max;
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    before(async () => {
        await axios.get('https://api-pub.bitfinex.com/v2/ticker/tBTCUSD')
            .then((response) => {
                data = response;
            });
    });

    it('has 200 response code', () => {
        assert.equal(data.status, 200, 'the response code is not 200');
    });

    it('contains 10 values', () => {
        assert.equal(data.data.length, 10, 'number of values is not 10');
    });

    it('values should be numbers', () => {
        for (const value of data.data) {
            assert.isNumber(value, `value '${value}' is not a number`);
        }
    });

    it.only('create pyramid',()=>{
        max=10
        n=5
       for(let i=1; i<n+1; i++){
           let arr=[];
           for(let j=0; j<i; j++) {
               arr.push(getRandomInt(max))
           }
           pyramida.push(arr)
       }
    })
});
