import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 4em;
  color: #1a8cff;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #333;
  text-align: center;
`;
const NotFoundPage = () => {
  return (
    <Container>
      <div>
        <Title>404</Title>
        <Description>Page Not Found</Description>
        {/* 원하는 추가 컨텐츠를 여기에 추가할 수 있습니다 */}
      </div>
    </Container>
  );
};

export default NotFoundPage;
