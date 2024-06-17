import { Container, FormControl,Input,Box,Button,Text,TableContainer,Thead,Th,Table,Tr} from "@chakra-ui/react";
import { AiOutlineSearch,AiOutlinePlus} from "react-icons/ai";
import Row from "./components/row";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalWrapper";
import DrawerExample from "./components/DrawerExample";



function App() {
  const {FetchUsers,Users,Search,onOpen,isOpen,onClose}=useContext(GlobalContext)
  const [query, setQuery] = useState('');
  useEffect(()=>{
    FetchUsers();
  },[])
  const SearchHandler = () => {
    Search(query);
  };
  const onchangeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="App">
    <Container maxW={'full'} p="4" fontSize="18px">
          <Box rounded='lg' boxShadow='base' p="4">
          <Box mt="2" gap={"2"} mb="4" display={'flex'}>
              <FormControl>
              <Input type="text" onChange={onchangeHandler} />
            </FormControl>
            <Button
              leftIcon={<AiOutlineSearch />}
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              onClick={() => SearchHandler()}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box mt={"4"} rounded='lg' boxShadow='base'>
        <Box justifyContent={"space-between"}  p="4" display={'flex'} >
        <Text fontSize="xl" fontWeight="bold">
              List Users
        </Text>
        <Button colorScheme="teal" variant="outline" maxW={'300px'} minW="150px" leftIcon={<AiOutlinePlus fontSize={'20px'} onClick={onOpen} />}>
              Add User
              </Button>
          </Box>
          <TableContainer>
          <Table variant='simple'>
            
            <Thead>
              <Tr>
              <Th>Avatar</Th>
              <Th>Fullname</Th>
              <Th>Email</Th>
              <Th>Age</Th>
              <Th>Country</Th>
              <Th>Actions</Th>
              </Tr>
            </Thead>
            {
              Users?.map(({_id,fullname,email,age,country}) => {
                return <Row 
                id={_id} 
                fullname={fullname}
                email={email}
                age={age}
                country={country}
                />; })
            }
              
          </Table>
        </TableContainer>
        </Box>
        <DrawerExample/>
      </Container>
    </div>
  );
}


export default App;
