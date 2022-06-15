import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import stayFitDataService from "../services/stayFitDataService";
import ResponsiveAppBar from './Navbar'
// import styles from "./index.module.css";
// import Button from "../Button";
// import Input from "../Input";

const Login = () => { 
  const initialLoginState = {
    userName: "",
    password: "",
    isLoading: false,
    success: false
  };

  const [loginInfo, setLoginInfo] = useState([initialLoginState]);
  // const [show, setShow] = useState(false);
  // const [userName, SetUserName] = useState();
  // const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  
  const handleInputChange = event => {
      event.preventDefault();
      const {name, value} = event.target;
      setLoginInfo({...loginInfo, [name]: value})
  }

        const submitHandler = async () => {
          setLoading(true);
          if(!loginInfo.userName || !loginInfo.password){
            console.log('Enter both username and password')
            toast({
              title: "Please fill out all the fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            return;
          }

          try {
            var data = {
              userName: loginInfo.userName,
              password: loginInfo.password
            }

            await stayFitDataService.loginUser(data)
            .then(response => {
              console.log(response.data);
              toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
              navigate.push("/"); // redirect to UserDashboard
              setLoginInfo(initialLoginState);
          })

          } catch (error) {
            console.log('error is' + error);
            toast({
              title: "Error Occurred!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
        }
  
        return (
          <>
          <ResponsiveAppBar/>
            <VStack spacing="10px">
              <FormControl id="userName" isRequired>
                <FormLabel>Username</FormLabel>
                <input
                  type="text"
                  id="userName"
                  required
                  value={loginInfo.userName}
                  onChange={handleInputChange}
                  name="userName"
                  placeholder="Enter Username"
                  // onChange={(e) => SetUserName(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <input
                    type="text"
                    id="password"
                    required
                    value={loginInfo.password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Enter Password"
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick} className="btn btn-success">
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement> */}
                </InputGroup>
                </FormControl>

                <FormControl id="password" isRequired>  
                <FormLabel>Retype Password</FormLabel>
                <InputGroup>
                  <input
                    type="text"
                    id="retypePassword"
                    required
                    value={loginInfo.repeatPassword}
                    onChange={handleInputChange}
                    name="retypePassword"
                    placeholder="Retype Password"
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <button onClick={submitHandler} className="btn btn-success">Submit</button>

            </VStack>
          </>                   
        );
      }

export default Login;




