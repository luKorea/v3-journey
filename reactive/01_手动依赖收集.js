let obj = {
  name: 'korea',
  age: 20
}
let reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
  fn()
}

watchFn(function bar() {
  console.log(obj.name, '--依赖变化---')
  console.log(obj.age);
})

watchFn(function foo() {
  console.log(obj.age)
  console.log(obj.name);
})

console.log('----name变化---')
obj.name = 'kobe'
for (const fn of reactiveFns) {
  fn()
}