require("babel-polyfill");

import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PaulPhonebook from './PaulPhonebook';

ReactDOM.render(
  <PaulPhonebook />,
  document.getElementById('app')
);
