import { endpoint} from './endpoint';
export default {
  connect(token, done, fail) {
    // サーバにログイン済みか問い合わせる
    $.ajax({
      url: endpoint.sessions_path,
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('ACCESS_TOKEN', token);
      },
    }).done(done).fail(fail);
  },
  login(email, password, done, fail) {
    $.ajax({
      url: endpoint.sessions_path,
      type: 'POST',
      dataType: 'json',
      data: {user: {email: email, password: password }},
    }).done(done).fail(fail);
  }
};
