import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import UserManagement from '../components/userManagement';
import { Content } from './styles';

interface User {
  id: number;
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <>
      <Header />
        <Content className="content-wrapper">
          <UserManagement title="Registered Users" users={users} />
        </Content>
      <Footer />
    </>
  );
};

export default Home;
