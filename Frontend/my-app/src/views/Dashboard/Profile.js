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
  Avatar,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";

// Images
import bgProfile from "assets/img/bgProfile.png";

// Custom components
// import Webcam from "components/Webcam/webcam";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { Separator } from "components/Separator/Separator";

// Icons

// Data

/**************************************************************************************
 * Return function of Dashboard Page
 **************************************************************************************/

function Profile() {

  const [profileName, setProfileName] = useState("");
  const [profileDep, setProfileDep] = useState("");
  const [profileID, setProfileID] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [LastImage, setLastImage] = useState("");
  const [LastVideo, setLastVideo] = useState("");
  const token = localStorage.getItem('AccessToken')

  useEffect(()=> {
    try{
      axios.get("http://127.0.0.1:8000/api/app-user/", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data.data)
        console.log(res.data.data.id)
        setProfileDep(res.data.data.department);
        setProfileID(res.data.data.id);
        setProfileImage(res.data.data.image_url);
        setLastImage(res.data.data.last_image_url);
        setLastVideo(res.data.data.last_video_url);
        setProfileName(res.data.user.first_name);
        setProfileEmail(res.data.user.email);
      })
      .catch(err => console.log(err))
    }catch(err){console.log(err);};
  }, []);


  return (
    <Flex direction='column' mt={{ sm: "100px", md: "100px" }}>
      
      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='22px'
        mb='24px'>
        {/* Welcome Card */}
        <Card
          bgImage={bgProfile}
          bgSize='cover'
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <Flex direction='column' h='100%'>
            <Text color='#fff' fontSize='30px' fontWeight='bold' mb='3px'>
              Welcome back!
            </Text>
            <Text color='#fff' fontSize='sm' mb='auto'>
              Nice to see you, {profileName}
            </Text>
            <Avatar
              me={{ md: "40px" }}
              my={{ md: "10px", lg: "100px"}}
              src={"http://localhost:8000" + profileImage}
              w='150px'
              h='150px'
              borderRadius='15px'>
            </Avatar>
          </Flex>
        </Card>
        {/* Profile Information */}
        <Card
          p='16px'
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>
              <Separator mb='30px'/>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Full Name:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  {profileName}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Department:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  {profileDep}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Email:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  {profileEmail}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  User ID:{" "}
                </Text>
                <Text fontSize='xs' color='#fff' fontWeight='400'>
                  {profileID}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='22px'
        mb='24px'>
        <Card bgSize='cover'
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                Your Last Video Search
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                <video style={{borderRadius: "10px"}} src={"http://localhost:8000/media" + LastVideo} type="video/mp4"  controls autoPlay/>
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        <Card p='16px'
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                Your Last Image Search
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {LastImage ? <img style={{borderRadius: "10px"}} src={"http://localhost:8000/media" + LastImage} alt="Processed Image"/> : null}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
