import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  width: 17rem;
  height: 17rem;

  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  & > img {
    border-radius: 5%;
  }
  
  div {
    text-align: center;
  }

  div > h3 {
    height: 2.6rem;
    width: 16rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    margin-bottom: 1.1rem;
    font-weight: 400;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  div p {
    font-family: "Barlow";
    font-weight: 600;
    padding-bottom: 0.5rem;
  }
`;