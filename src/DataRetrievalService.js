import * as $ from 'jquery';

export function sendCredentialsAsync(username, password) {
  return new Promise((resolve, reject) => {
    $.post('http://10.10.101.104:5443/api',
      {user: username, pw: password})
      .done((response) => resolve(response))
      .fail((response) => reject(response));
  });
}
