//const axios = require('axios');
import axios from 'axios'
import { assert } from 'chai'

describe('price data', () => {

    let data;
    let pyramid=[];
    let n=10;
    let max=10;
     let a_val_max=[]
     let a_val_min=[]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function  get2ValueMax(array,n){
       let arr=[]
        if(array[n] > array[n+1]) arr.push(array[n],n)
          else arr.push(array[n+1],n+1)
        return arr
    }
    function  get2ValueMin(array,n){
        let arr=[]
        if(array[n] < array[n+1]) arr.push(array[n],n)
        else arr.push(array[n+1],n+1)
        return arr
    }
    function  paintPyramid(array_pyramid,array_value,a_min){

        for(let i=0;i<n;i++){
            let s='';
            for(let j=n;j>i;j--) { s += " "; }
            if(array_value)
             console.log(s+array_pyramid[i]+s+array_value[i]+" / "+a_min[i])
            else
                console.log(s+array_pyramid[i])
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
           pyramid.push(arr)
       }
    })

    it('find way max min',()=>{
        let a_pos_max=[0]
        a_val_max.push(pyramid[0][0])

       for(let i=1; i < n; i++){
          let l=get2ValueMax(pyramid[i],a_pos_max[a_pos_max.length-1])
           a_pos_max.push(l[1])
           a_val_max.push(l[0])
       }

        let a_pos_min=[0]
        a_val_min.push(pyramid[0][0])

        for(let i=1; i < n; i++){
            let l=get2ValueMin(pyramid[i],a_pos_min[a_pos_min.length-1])
            a_pos_min.push(l[1])
            a_val_min.push(l[0])
        }
    })

    it('paint pyramid',()=>{
        console.log(" pyramid max / min")
        paintPyramid(pyramid,a_val_max,a_val_min)
        let max=a_val_max.reduce((a, b) => a + b)
        let min=a_val_min.reduce((a, b) => a + b)
        console.log("max=",max,"/ min=",min)

    })

    it('check all',()=>{

    })




});
