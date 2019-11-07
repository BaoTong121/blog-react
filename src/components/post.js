import React from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/login.css';
import PostService from '../service/post';
import { observer } from 'mobx-react';
import { inject } from '../utils';
import { Input, Button, message, Card, Col, Row } from 'antd';

import 'antd/lib/input/style';
import 'antd/lib/form/style';
import 'antd/lib/button/style';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';


const { TextArea } = Input;
const service = new PostService()

@inject({ service })
@observer
export default class Post extends React.Component {
    constructor(props) {
        super(props);
        props.service.getpost(props.match.params.id);
    }

    render() {
        return <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title={this.props.service.post.title} bordered={false} headStyle={{ textAlign: "center" }} bodyStyle={{ textAlign: "center" }}>
                        {this.props.service.post.pubdate}
                    </Card>
                    <Card bordered={false} headStyle={{ textAlign: "center" }} bodyStyle={{ textAlign: "center" }} style={{ height: 800 }}>
                    {this.props.service.post.content}
                    </Card>
                </Col>
            </Row>
        </div>
    }
}