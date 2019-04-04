import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Welcome(props) {
  return <h1>Hello, test</h1>;
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(Welcome, domContainer);
