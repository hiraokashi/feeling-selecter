export default {
  set(key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    } else {
      console.log('local strage not defined')
    }
  },
  get(key, value) {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    } else {
      console.log('local strage not defined')
      return ''
    }
  },
  remove(key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    } else {
      console.log('local strage not defined')
    }
  },
  valid() {
    !!window.localStorage
  }
};
