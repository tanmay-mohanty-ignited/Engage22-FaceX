/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { QuestionIcon} from "@chakra-ui/icons";
import { GithubIcon } from "components/Icons/Icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import IconBox from "components/Icons/IconBox";
import React from "react";

export function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius='15px'
      flexDirection='column'
      bgImage={SidebarHelpImage}
      bgSize='cover'
      bgPosition='center'
      justifyContent='flex-start'
      alignItems='start'
      p='16px'
      minH='170px'
      minW='218px'>
      <IconBox width='35px' h='35px' bg='white' mb='auto'>
        <Link href="https://github.com/tanmay-mohanty-ignited/Engage22-FaceX">
          <GithubIcon color='brand.400' h='28px' w='28px' />
        </Link>
      </IconBox>
      <Text fontSize='sm' color='white' fontWeight='bold'>
        Check out the GitHub Link of the Project
      </Text>
      <Link
        w='100%'>
        <Button
          fontSize='10px'
          fontWeight='bold'
          w='100%'
          bg='transparent'
          _hover='none'
          color='white'>
        </Button>
      </Link>
    </Flex>
  );
}
