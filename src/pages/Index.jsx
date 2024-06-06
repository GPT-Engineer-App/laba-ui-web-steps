import React, { useState, useEffect, createContext, useContext } from "react";
import { ChakraProvider, Container, Text, VStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";

// Create a context for global state management
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  return <AppContext.Provider value={{ data, setData, user, setUser }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

const Home = () => {
  const { data } = useAppContext();
  return (
    <Container>
      <Text fontSize="2xl">Home Page</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>
                <IconButton aria-label="Edit" icon={<FaEdit />} size="sm" />
                <IconButton aria-label="Delete" icon={<FaTrash />} size="sm" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

const About = () => (
  <Container>
    <Text fontSize="2xl">About Page</Text>
  </Container>
);

const Contact = () => (
  <Container>
    <Text fontSize="2xl">Contact Page</Text>
  </Container>
);

const Login = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ name: "User" });
    navigate("/");
  };

  return (
    <Container>
      <Text fontSize="2xl">Login Page</Text>
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <AppProvider>
        <Router>
          <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <VStack spacing={4}>
              <Text fontSize="2xl">Your Blank Canvas</Text>
              <Text>Chat with the agent to start making edits.</Text>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Login</Link>
            </VStack>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </Router>
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
