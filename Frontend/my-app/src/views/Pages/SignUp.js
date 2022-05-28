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
import { useHistory } from "react-router-dom";
// import Webcam from "components/Webcam/webcam";

// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Input,
  Link,
  Switch,
  Text,
  Icon,
  DarkMode,
} from "@chakra-ui/react";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
// Custom Components
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";

// Assets
import SignUpBg from "assets/img/SignUpBg.png";
import signUpImage from "assets/img/signUpImage.png";

function SignUp() {
  const titleColor = "white";
  const textColor = "gray.400";
  const fileRef = useRef(null);
  const history = useHistory();

  const [name, set_name] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image_url, set_image_url] = useState("");

  const handleNew = () => {
    const form_data = new FormData();
    form_data.append("username", name);
    form_data.append("department", department);
    form_data.append("email", email);
    form_data.append("password", password);
    form_data.append("image", image_url);
    try {
      axios.post("http://localhost:8000/api/register/", form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => {
        alert(name + " is registered as a new user");
        history.push("/auth/signin");
      })
        .catch(err => console.log(err))
    } catch (err) { console.log(err); };
  }

  return (
    <Flex position='relative' overflow={{ lg: "hidden" }}>
      <Flex
        flexDirection='column'
        h={{ sm: "initial", md: "unset" }}
        w={{ base: "90%" }}
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          flexDirection='column'
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          my={{ base: "auto", lg: "auto" }}
          mb='50px'
          w={{ base: "100%", md: "50%", lg: "30%" }}>
          <Flex
            direction='column'
            textAlign='center'
            justifyContent='center'
            align='center'
            mt={{ base: "60px", md: "140px", lg: "120px" }}
            mb='50px'>
            <Text
              fontSize='4xl'
              lineHeight='39px'
              color='white'
              fontWeight='bold'>
              Welcome!
            </Text>
            <Text
              fontSize='md'
              color='white'
              fontWeight='normal'
              mt='10px'
              w={{ base: "100%", md: "90%", lg: "90%", xl: "80%" }}>
              Register to Unleash the Power of Face Recognition
            </Text>
          </Flex>
          <GradientBorder p='2px' me={{ base: "none", lg: "30px", xl: "none" }}>
            <Flex
              background='transparent'
              borderRadius='30px'
              direction='column'
              p='40px'
              minW={{ base: "unset", md: "430px", xl: "450px" }}
              w='100%'
              mx={{ base: "0px" }}
              bg={{
                base: "rgb(19,21,56)",
              }}>
              <Text
                fontSize='xl'
                color={textColor}
                fontWeight='bold'
                textAlign='center'
                mb='22px'>
                Register With
              </Text>
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
                  w={{ base: "100%", lg: "fit-content" }}
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
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='text'
                    placeholder='Your name'
                    onChange={e => set_name(e.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Department
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
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
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    placeholder='Your department'
                    onChange={e => setDepartment(e.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Email
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
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
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='email'
                    placeholder='Your email address'
                    onChange={e => setEmail(e.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Password
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
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
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='password'
                    placeholder='Enter a password'
                    onChange={e => setPassword(e.target.value)}
                  />
                </GradientBorder>
                {/* <Webcam></Webcam> */}
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Reference Face Image
                </FormLabel>
                <GradientBorder
                  me={{ sm: "0px", md: "24px" }}
                  w='100%'
                  mb='24px'
                  h='50px'
                  borderRadius='18px'>
                  <Flex
                    p='20px'
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    align='center'
                    h='46px'
                    w='100%'
                    alt="Upload your File">
                    <Text color='gray.400' fontSize='sm'>
                      {image_url.name || "Upload an image of your face"}
                    </Text>
                    <Spacer />
                    <Button size = "sm" maxW='400px' h='25px' fontSize='10px' variant='brand' onClick={() => fileRef.current.click()}>
                      CHOOSE FILE
                    </Button>
                    <input ref={fileRef} onChange = {e => set_image_url(e.target.files[0])} style={{display: "none"}} type="file" />
                  </Flex>
                </GradientBorder>
                <Button
                  variant='brand'
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'
                  onClick={() => handleNew()}>
                  SIGN UP
                </Button>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                <Text color={textColor} fontWeight='medium'>
                  Already have an account?
                  <Link
                    color={titleColor}
                    as='span'
                    ms='5px'
                    href="#"
                    fontWeight='bold'>
                    <a href="http://localhost:3000/#/auth/signin">Sign In</a>
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </GradientBorder>
        </Flex>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX='hidden'
          h='1300px'
          maxW={{ md: "50vw", lg: "48vw" }}
          w='960px'
          position='absolute'
          left='0px'>
          <Box
            bgImage={SignUpBg}
            w='100%'
            h='1300px'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <Text
              textAlign='center'
              color='white'
              letterSpacing='8px'
              fontSize='20px'
              fontWeight='500'>
              MICROSOFT ENGAGE 2022
            </Text>
            <Text
              textAlign='center'
              color='transparent'
              letterSpacing='8px'
              fontSize='36px'
              fontWeight='bold'
              bgClip='text !important'
              bg='linear-gradient(180deg, #FFFFFF 30.99%, #21242F 102.65%)'>
              FACE RECOGNITON
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;
