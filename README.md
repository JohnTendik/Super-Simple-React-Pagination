# Super Simple React Pagination

Painfully simply pagination with React
Simple react pagination that anyone can reuse on multiple projects :) 

![build](https://travis-ci.com/JohnTendik/Super-Simple-React-Pagination.svg?branch=master) ![dev dependcies](https://david-dm.org/JohnTendik/Super-Simple-React-Pagination.svg) [![npm version](https://badge.fury.io/js/jt-react-pagination.svg)](https://badge.fury.io/js/jt-react-pagination)


## [View Demo](https://johntendik.github.io/Super-Simple-React-Pagination/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Literally nothing is required. This component has no dependencies. Its bare bones for a reason. Behold:

```
<Pagination>
  {items}
</Pagination>
```

### Installing

Install this component locally in your _react_ project

```
npm i jt-react-pagination --save
```

Import in your app

```
import Pagination from 'jt-react-pagination';
```

Use in your render
```
<Pagination
  prevText='<'
  nextText='>'
  pageNeighbours={2}>
  {Array.from(Array(754).keys()).map((item, idx) => (
    <p key={idx}>{ item }</p>
  ))}
</Pagination>
```

## Props
| Prop Name        | Desc                                                             | Prop Type      | Default    |
|------------------|------------------------------------------------------------------|----------------|------------|
| className        | Custom class to apply for styling                                | string         | ''         |
| itemPerPage      | How many items should be displayed per page                      | number         | 10         |
| prevText         | The prev button text                                             | [string, node] | 'Prev'     |
| nextText         | The next button text                                             | [string, node] | 'Next'     |
| paginationBefore | Renders the pagination above the children as well for long pages | bool           | false      |
| children         | *Required* The children element to render in pages               | [node, [node]] | *REQUIRED* |


## Running the tests

Coming soon

## Contributing

All issues, pull requests, suggestions and comments are welcome.

## Authors

* **John Tendik** - *Initial work* - [The Real JT](https://github.com/JohnTendik)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used, I believe someone from stack overflow for the pagination algo. Thanks sir.

