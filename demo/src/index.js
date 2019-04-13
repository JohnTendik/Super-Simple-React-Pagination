import React, { Fragment } from 'react';
import { render } from 'react-dom';

import Pagination from '../../src';

import './demo.css';

const App = () => (
  <Fragment>
    <article>
      <h2>Default</h2>
      <Pagination>
        {Array.from(Array(265).keys()).map((item, idx) => (
          <p key={idx}>{ item }</p>
        ))}
      </Pagination>
    </article>

    <article>
      <h2>#2</h2>
      <p>How many neighbours should the selected pagination have?</p>
      <p>pageNeighbours={0} will display [{`pageStart < 3 > pageEnd`}]</p>
      <p>pageNeighbours={1} will display [{`pageStart < 3 4 5 > pageEnd`}]</p>
      <ul>
        <li>{`pageNeighbours={2}`}</li>
      </ul>
      <Pagination
        prevText='<'
        nextText='>'
        pageNeighbours={2}>
        {Array.from(Array(754).keys()).map((item, idx) => (
          <p key={idx}>{ item }</p>
        ))}
      </Pagination>
    </article>

    <article>
      <h2>#3</h2>
      <p>The left and right arrow text allow strings or node elements. In this example im passing a {`<i>`} tag with font awesome class</p>
      <ul>
        <li>{`prevText={<i className='fa fa-angle-left'></i>}`}</li>
        <li>{`nextText={<i className='fa fa-angle-right'></i>}`}</li>
        <li>{`pageNeighbours={2}`}</li>
      </ul>
      <Pagination
        prevText={<i className='fa fa-angle-left'></i>}
        nextText={<i className='fa fa-angle-right'></i>}
        pageNeighbours={2}>
        {Array.from(Array(432).keys()).map((item, idx) => (
          <p key={idx}>{ item }</p>
        ))}
      </Pagination>
    </article>

    <article>
      <h2>#4</h2>
      <p>custom className. This will be applied to the {`<ul>`} element</p>
      <pre>
      {`
      ul.sample1Class li.here {
        background: transparent;
        color: #333;
        border: 0;
        border-bottom: solid 4px #f06d06;
      }
      `}
      </pre>
      <ul>
        <li>{`className='sample1Class'`}</li>
      </ul>
      <Pagination
        className='sample1Class'>
        {Array.from(Array(352).keys()).map((item, idx) => (
          <p key={idx}>{ item }</p>
        ))}
      </Pagination>
    </article>

    <article>
      <h2>#5</h2>
      <p>Render pagination at the top?</p>
      <ul>
        <li>{`paginationBefore={true}`}</li>
      </ul>
      <Pagination
        paginationBefore={true}>
        {Array.from(Array(512).keys()).map((item, idx) => (
          <p key={idx}>{ item }</p>
        ))}
      </Pagination>
    </article>
  </Fragment>
);
render(<App />, document.getElementById('root'));
