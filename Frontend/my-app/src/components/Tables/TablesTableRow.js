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

import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Icon,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function TablesTableRow(props) {
  const {
    logo,
    name,
    uuid,
    crimes,
    status,
    lastItem,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const history = useHistory();
  const token = localStorage.getItem('AccessToken')

  const handleDelete = id => {
    const confirmMsg = window.confirm("Are you sure you want to delete " + props.name + "'s criminal record ?");
    if(confirmMsg){
      try{
        axios.delete("http://localhost:8000/api/criminals/" + id, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res.data);
          props.setList(list => list.filter(l => l.id !== id));
        })
        .catch(err => console.log(err))
      }catch(err){console.log(err);};
    }
  }

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Avatar
            src={logo}
            w='50px'
            borderRadius='10px'
            me='20px'
            border='none'
          />
          <Flex direction='column'>
            <Text
              fontSize='sm'
              color='#fff'
              fontWeight='normal'
              minWidth='100%'>
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='150px'>
        <Flex direction='column'>
          <Text fontSize='xs' color='#fff' fontWeight='normal'>
            {uuid}
          </Text>
        </Flex>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Flex direction='column'>
          <Text fontSize='sm' color='#fff' fontWeight='normal'>
            {crimes}
          </Text>
        </Flex>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
          {status}
        </Text>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Button p='0px' bg='transparent' variant='no-hover' onClick={() => history.push("/admin/edit-criminal/" + uuid)}>
        <Icon color = "gray.400" as={FaPencilAlt} me='6px' w='12px' h='12px' />
          <Text
            fontSize='sm'
            color='gray.400'
            fontWeight='bold'
            cursor='pointer'>
            Edit
          </Text>
        </Button>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Button p='0px' bg='transparent' variant='no-hover' onClick={() => handleDelete(uuid)}>
        <Icon color = "red.400" as={FaTrashAlt} me='6px' w='12px' h='12px' />
          <Text
            fontSize='sm'
            color='red.400'
            fontWeight='bold'
            cursor='pointer'>
            Delete
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
