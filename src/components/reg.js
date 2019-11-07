import React from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/login.css';
import UserService from '../service/user';
import { observer } from 'mobx-react'
import { inject } from '../utils'

const service = new UserService()

@inject({service})
@observer
export default class Reg extends React.Component {
    handleClick(event) {
        event.preventDefault();
        let fm = event.target.form;
        console.log(fm[0].value, fm[1].value, fm[2].value)
        this.props.service.Reg(fm[0].value, fm[1].value, fm[2].value);
    }
    render() {
        if (this.props.service.errMsg) {
            message.info(this.props.service.errMsg, 3, () => setTimeout(() => this.props.service.errMsg=''), 1000);
        }
        if (this.props.service.loggedin) {
            return (
                <Redirect to='/' /> //+ 跳转
            );
        }
        return (
            <div className="Login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="邮箱" />
                        <input type="text" placeholder="用户名" />
                        <input type="password" placeholder="密码" />
                        <input type="password" placeholder="确认密码" />
                        <button onClick={this.handleClick.bind(this)}>注册</button>
                        <p className="message"> 如果已注册? <Link to="/login">请登录</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}
