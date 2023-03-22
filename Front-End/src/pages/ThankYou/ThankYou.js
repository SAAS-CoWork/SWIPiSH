import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const BackButton = styled.button`
  border: 1px solid black;
  background-color: #3f3f3a;
  height: 50px;
  width: 150px;
  border-radius: 8px;
  color: white;
  margin-top: 24px;
`;

function ThankYou() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to='/' replace />;
  localStorage.setItem('order', JSON.stringify(state));

  return (
    <Wrapper>
      <Title>感謝您的購買，我們會盡快將商品送達！</Title>
      <BackButton onClick={() => navigate('/orderStatus')}>查看訂單</BackButton>
    </Wrapper>
  );
}

export default ThankYou;
