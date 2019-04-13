import React from 'react';
import { render } from 'react-dom';

import Pagination from '../../src';

console.log(Array.from(Array(12).keys()));

const App = () => (
  <Pagination>
    {Array.from(Array(145).keys()).map((item, idx) => (
      <p key={idx}>{ item }</p>
    ))}
  </Pagination>
);
render(<App />, document.getElementById('root'));
