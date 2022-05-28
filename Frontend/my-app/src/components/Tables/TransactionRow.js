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

import { Box, Flex, Icon, Text, Avatar } from "@chakra-ui/react";
import React from "react";

function TransactionRow(props) {
  const { name, date, logo, price } = props;

  return (
    <Flex mb='24px' justifyContent='space-between'>
      <Flex alignItems='center'>
      <Avatar
            src={logo}
            w='50px'
            borderRadius='10px'
            me='20px'
            border='none'
          />
        <Flex direction='column'>
          <Text fontSize='sm' color='#fff' mb='4px'>
            {name}
          </Text>
          <Text fontSize={{ sm: "xs", md: "sm" }} color='gray.400'>
            {date}
          </Text>
        </Flex>
      </Flex>
      <Box color = "#ffffff">
        <Text fontSize='sm'>{price} sec</Text>
      </Box>
    </Flex>
  );
}

export default TransactionRow;
