import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/login'
import Reg from './components/reg'
import Put from './components/put'
import L from './components/list'
import Post from './components/post'
import { Layout, Menu, LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';

import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import 'antd/lib/locale-provider/style'

const { Header, Footer, Sider, Content } = Layout;

const Home = () => (
  <div><h2>Home</h2></div>
)
const About = () => (
  <div>
    <h1>马哥教育博客项目</h1>
    <ul>
      <li>采用前后端分离开发模式</li>
      <li>前端使用最新的React技术，后端使用Django框架</li>
      <li>使用Restful风格设计服务间API接口</li>
      <li>无session认证技术，强密码技术</li>
      <li>阿里开源Antd组件</li>
      <li>企业级nginx + uWSGI + Django部署</li>
    </ul>
  </div>
)

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header>
            <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="1"><Link to='/'>主页</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/login'>登录</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/reg'>注册</Link></Menu.Item>
            <Menu.Item key="4"><Link to='/put'>发布</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/list'>博文列表</Link></Menu.Item>
            <Menu.Item key="6"><Link to='/about'>关于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/reg" component={Reg} />
              <Route path="/put" component={Put} />
              <Route path="/list" component={L} />
              <Route path="/post/:id" component={Post} />
              <Route path="/about" component={About} />
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>wwx©2019</Footer>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))