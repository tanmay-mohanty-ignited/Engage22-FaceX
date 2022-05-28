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

import { Box, Button, Flex, Icon, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function BillingRow(props) {
  const { name, crimes, current_status, uuid, logo } = props;

  return (
    <Box
      p='24px'
      bg='linear-gradient(127.09deg, rgba(24, 29, 60, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)'
      my='22px'
      borderRadius='20px'>
      <Flex justify='space-between' w='100%' align='flex-start'>
        <Flex direction='column' maxW='70%'>
          <Text color='#fff' fontSize='md' mb='10px'>
            {name}
          </Text>
          <Text color='gray.400' fontSize='xs'>
            Past Crimes: {window.innerWidth < 768 ? <br /> : null}
            <Text as='span' color='gray.500'>
              {crimes}
            </Text>
          </Text>
          <Text color='gray.400' fontSize='xs'>
            Current Status:{" "}
            <Text as='span' color='gray.500'>
              {current_status}
            </Text>
          </Text>
          <Text color='gray.400' fontSize='xs'>
            Criminal ID:{" "}
            <Text as='span' size="xs" color='gray.500'>
              {uuid}
            </Text>
          </Text>
        </Flex>
        <Flex>
        <Avatar
            src={logo}
            w='100px'
            h='100px'
            borderRadius='40px'
            me='20px'
            border='none'
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingRow;
