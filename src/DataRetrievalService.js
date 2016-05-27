import * as $ from 'jquery';

export function sendCredentialsAsync(username, password, useHash) {
  return new Promise((resolve, reject) => {
    const data = useHash ? {user: username, 'pw-hash': password} : {user: username, pw: password};
    $.post('../ldap/api.php?action=contacts', data)
      .done((response) => {
        return resolve(response);
      })
      .fail((response) => reject(response));
  });
}
