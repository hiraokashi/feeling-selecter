/* Authentication Utility */
import { endpoint} from './endpoint';
import rw from './request_wrapper';
export default {
  connect(session, done, fail) {
    // サーバにログイン済みか問い合わせる
    rw.ajax({
      url: endpoint.sessions_path,
      type: 'GET',
      dataType: 'json',
      session: session
    }).done(done).fail(fail);
  },
  create(email, password, done, fail) {
    rw.ajax({
      url: endpoint.sessions_path,
      type: 'POST',
      dataType: 'json',
      data: {user: {email: email, password: password }},
    }).done(done).fail(fail);
  },
  destroy(session, done, fail) {
    rw.ajax({
      url: endpoint.sessions_path,
      type: 'DELETE',
      dataType: 'json',
      session: session
    }).done(done).fail(fail);
  }
};
