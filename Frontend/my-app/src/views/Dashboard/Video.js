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
import React, {useState, useRef, useEffect} from "react";
import axios from "axios"
// Chakra imports
import { Box, Button, Flex, Grid, Icon, Spacer, Text, Spinner } from "@chakra-ui/react";
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
  billingData,
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
  const [processedVideo, setProcessedVideo] = useState("");
  const token = localStorage.getItem('AccessToken')

  const detectCriminals = () => {
    const file = files[0];
    const form_data = new FormData();
    form_data.append("query_video_url", files[0]);
    if(file){
      try{
        axios.post("http://localhost:8000/api/criminal-video-detection/",form_data, {headers: {
        'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
      }})
        .then(res => {
          setProcessedVideo(res.data.Processed_Video);
          setBillingData(Object.values(res.data.Criminals_Detected));
          setShowSpinner(false);
          if(res.data.Instances == 0){
            setShowText(true);
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
                  Upload your Video
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
                      {files[0]?.name || "Select a Video file"}
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
                <video style={{borderRadius: "10px"}} src={"http://localhost:8000/media" + processedVideo} type="video/mp4"  controls autoPlay/>
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        {/* Timestamp List */}
        <Card my='10px' ms={{ lg: "24px" }}>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w='100%'
                my={{ md: "12px" }}>
                <Text
                  color='#fff'
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight='bold'>
                  Criminals Detected
                </Text>
                <Flex align='center'>
                  <Text color='gray.400' fontSize='sm'>
                  {files[0]?.name || "Video Name"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            {/* <Flex direction='column' w='100%'>
              <Text color='gray.400' fontSize='xs' mb='18px'>
                CRIMINALS WITH TIMESTAMPS
              </Text>
            </Flex> */}
          </CardHeader>
          <CardHeader>
            <Text color='gray.400' fontSize='xs' mb='18px'>
              CRIMINALS WITH TIMESTAMPS
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%' maxHeight={'400px'} overflowY={'scroll'} overflowX={'hidden'} scrollBehavior={'auto'}>
              {showText ? 
                <Text color='#fff' fontSize='xl'>
                  No criminal was found in this video.
                </Text> : null
              };
              {billingData.map((row) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.image_url}
                    date={row.id}
                    price={row.Timestamp}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Billing;
