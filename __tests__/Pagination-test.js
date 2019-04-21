import React from 'react';
import Pagination from '../src/Pagination';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Pagination>
      {Array.from(Array(754).keys()).map((item, idx) => (
        <p key={idx}>{ item }</p>
      ))}
    </Pagination>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});