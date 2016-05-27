var LOCAL_STORAGE_KEY_FOR_USERNAME = 'phonebook.credentials.username',
    LOCAL_STORAGE_KEY_FOR_PASSWORD = 'phonebook.credentials.password';

var canStoreCredentials = doesTheBrowserSupportLocalStorage();

function doesTheBrowserSupportLocalStorage () {
  var test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

var service = {
  canStoreCredentials: canStoreCredentials,

  storeCredentials: function (credentials) {
    if (canStoreCredentials) {
      localStorage[LOCAL_STORAGE_KEY_FOR_USERNAME] = credentials.username;
      localStorage[LOCAL_STORAGE_KEY_FOR_PASSWORD] = credentials.password;
    }
  },

  getStoredCredentials: getStoredCredentials,

  hasStoredCredentials: function () {
    var credentials = getStoredCredentials();
    return areCredentialsValid(credentials);
  }
};

export default service;

function getStoredCredentials () {
  if (canStoreCredentials) {
    return {
      username: localStorage[LOCAL_STORAGE_KEY_FOR_USERNAME],
      password: localStorage[LOCAL_STORAGE_KEY_FOR_PASSWORD]
    };
  }
}

function areCredentialsValid (credentials) {
  return credentials !== undefined && credentials.username !== undefined
                                   && credentials.password !== undefined;
}
