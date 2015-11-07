import * as $ from 'jquery';

export function sendCredentialsAsync(username, password) {
  return new Promise((resolve, reject) => {
    $.post('http://localhost:5443/api',
      {user: username, pw: password})
      .done((response) => resolve(response))
      .fail((response) => reject(response));
  });
}
