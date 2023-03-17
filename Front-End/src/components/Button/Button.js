import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Wrapper = styled.button`
  position: relative;
  width: 240px;
  height: 60px;
  margin-top: 50px;
  border: solid 1px #979797;
  background-color: black;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
  margin-left: auto;
  display: block;
  cursor: ${({ $loading }) => $loading ? "wait" : "pointer"};

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 44px;
    margin-top: 36px;
    border: solid 1px black;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const Loading = styled(ReactLoading)`
  position: absolute;
  right: 24px;
  top: 18px;
`;

export function Button({ children, loading, onClick, ...props }) {
  const handleClick = () => {
    if (loading) return;
    onClick();
  };
  return (
    <Wrapper {...props} $loading={loading} onClick={handleClick}>
      {children}
      {loading && (
        <Loading
          type="spinningBubbles"
          color="#fff"
          height={24}
          width={24}
        />
      )}
    </Wrapper>
  )
}
