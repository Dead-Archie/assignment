import { css } from 'styled-components';

export default css`
  .filter-pills {
    background-color: #ddd;
    border: none;
    color: #868484;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
  }
  .filter-pills:after {
    content: ' X';
    padding-left: 10px;
    color: aliceblue;
  }
  .search-Box {
    width: 70%;
    float: left;
  }
`;
