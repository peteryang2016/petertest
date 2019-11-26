import React from 'react'
import {connect} from 'react-redux'

import { Form, Icon, Input, Button, Checkbox,Modal } from 'antd';
import {Link} from 'react-router-dom'

import md5 from 'blueimp-md5'
import {login} from "../../api/person";
import action from "../../store/action/index"

//antd modal 失败弹出框
const { confirm } = Modal;
function loginFail() {
    confirm({
        title: '登录失败',
        content: '请稍后重新尝试！',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
    });
}


class Login extends React.Component{
    constructor(props){
        super(props)
    }
    handleSubmit = ev=>{
        ev.preventDefault();//阻止默认行为
        //写法一：
        /*

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {userName,userPass} = values;
                userPass = md5(userPass);
                login({
                    name:userName,
                    password:userPass

                }).then((result)=>{//走到这里不一定成功，但服务器给返回结果了

                }).catch(err=>{//服务器没有正常返回结果

                })
            }
        });

        * */
        //写法二：写法一、二的区别是一个用then一个用async await； await不管成功还是失败都能拿到结果,只要code不等于0或者没有就代表失败
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {userName,userPass} = values;
                userPass = md5(userPass);
                let result = await login({
                    name:userName,
                    password:userPass

                })
                console.log('await报错以下就不会走了');
                if(parseFloat(result.code)===0){
                    this.props.queryBaseInfo()//更新store中的数据

                    //登录成功我们需要重新获取已购买的课程信息（未登录下从服务器获取的支付课程信息是获取不到的，但是登录我们需要把购买信息同步到redux中，这样在我的课程中才能展示出来相关的信息）
                    this.props.queryPay()

                    //从哪里来的，登录成功就跳回到哪去
                    this.props.history.go(-1)
                    return;
                }
                //登录失败
                loginFail()//登录失败提示框
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="personLoginBox">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('userPass', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/person/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
//export default connect()(Login)
//export default Form.create(connect()(Login))
export default Form.create({ name: 'normal_login' })(connect(null,{...action.person,...action.course})(Login));
