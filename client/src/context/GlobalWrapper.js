import { createContext, useState } from "react";
import axios from "axios"
import { useToast,useDisclosure } from '@chakra-ui/react'
export const GlobalContext=createContext();
export default function Wrapper({children}){
    const [Users,setUsers]=useState([]);
    const [errors,setErrors]=useState({});
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState({});
    const toast=useToast()
    const FetchUsers = () =>{
        axios.get('http://localhost:5000/users').then((res) =>{
            setUsers(res.data)
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    }
    const Search = (query) =>{
        axios.post(`http://localhost:5000/users/search?key=${query}`)
        .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err.reponse.data);
          });
      };
    const Delete =(id) =>{
        axios.delete(`http://localhost:5000/users/${id}`)
        .then(res =>{
            setUsers(Users.filter(u=>u._id !=id))
            toast({
                title: 'User Deleted',
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
        } )
        .catch((err) => {
            console.log(err.reponse.data);
          });
    }
    const Add = (form, setForm) => {
        axios
          .post('http://localhost:5000/users', form)
          .then((res) => {
            setUsers([...Users, res.data]);
            toast({
              title: 'User Added',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setForm({});
            onClose();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
      };
    
      const FindOne = async (id) => {
        await axios
          .get(`http://localhost:5000/users/${id}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
      };
    
      const Update = (form, setForm, id) => {
        axios
          .put(`http://localhost:5000/users/${id}`, form)
          .then((res) => {
            toast({
              title: 'User Updated',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setForm({});
            onClose();
            FetchUsers();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
      };
      return (
        <GlobalContext.Provider
          value={{
            FetchUsers,
            Search,
            Delete,
            Add,
            FindOne,
            Update,
            Users,
            onOpen,
            isOpen,
            onClose,
            errors,
            setErrors,
            user,
            setUser,
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
    }