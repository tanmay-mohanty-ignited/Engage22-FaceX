// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon, LogoutIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const handleLogout = () => {
    try {
      localStorage.removeItem('AccessToken');
      alert("You have been successfully logged out.");
    } catch (err) { console.log(err); };
  }

  // Chakra Color Mode
  let inputBg = "#0F1535";
  let mainText = "gray.400";
  let navbarIcon = "white";
  let searchIcon = "white";

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'>
      <NavLink to='/auth/signin'>
        <Button
          ms='0px'
          px='0px'
          me={{ sm: "2px", md: "16px" }}
          onClick={handleLogout}
          color={navbarIcon}
          variant='transparent-with-icon'
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <LogoutIcon color={navbarIcon} w='22px' h='22px' me='0px' />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <LogoutIcon color={navbarIcon} w='22px' h='22px' me='0px' />
            ) : (
              ""
            )
          }>
          <Text display={{ sm: "none", md: "flex" }}>Logout</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        iconColor='white'
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
