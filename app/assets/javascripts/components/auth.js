export default {
  loggedIn() {
    // サーバにログイン情報を問い合わせる
  }
  // OnEnter Hook Function with Router
  executeCredentials(nextState, replace, next) {
    const query = nextState.location.query
      if (query.email && query.password) {
        serverAuth(query.qsparam, query.password)
          .then(
              () => next(),
              () => {
                replace('/error')
                  next()
              }
              )
      } else {
        replace('/error')
          next()
      }
  }

};

function serverAuth(email, password) {
  return new Promise((resolve, reject) => {
    // That server is gonna take a while
    setTimeout(() => {
      // ここをAPI認証に書き換える
      if(email === 'hiraokashi@gmail.com' && password === 'unkounko') {
        resolve('authenticated')
      } else {
        reject('nope')
      }
    }, 200)
  })
}
