let obj = {
  name: 'korea',
  age: 20
}

class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    fn && this.reactiveFns.push(fn)
  }

  notify() {
    for (const fn of this.reactiveFns) {
      fn()
    }
  }
}

const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
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
dep.notify()