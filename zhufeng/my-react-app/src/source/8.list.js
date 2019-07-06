import React from 'react';
import ReactDOM from 'react-dom';
let arr = [1,2,3,4,5];
let listItem = arr.map((item,index)=>{
    return <li key={index}>{item}</li>
})
console.log(listItem);
ReactDOM.render(<ul>{listItem}</ul>,document.getElementById('root'))
