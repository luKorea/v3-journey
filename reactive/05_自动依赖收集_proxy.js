let obj = reactive({
  name: 'korea',
  age: 20
});

let reactiveFn = null
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    fn && this.reactiveFns.add(fn)
  }

  depend() {
    if(reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }
  notify() {
    for (const fn of this.reactiveFns) {
      fn()
    }
  }
}

const objMap = new WeakMap()
function getDep(obj, key) {
  // 1. 根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }
  // 2. 根据key找到对应的dep
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }
  return dep
}

function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}

function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const dep = getDep(target, key)
      dep.notify()
    },
    get(target, key, receiver) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    }
  })
  return objProxy;
}

// 

// proxy

watchFn(function bar() {
  console.log(obj.name, '--依赖变化---')
  console.log(obj.age);
})

watchFn(function foo() {
  console.log(obj.age)
  console.log('foo函数执行')
})

console.log('----name变化---')
obj.name = 'kobe'

// console.log('---age变化---');
// obj.age = 100