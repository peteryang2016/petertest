import React from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';
import md5 from 'blueimp-md5'
import {register} from "../../api/person";
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
class Register extends React.Component{
    constructor(props){
        super(props)
    }
    handleSubmit = ev=>{
        ev.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.password = md5(values.password)
                let result = await register(values)
                if(parseFloat(result.code)===0){
                    this.props.queryBaseInfo()//更新store中的数据
                    this.props.history.push('/person')
                    return
                }
                //失败走的流程
                loginFail()
            }
        });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        //const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return <section className="personLoginBox">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item
                    label={
                        <span>
              用户名&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '输入用户名', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
              邮箱&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: '输入邮箱', whitespace: true },
                            { type:'email',message:'邮箱格式不正确' }
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
              手机&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '输入手机号码', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
              密码&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '输入密码', whitespace: true }],
                    })(<Input />)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        立即注册
                    </Button>
                </Form.Item>



            </Form>
        </section>
    }
}
//export default connect()(Register)
export default Form.create()(connect(null,action.person)(Register))
