export default {
  get(name) {
    return JSON.parse(localStorage.getItem(name))
  },
  remove(name) {
    localStorage.removeItem(name)
  },
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val))
  },
  add(name, addVal) {
    let oldVal = JSON.parse(localStorage.getItem(name))
    let newVal = oldVal.concat(addVal)
    localStorage.setItem(name, JSON.stringify(newVal))
  },
  getInfo() {
    return JSON.parse(localStorage.getItem('userInfo'))
  },
  getAddress() {
    return JSON.parse(localStorage.getItem('address'))
  }
}
