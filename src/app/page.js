"use client"

import {Container, Text, Button} from '@chakra-ui/react'
import Navbar from './components/Navbar';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import { useState } from 'react'


export default function Home() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  


  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Container  maxW = "container.lg">
    <Navbar />
    <Text fontSize={"2x1"} textAlign={"center"} my={4}>
      Search users on GITHUB
    </Text>
    <Search setUserData = {(res) => setUserData(res) } setLoading = {setLoading}/>
    {userData && <UserProfile userData = {userData}/>}
    </Container>
  
  );
}
