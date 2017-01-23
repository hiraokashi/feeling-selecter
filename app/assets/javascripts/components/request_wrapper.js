
/* セッション付きのリクエストを送るためのラッパー*/
export default {
  ajax(params) {
    var _params = params;
    var session = '';
    if (_params.session) {
      session = _params.session
      _params.beforeSend = function(request) {
        request.setRequestHeader('ACCESS_TOKEN', session);
      }
    }
    delete _params.session;
    return $.ajax(_params);
  }
};
