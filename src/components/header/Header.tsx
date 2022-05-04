import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/store";
import styled from "styled-components";
import logo from "../../assets/a-logo.svg";
import "../../assets/css/global.css";
interface HeaderProps {
  data: String[];
}

class MainHeader extends React.Component<HeaderProps> {
  getNames() {
    return this.props.data.map((name, key) => (
      <SLink
        key={key}
        to={`${name}`}
        style={({ isActive }) =>
          isActive ? { fontWeight: "600" } : { fontWeight: "400" }
        }
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {name.toLocaleUpperCase()}
      </SLink>
    ));
  }
  render() {
    return (
      <Header>
        <Wrapper>
          <NavLinksWrap>
            <Nav style={{}}>{this.getNames()}</Nav>
          </NavLinksWrap>
          <img src={logo} style={{ alignSelf: "center" }} alt="Green Logo" />
          <Actions></Actions>
        </Wrapper>
      </Header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.Categories.map((cat) => cat.name),
});

export default connect(mapStateToProps)(MainHeader);

const SLink = styled(NavLink)`
  font-family: Raleway;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
  padding: 0 16px;
`;
const Header = styled.header`
  position: relative;
  width: 100vw;
  height: 80px;
  background: white;
  left: 0px;
  top: 0px;
  margin: 0px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Nav = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const NavLinksWrap = styled.div`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 100px;
`;
const Actions = styled.div`
  width: 204px;
  height: 40px;
  background: white;
  margin: auto 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
