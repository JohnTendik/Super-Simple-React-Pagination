import React from 'react';
import Pagination from '../src/Pagination';
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup} from 'react-testing-library';

test('can render output and match snapshot', () => {
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

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test('change next page', () => {
  const utils = render(<Pagination>
    {Array.from(Array(754).keys()).map((item, idx) => (
      <p key={idx}>{ item }</p>
    ))}
  </Pagination>)
  const nextButton = utils.getByText('Next')

  fireEvent.click(nextButton)
  expect(utils.getByText('2').className).toBe('here')

  fireEvent.click(nextButton)

  expect(utils.getByText('2').className).toBe('')
  expect(utils.getByText('3').className).toBe('here')
  
  fireEvent.click(nextButton)
  expect(utils.getByText('3').className).toBe('')
  expect(utils.getByText('4').className).toBe('here')  
});