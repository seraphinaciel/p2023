import styled from "styled-components";
const Gnb = styled.header`
  color: red;
`;

function Header() {
  return (
    <>
      <ul id="skip">
        <li>
          <a href="#content">본문으로 바로가기</a>
        </li>
      </ul>
      <Gnb>
        <a href="/p2023/">
          <h1>happy</h1>
        </a>
      </Gnb>
    </>
  );
}
export default Header;
