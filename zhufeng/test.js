let obj= {path:'etc/abc',component:'Logo',index:'1'}
let {path,...reset} = obj;
console.log(path);//etc/abc
console.log(reset);//{ component: 'Logo', index: '1' }
console.log({...reset})//{ component: 'Logo', index: '1' }
