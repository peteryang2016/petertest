function resolve() {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
}
async function asyncFn() {
    let res = await resolve()
    console.log(res)
}
asyncFn()
console.log('2')