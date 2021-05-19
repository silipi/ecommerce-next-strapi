import styled from 'styled-components';

export const Container = styled.header`
  
  height: 70px;
  width: 100%;
  background-color: #ffffff;

  padding: 0 25px;
  margin-bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid rgb(93, 90, 119);

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > span {
    margin-right: 12px;
  }

  & > div button.btnLogin {
    height: 34px;
    color: white;
    background-color: var(--blue);
    border: none;
    padding: 0 1.1rem;
    border-radius: 4px;
    margin-right: 1.2rem;

    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
    transition: all ease-in-out 100ms;
  }

  & > div button.btnLogin:hover {
    filter: brightness(1.05);
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  .userLoggedContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 1.2rem;
  }

  .userLoggedContainer button.btnLogout {
    font-size: 14;
    color: var(--blue);
    background: none;
    border: none;
    outline: none;
    text-decoration: underline;
    font-weight: 600;
  }

  .userLoggedContainer button.btnLogout:hover {
    color: var(--blue-dark);
  }

`;