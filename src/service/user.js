import axios from 'axios';
import store from 'store';
import {observable} from 'mobx';

store.addPlugin(require('store/plugins/expire'));

export default class UserService {
    @observable loggedin = false;
    @observable errMsg = ''

    Login(email, password) {
        axios.post('/api/user/login', {
            email:email,
            password:password
        }).then(
            response => {
                store.set('token',response.data.token,(new Date()).getTime() + (8*3600*1000));
                this.loggedin = true;
            }
        ).catch(
            error => {
                this.errMsg = "用户名或密码错误"
                console.log('error');
            }
        );

    }

    Reg(email, name, password) {
        axios.post('/api/user/reg', {
            email,name,password
        }).then(
            response => {
                store.set('token',response.data.token,(new Date()).getTime() + (8*3600*1000));
                this.loggedin = true;
            }
        ).catch(
            error => {
                console.log('error');
            }
        );

    }
}