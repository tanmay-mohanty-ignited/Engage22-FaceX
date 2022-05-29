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

import React, {useState, useEffect} from "react";
import axios from "axios";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Spacer,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesTableRow from "components/Tables/TablesTableRow";

// Data

// Icons
import { SearchIcon } from "@chakra-ui/icons";
let inputBg = "#0F1535";
let mainText = "gray.400";
let searchIcon = "white";

/**************************************************************************************
 * Return function of Criminal Records Table
 **************************************************************************************/

function Tables() {

  const [tablesTableData, setTablesTableData] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem('AccessToken')

  useEffect(()=> {
    try{
      axios.get("http://127.0.0.1:8000/api/criminals/", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => setTablesTableData(res.data.data))
      .catch(err => console.log(err))
    }catch(err){console.log(err);};
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='lg' color='#fff' fontWeight='bold'>
            Criminal Records
          </Text>
          <Spacer />
          <InputGroup
            cursor='pointer'
            bg={inputBg}
            borderRadius='15px'
            borderColor='rgba(226, 232, 240, 0.3)'
            w={{
              sm: "200px",
              md: "200px",
            }}
            me={{ sm: "auto", md: "20px" }}>
            <InputLeftElement
              children={
                <IconButton
                  bg='inherit'
                  borderRadius='inherit'
                  _hover='none'
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                  icon={
                    <SearchIcon color={searchIcon} w='15px' h='15px' />
                  }></IconButton>
              }
            />
            <Input
              fontSize='xs'
              py='11px'
              color={mainText}
              placeholder='Search name...'
              borderRadius='inherit'
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px' color='gray.400'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Name
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Criminal ID
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Past Crimes
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Current Status
                </Th>
                <Th borderBottomColor='#56577A'></Th>
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((row, index, arr) => {
                return (
                  <TablesTableRow
                    uuid={row.id}
                    name={row.name}
                    logo={"http://localhost:8000" + row.image_url}
                    crimes={row.crimes}
                    status={row.current_status}
                    lastItem={index === arr.length - 1 ? true : false}
                    setList={setTablesTableData}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
