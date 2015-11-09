import * as $ from 'jquery';

export function sendCredentialsAsync(username, password) {
  return new Promise((resolve, reject) => {
    $.post('api.php',
      {user: username, pw: password})
      .done((response) => resolve(JSON.parse(response)))
      .fail((response) => reject(response));
  });
}
