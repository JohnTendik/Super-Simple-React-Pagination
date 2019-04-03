import React from 'react';
import './pagination.css';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      itemPerPage: 10,
      page: 1,
      totalItems: React.Children.toArray(props.children).length,
      pageNumbersCount: 10,
      paginationNumber: 0,
      pageNeighbours: 2
    }

  }

  updatePage = (i) => {
    let page = i;
    this.setState({page});
  }

  fetchPageNumbers = () => {

    const totalPages = Math.ceil((this.state.totalItems / this.state.itemPerPage)) - 1;
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
      console.log(endPage);
      let pages = range(startPage, endPage);

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
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
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

    return range(1, totalPages);

  }

  render() {
    const pages = this.fetchPageNumbers();
    console.log(pages);
    // Render a placeholder
    return (
      <div>
        <ul className="jt-pagination">
          {pages.map(page=>{
            return (
              page === LEFT_PAGE ? <li className={this.state.page === page ? 'here' : ''} key={page} onClick={() => this.updatePage(this.state.page - 1)}>{page}</li> :
              page === RIGHT_PAGE ? <li className={this.state.page === page ? 'here' : ''} key={page} onClick={() => this.updatePage(this.state.page + 1)}>{page}</li> :
              <li className={this.state.page === page ? 'here' : ''} key={page} onClick={() => this.updatePage(page)}>{page}</li>
            ) 
          })}
        </ul>
        {React.Children.toArray(this.props.children).splice(this.state.page * this.state.itemPerPage, this.state.itemPerPage)}
      </div>
    )
  }

}

export default Pagination; 
