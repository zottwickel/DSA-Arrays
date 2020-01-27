const Memory = require('./memory')

let memory = new Memory()

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length)
  }
  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }

    memory.set(this.ptr + this.length, value)
    this.length++
  }

  _resize(size) {
    const oldPtr = this.ptr
    this.ptr = memory.allocate(size)
    if (this.ptr === null) {
      throw new Error('Out of memory')
    }
    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr)
    this._capacity = size
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error')
    }
    const value = memory.get(this.ptr + this.length - 1)
    this.length--
    return value
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
    memory.set(this.ptr + index, value)
    this.length++
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
    this.length--
  }
}

function urlIfy(str) {
  str = str.split(' ').join('%20')
  return str
}

function filterLessThanFive(arr) {
  for (i=0;i<arr.length;i++) {
    if (arr[i] < 5) {
      arr.splice(i,1)
      i--
    }
  }
  return arr
}

function maxSum(arr) {
  let ans = 0
  let sum = 0
  for (i=0;i<arr.length;i++) {
    for (j=arr.length;j>i;j--) {
      sum = arr.slice(i,j).reduce((a,b) =>
        a + b
      )
      if (sum>ans) {ans=sum}
    }
  }
  for (i=arr.length;i>=0;i--) {
    for (j=0;j<i;j++) {
      sum = arr.slice(j,i).reduce((a,b) =>
        a + b
      )
      if (sum>ans) {ans=sum}
    }
  }
  return ans
}

function merge(arr1, arr2) {
  return arr1.concat(arr2).sort((a, b) => a - b)
}

function remove(str, chars) {
  for (i=0;i<str.length;i++) {
    for (j=0;j<chars.length;j++) {
      if (str[i] === chars[j]) {
        str = str.substring(0,i) + str.substring(i+1,str.length)
        i--
      }
    }
  }
  return str
}

function products(arr) {
  let ans = []
  for (i=0;i<arr.length;i++) {
    ans.push(arr.reduce((a,b) => a*b)/arr[i])
  }
  return ans
}

function twoDArray(arr) {
  let rows = []
  let columns = []
  for(i=0;i<arr.length;i++) {
    for(j=0;j<arr[i].length;j++) {
      if (arr[i][j] === 0) {
        rows.push(i)
        columns.push(j)
      }
    }
  }
  for(i=0;i<arr.length;i++) {
    for(j=0;j<arr[i].length;j++) {
      if (columns.includes(j) || rows.includes(i)) {
        arr[i][j] = 0
      }
    }
  }
  return arr
}

function stringRotation(str1, str2) {
  let i = 0
  let resp = false
  function check(str1, str2) {
    if (str1 === str2) {
      resp = true
    } else if (i === (str1.length - 1)) {
      return
    }
    i++
    str1 = str1[str1.length - 1] + str1.substring(0, str1.length - 1)
    check(str1, str2)
  }
  check(str1, str2)
  return resp
}

function main() {
  Array.SIZE_RATIO = 3

  let arr = new Array()

  arr.push(3)
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  arr.pop()
  arr.pop()
  arr.pop()

  console.log(arr)
}