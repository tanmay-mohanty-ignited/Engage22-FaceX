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
import React, {useState, useRef, useEffect, useReducer} from "react";
import axios from "axios"
// Chakra imports
import { Box, Button, Flex, Grid, Icon, Spacer, Spinner, Text } from "@chakra-ui/react";
import {
  IoEllipsisHorizontal,
} from "react-icons/io5";

import * as GradientProgress from "@delowar/react-circle-progressbar";

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
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";

function Billing() {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showText, setShowText] = useState(false);
  const [processedImage, setProcessedImage] = useState("");
  const [imageURL, setimageURL] = useState("");


  const detectCriminals = () => {
    const file = files[0];
    const form_data = new FormData();
    const token = localStorage.getItem('AccessToken')

    form_data.append("query_image_url", files[0]);
    if(file){
      try{
        axios.post("http://localhost:8000/api/criminal-image-detection/",form_data, {headers: {
        'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
      }})
        .then(res => {
          console.log(res.data);
          setProcessedImage(res.data.Processed_Image);
          setBillingData(Object.values(res.data.Criminals_Detected));
          setShowSpinner(false);
          if(res.data.Criminal_Count == 0){
            setShowText(true);
          }else{
            setShowText(false);
          };
        })
        .catch(err => {
          console.log(err)
          setShowSpinner(false);
          alert("Something went wrong...\nPlease try again.");
        })
      }catch(err){console.log(err);};
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [processedImage]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
          <Card p='16px' mt='24px' my="24px" >
            <CardHeader>
              <Flex
                justify='space-between'
                align='center'
                minHeight='60px'
                w='100%'>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  Upload your Image
                </Text>
              </Flex>
              {showSpinner ? <Spinner color="white" size={"lg"}/> : null}
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                align='center'
                w='100%'
                justify='center'
                py='1rem'>
                <GradientBorder
                  mb={{ sm: "24px", md: "0px" }}
                  me={{ sm: "0px", md: "24px" }}
                  w='100%'
                  borderRadius='18px'>
                  <Flex
                    p='20px'
                    bg='rgb(31, 35, 89)'
                    border='transparent'
                    borderRadius='20px'
                    align='center'
                    w='100%'
                    alt="Upload your File">
                    <Text color='#fff' fontSize='sm'>
                      {files[0]?.name || "Select an Image file"}
                    </Text>
                    <Spacer />
                    <Button  size = "sm" maxW='400px' fontSize='12px' variant='brand' onClick={() => fileRef.current.click()}>
                      CHOOSE FILE
                    </Button>
                    <input ref={fileRef} onChange = {e => setFiles(e.target.files)} style={{display: "none"}} type="file" />
                  </Flex>
                </GradientBorder>
                <Button  size = "lg" maxW='400px' fontSize='12px' variant='brand' disabled={!files.length} onClick={() => [detectCriminals(), setShowSpinner(true)]}>
                  DETECT CRIMINALS
                </Button>
              </Flex>
            </CardBody>
          </Card>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        {/* Billing Information */}
        <Card my="10px" me={{ lg: "54px" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                This is what we found
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {processedImage ? <img style={{borderRadius: "10px"}} src={"http://localhost:8000/media" + processedImage}/> : null}
                {/* Insert the processed Video here */}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        
        {/* Criminal Details List */}
        <Card my="10px" ms={{ lg: "24px" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                Criminal Details
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {showText ? 
                  <Text color='#fff' fontSize='xl'>
                    No criminal was found in this image.
                  </Text> : null
                };
                { billingData.map((row, arr) => {
                  return (
                    <BillingRow
                      name={row.name}
                      crimes={row.crimes}
                      current_status={row.current_status}
                      logo={"http://localhost:8000" + row.image_url}
                      uuid={row.id}
                      setList={setBillingData}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Billing;
