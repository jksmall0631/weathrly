import React from 'react';
import { render } from 'react-dom';

require('./styles/index.scss');

import Application from './Components/Application.js';

render(<Application/>, document.getElementById('application'));
