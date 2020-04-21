import { css } from 'styled-components';

export default css`
  margin-top: 2rem;
  padding: 0 0 0 2rem;

  .product-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0.75rem 0px 0.375rem;
    border-bottom: 1px solid rgb(68, 68, 68);
  }

  .container-Background {
    height: 100%;
    color: rgb(255, 152, 0);
    background: rgb(51, 51, 51);
    max-width: 300px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 2px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .image-container {
    position: relative;
    width: 300px;
    height: 300px;
  }
  .info-container {
    padding: 1rem;
  }

  .product-row {
    width: 100%;
  }
  .product-key {
    float: left;
    width: 30%;
    text-transform: uppercase;

    font-size: 0.7rem;
    font-weight: 400;
    color: rgb(158, 158, 158);
  }
  .product-value {
    color: #bab53d;
    float: right;
    width: 70%;
    text-align: right;

    font-size: 0.9rem;
    font-weight: 200;
    padding: 0px;
    margin: 0px;
  }
  .product-image {
    width: 100%;
  }
  .product-name {
    width: 100%;
    opacity: 0.8;
    position: absolute;
    bottom: 0px;
    background: rgb(32, 35, 41);
    padding: 0.625rem;
  }
  .product-title {
    font-weight: bold;
    font-size: 16px;
  }
`;
