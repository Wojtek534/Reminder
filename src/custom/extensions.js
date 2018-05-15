export default class Ext extends Object {
  static PromiseToArray (promise) {
    console.log('ext')
    const arr = []
    let index = 0
    for (let key in promise) {
      const item = promise[key]
      item.id = key
      item.selected = true
      item.index = index
      arr.push(item)
      index++
    }
    return arr
  }
  static MyLog () {
    console.log('logging')
  }
  // Setting expiration date based on time in sec
  static SetExpDate (value) {
    const now = new Date()
    return new Date(now.getTime() + (value * 1000))
  }
}
