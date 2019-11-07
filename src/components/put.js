import React from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/login.css';
import PostService from '../service/post';
import { observer } from 'mobx-react';
import { inject } from '../utils';
import { Input, Form, Button, message  } from 'antd';

import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/button/style';

const { TextArea } = Input;
const service = new PostService()

@inject({ service })
@observer
export default class Put extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        let fm = event.target;
        this.props.service.put(fm[0].value, fm[1].value);
    }
    render() {
        if (this.props.service.errMsg) {
            message.info(this.props.service.errMsg, 3, () => setTimeout(() => this.props.service.errMsg = ''), 1000);
        }
        if (this.props.service.loggedin) {
            return (
                <Redirect to='/' /> //+ 跳转
            );
        }
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="标题" labelCol={{ span: 4 }} wrapperCol={{ span:14 }}>
                <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="标题" labelCol={{ span: 4 }} wrapperCol={{ span:14 }}>
                <TextArea rows={30} />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" >提交</Button>
                </Form.Item>
            </Form>
        );
    }
}
