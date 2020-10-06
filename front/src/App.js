import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import { Layout } from 'antd';


import ProductList from './components/table';
import Chart from './components/chart'
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Title style={{color:'white',textAlign:'center'}} level={1}>My mini app</Title>

    </Header>

    <Content style={{ padding: '0 100px',marginTop:'50px' }}>
     <ProductList ></ProductList>
     <Chart></Chart>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Created by mohamed ali mezni</Footer>
  </Layout>

  );
}

export default App;
