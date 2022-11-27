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

// 
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    set(newValue) {
      value = newValue
      dep.notify()
    },
    get() {
      return value
    }
  })
})

// proxy

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

console.log('---age变化---');
obj.age = 100