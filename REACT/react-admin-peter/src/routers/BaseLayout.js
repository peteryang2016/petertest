import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Route,Redirect,Link,withRouter,Router,Switch} from 'react-router-dom'
import Home from './Home'
import First from './First'
import Three from './Three'
import Login from './Login'
import baselayout from './BaseLayout'
import routerConfig from './routerConfig'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//导航名称
const breadcrumbNameMap = {
    '/':'首页',
    '/user':'用户管理',
    '/user/first':'个人设置',
    '/shop':'商场管理',
    '/shop/three':'订单管理',
}

class BaseLayout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:JSON.parse(localStorage.getItem("isLogin")),
            defaultSelectedKeys:this.props.history.location.pathname,
            pathSnippets:[],
            extraBreadcrumbItems:null
        }
    }
    menuItemClick= (item,key)=>{
        //this.getPath()
        this.setState({defaultSelectedKeys:this.props.history.location.pathname})
    }
    getPath = ()=>{
        console.log('getPath');
        let pathSnippets = this.props.history.location.pathname.split('/').filter(i=>i)

        console.log(this.state.pathSnippets);
        let extraBreadcrumbItems = pathSnippets.map((_,index)=>{
            let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            console.log(url);
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            )
        })
        console.log(extraBreadcrumbItems);
        this.setState({extraBreadcrumbItems})

    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.getPath()
    }
    componentWillMount() {
        this.getPath()
    }

    render(){
        console.log(this.props);
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />

                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            onClick={this.menuItemClick}
                            mode="inline"
                            defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                routerConfig.map(router=>
                                    router.children &&router.children.length>0?(
                                        <SubMenu
                                            key={router.path}
                                            title={
                                                <span>
                <Icon type="user" />
                {router.name}
              </span>
                                            }
                                        >
                                            {
                                                router.children.map(child=>
                                                    <Menu.Item key={child.path}>
                                                        <Link to={child.path}>{child.name}</Link>
                                                    </Menu.Item>
                                                )
                                            }
                                        </SubMenu>
                                        ):(
                                        <Menu.Item key={router.path} >
                                            <Link to={router.path}>
                                                <Icon type={router.icon} />
                                                <span>{router.name}---{this.state.defaultSelectedKeys}</span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                )
                            }
                            {/*<Menu.Item key="/" >
                                <Link to="/user/home">
                                    <Icon type="pie-chart" />
                                    <span>首页---{this.state.defaultSelectedKeys}</span>
                                </Link>
                            </Menu.Item>

                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                <Icon type="user" />
                用户管理
              </span>
                                }
                            >
                                <Menu.Item key="/user/first"><Link to="/user/first">个人设置</Link></Menu.Item>
                            </SubMenu>


                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                <Icon type="user" />
                商场管理
              </span>
                                }
                            >
                                <Menu.Item key="/shop/three"><Link to="/shop/three">订单管理</Link></Menu.Item>
                            </SubMenu>*/}




                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/*<Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                            {this.state.extraBreadcrumbItems}
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                                <Switch>
                                    <Route path="/" exact component={Home}/>
                                    <Route path="/user/home" component={Home}/>
                                    <Route path="/user/first" component={First}/>
                                    <Route path="/shop/three" component={Three}/>
                                </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}


export default withRouter(BaseLayout);
