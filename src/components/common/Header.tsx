import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../../api/signUp";
import { userCookieState } from "../../recoil/login/userInfo";

// 버튼 프롭 타입 정의
type CommonStyleButtonProps = {
  page: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Container = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 400px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1400px) and (min-width: 320px) {
    padding: 0 20px;
  }
`;

const DanimLogo = styled.h1`
  text-indent: -9999px;
  background: url("danimLogo.svg") no-repeat;
  width: 87px;
  height: 28px;
  overflow: hidden;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommonStyleButton = styled.button<CommonStyleButtonProps>`
  width: 110px;
  height: 34px;
  border: 1px solid #2e5902;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.page === "login" ? "#2E5902" : "#FFFFFF"};
  color: ${(props) => (props.page === "login" ? "#FFFFFF" : "#2E5902")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  width: 110px;
  height: 34px;
  border-radius: 50px;
  cursor: pointer;
  &:first-child {
    margin-right: 16px;
  }
`;

function Header() {
  const [userCookie, setUserCookie] = useRecoilState(userCookieState);

  // 네비게이트 함수 생성
  const navigate = useNavigate();

  // 다님 로고 클릭시
  const handleClickDanimLogo = () => {
    navigate("/");
  };

  // 회원가입 버튼 클릭시
  const handleClickSignUpButton = () => {
    navigate("/signUp");
  };

  // 로그인 버튼 클릭시
  const handleClickLoginButton = () => {
    navigate("/login");
  };

  // 로그아웃 버튼 클릭시
  const handleLogoutBtnClick = () => {
    fetchLogout();
    alert("로그아웃이 완료되었습니다!");
    setUserCookie("");
    navigate("/");
  };

  const handleCreatePostClick = () => {
    navigate("/create-post/step1");
  };

  return (
    <Container>
      <DanimLogo onClick={handleClickDanimLogo}>danim</DanimLogo>
      <ButtonContainer>
        {userCookie !== "" ? (
          <>
            <button type="button" onClick={handleCreatePostClick}>
              동행 만들기
            </button>
            <button type="button">채팅하기</button>
            <button type="button">마이 페이지</button>
            <button type="button" onClick={handleLogoutBtnClick}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <CommonStyleButton
              type="button"
              page="signUp"
              onClick={handleClickSignUpButton}
            >
              회원가입
            </CommonStyleButton>
            <CommonStyleButton
              type="button"
              page="login"
              onClick={handleClickLoginButton}
            >
              로그인
            </CommonStyleButton>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default Header;
