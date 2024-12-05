import React, { useEffect, useState } from "react";
import Footer from "src/components/Footer";
import UserManagement from "src/components/userManagement";
import { User } from "src/entities";
// import { Content } from '../home/styles';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/user");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // useEffect para buscar os usuários quando o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []); // A lista de dependências vazia significa que isso acontece apenas na montagem

  return (
    <>
      {/* <Header /> */}
      {/* <Content> */}
      <UserManagement initialUsers={users} />
      {/* </Content> */}
      <Footer />
    </>
  );
};

export default Home;
