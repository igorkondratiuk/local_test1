//const axios = require('axios');
import axios from 'axios'
import { assert } from 'chai'

describe('price data', () => {

    let data;
    let pyramida=[];
    let n=10;
    let max=10;
    let a_pos=[0]
    let a_val=[]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function  get2Value(array,n){
       let arr=[]
        if(array[n]>=array[n+1]) arr.push(array[n],n)
          else arr.push(array[n+1],n+1)
        return arr
    }
    function  paintPyramida(array_pyramida,array_value){
        for(let i=0;i<n;i++){
            let s='';
            for(let j=n;j>i;j--) { s += " "; }
            if(array_value)
             console.log(s+array_pyramida[i]+s+array_value[i])
            else
                console.log(s+array_pyramida[i])
        }
    }

    before(async () => {
        await axios.get('https://api-pub.bitfinex.com/v2/ticker/tBTCUSD')
            .then((response) => {
                data = response;
            });
    });

    it.skip('has 200 response code', () => {
        assert.equal(data.status, 200, 'the response code is not 200');
    });

    it.skip('contains 10 values', () => {
        assert.equal(data.data.length, 10, 'number of values is not 10');
    });

    it.skip('values should be numbers', () => {
        for (const value of data.data) {
            assert.isNumber(value, `value '${value}' is not a number`);
        }
    });

    it('create pyramid',()=>{
       for(let i=1; i < n+1; i++){
           let arr=[];
           for(let j=0; j<i; j++) {
               arr.push(getRandomInt(max))
           }
           pyramida.push(arr)
       }
    })

    it('find way',()=>{
       a_val.push(pyramida[0][0])

       for(let i=1; i < n; i++){
          let l=get2Value(pyramida[i],a_pos[a_pos.length-1])
           a_pos.push(l[1])
           a_val.push(l[0])
       }
        paintPyramida(pyramida,a_val)
    })


});
