import axios from 'axios';
import store from 'store';
import { observable } from 'mobx';


export default class PostService {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api/post/'
        });
    }
    @observable loggedin = false;
    @observable errMsg = ''
    @observable posts = []
    @observable pagination = {page:1, size:20, pages:0, count:0}
    @observable post = {}
    put(title, content) {
        this.axios.post('put', {
            title,
            content,
        }, {
            headers: { 'Jwt': store.get('token') }
        })
            .then(
                response => {
                    this.loggedin = true;
                }
            ).catch(
                error => {
                    this.errMsg = "用户未登录"
                    console.log('error');
                }
            );

    }
    getall(search) {
        this.axios.get(search)
            .then(
                response => {
                    this.posts = response.data.posts;
                    this.pagination = response.data.pagination;
                }
            ).catch(
                error => {
                    this.errMsg = "用户未登录"
                    console.log('error++++++');
                }
            );

    }

    getpost(id) {
        this.axios.get(id)
            .then(
                response => {
                    console.log(response.data)
                    this.post = response.data;
                }
            ).catch(
                error => {
                    console.log('error++++++');
                    this.errMsg = "文章加载失败"
                }
            );

    }
}
