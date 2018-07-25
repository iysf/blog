## 模拟实现new方法

未封装的使用方式：
```js
// 注意构造函数首字母大写
function Person (persons) {
  this.persons = persons
}

Person.prototype.html = function (html) {
  this.innerHTML = html
}

var person = new Person('yangshaofeng')

console.log(person)
console.log(new Person('yangshaofeng123'))
console.log(person.html())

```


```js
function Person (persons) {
  this.persons = 'abcswqfqwfq'
}

Person.prototype.html = function (html) {
  this.innerHTML = html
}

function _new (Constructor) {
  var example = {
    __proto__: Constructor.prototype
  }
  Constructor.apply(example)
  return example
}


var person1 = _new(Person)
person1.html('jfoqwjfpqw')
```
