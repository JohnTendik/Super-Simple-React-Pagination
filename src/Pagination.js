import React from 'react';
import PropTypes from 'prop-types';

import './pagination.css';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

class Pagination extends React.Component {

  /**
   * Constructor
   * 
   * @param {Object} props - Passed in props
   *  @param {number} pageNeighbours - `how many neighbours should the center item have (1) < {5 6} [7] {8 9} (10)`
   *  @param {number} itemPerPage - length of items per page
   *  @param {(funtion | Node[])} prevText - Previous text
   *  @param {(funtion | Node[])} prevText - Next text
   */  
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pageNeighbours: props.pageNeighbours,
      itemPerPage: props.itemPerPage < 1 ? 1 : props.itemPerPage,
      totalItems: React.Children.toArray(props.children).length,
      prevText: props.prevText,
      nextText: props.nextText,
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.children !== this.props.children) {
      this.setState({ totalItems: React.Children.toArray(nextProps.children).length });
    }
    if(nextProps.itemPerPage !== this.props.itemPerPage) {
      this.setState({ itemPerPage: nextProps.itemPerPage < 1 ? 1 : nextProps.itemPerPage });
    }
  }

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }

  updatePage = (i) => {
    let page = i;
    this.setState({ page });

    if (typeof this.props.onPageUpdate === 'function') {
      this.props.onPageUpdate(page);
    }
  };

  fetchPageNumbers = () => {

    const totalPages = Math.ceil((this.state.totalItems / this.state.itemPerPage));
    const currentPage = this.state.page;
    const pageNeighbours = this.state.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = this.range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return this.range(1, totalPages);

  }

  renderPagination = () => {
    const pages = this.fetchPageNumbers();
    return (
      <nav className={`jt-pagination ${this.props.className}`}>
        {pages.map(page=>{
          return (
            page === LEFT_PAGE ? <button className={this.state.page === page ? 'here' : ''} key={page} onClick={() => this.updatePage(this.state.page - 1)}>{this.state.prevText}</button> :
            page === RIGHT_PAGE ? <button className={this.state.page === page ? 'here' : ''} key={page} onClick={() => this.updatePage(this.state.page + 1)}>{this.state.nextText}</button> :
            <button
              key={page}
              className={this.state.page === page ? 'here' : ''}
              onClick={() => this.updatePage(page)}>
              {page}
            </button>
          )
        })}
      </nav>
    );
  };

  render() {
    return (
      <div className='jt-pagination-container'>
        { this.props.paginationBefore && this.renderPagination() }
        <main className='jt-pagination-children'>
          { React.Children.toArray(this.props.children).splice((this.state.page - 1) * this.state.itemPerPage, this.state.itemPerPage) }
        </main>
        { this.renderPagination() }
      </div>
    )
  }
}

Pagination.defaultProps = {
  className: '',
  itemPerPage: 10,
  prevText: 'Prev',
  nextText: 'Next',
  pageNeighbours: 1,
  paginationBefore: false,
};

Pagination.propTypes = {
  className: PropTypes.string,
  onPageUpdate: PropTypes.func,
  itemPerPage: PropTypes.number,
  prevText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  nextText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  paginationBefore: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

};

export default Pagination;
