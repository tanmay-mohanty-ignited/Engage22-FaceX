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
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"
import { useParams, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  Input,
  Switch,
  DarkMode,
} from "@chakra-ui/react";

// Images
import BackgroundCard1 from "assets/img/billing-background-card.png";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";

// Icons
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { RiMastercardFill } from "react-icons/ri";
import {
  BillIcon,
  GraphIcon,
  MastercardIcon,
  VisaIcon,
} from "components/Icons/Icons";

// Data
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";

function Billing() {
  const history = useHistory();
  const titleColor = "white";
  const textColor = "gray.400";
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const [name, set_name] = useState("");
  const [crimes, set_crimes] = useState("");
  const [current_status, set_current_status] = useState("");
  const [image_url, set_image_url] = useState("");
  const [Showname, set_Showname] = useState("");
  const [Showcrimes, set_Showcrimes] = useState("");
  const [Showcurrent_status, set_Showcurrent_status] = useState("");
  const [showVariables, setShowVariables] = useState([])
  const token = localStorage.getItem('AccessToken')

  const detectCriminals = () => {
    const file = files[0];
    const form_data = new FormData();
    form_data.append("query_image_url", files[0]);
    if (file) {
      try {
        axios.post("http://localhost:8000/api/criminal-image-detection/", form_data, {
          headers: {
            'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
          }
        })
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
      } catch (err) { console.log(err); };
    }
  };

  const handleEdit = () => {
    const form_data = new FormData();
    if(name)
    form_data.append("name", name);
    if(crimes)
    form_data.append("crimes", crimes);
    if(current_status)
    form_data.append("current_status", current_status);
    if(image_url)
      form_data.append("image_url", image_url);
    try {
      axios.patch("http://localhost:8000/api/criminals/" + id, form_data, {
        headers: {
          'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        alert("Criminal Record Updated.");
        history.push("/admin/tables");
      })
      .catch(err => console.log(err))
    } catch (err) { console.log(err); };
  }

  useEffect(() => {
    const token = localStorage.getItem('AccessToken')
    try {
      axios.get("http://localhost:8000/api/criminals/" + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        set_Showname(res.data.data.name);
        set_Showcrimes(res.data.data.crimes);
        set_Showcurrent_status(res.data.data.current_status);
      })
      .catch(err => console.log(err))
    } catch (err) { console.log(err); };
  }, [id]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto' >
      <Grid templateColumns={{ sm: "1fr", lg: "50% 38%" }}>
        <Box>
          <Card p='16px' mt='24px'>
            <CardHeader>
              <Flex
                justify='space-between'
                align='center'
                minHeight='60px'
                w='100%'>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  Edit Criminal's Details
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex w='100%'>
                <FormControl>
                  <FormLabel
                    color={titleColor}
                    ms='4px'
                    fontSize='sm'
                    fontWeight='normal'>
                    Name
                  </FormLabel>
                  <GradientBorder
                    mb='24px'
                    h='50px'
                    w='100%'
                    borderRadius='20px'>
                    <Input
                      color={titleColor}
                      bg={{
                        base: "rgb(19,21,54)",
                      }}
                      border='transparent'
                      borderRadius='20px'
                      fontSize='sm'
                      size='lg'
                      w='100%'
                      maxW='100%'
                      h='46px'
                      type='text'
                      placeholder={Showname}
                      onChange={e => set_name(e.target.value)}
                    />
                  </GradientBorder>
                  <FormLabel
                    color={titleColor}
                    ms='4px'
                    fontSize='sm'
                    fontWeight='normal'>
                    Past Crimes
                  </FormLabel>
                  <GradientBorder
                    mb='24px'
                    h='50px'
                    w='100%'
                    borderRadius='20px'>
                    <Input
                      color={titleColor}
                      bg={{
                        base: "rgb(19,21,54)",
                      }}
                      border='transparent'
                      borderRadius='20px'
                      fontSize='sm'
                      size='lg'
                      w='100%'
                      maxW='100%'
                      h='46px'
                      type='email'
                      placeholder={Showcrimes}
                      onChange={e => set_crimes(e.target.value)}
                    />
                  </GradientBorder>
                  <FormLabel
                    color={titleColor}
                    ms='4px'
                    fontSize='sm'
                    fontWeight='normal'>
                    Current Status
                  </FormLabel>
                  <GradientBorder
                    mb='24px'
                    h='50px'
                    w='100%'
                    borderRadius='20px'>
                    <Input
                      color={titleColor}
                      bg={{
                        base: "rgb(19,21,54)",
                      }}
                      border='transparent'
                      borderRadius='20px'
                      fontSize='sm'
                      size='lg'
                      w='100%'
                      maxW='100%'
                      h='46px'
                      type='email'
                      placeholder={Showcurrent_status}
                      onChange={e => set_current_status(e.target.value)}
                    />
                  </GradientBorder>
                  <Button
                    variant='brand'
                    fontSize='12px'
                    type='submit'
                    w='100%'
                    maxW='350px'
                    h='45'
                    mb='20px'
                    mt='20px'
                    onClick={() => handleEdit()}>
                    EDIT DETAILS
                  </Button>
                </FormControl>
              </Flex>
            </CardBody>
          </Card>
        </Box>
      </Grid>
    </Flex>
  );
}

export default Billing;
