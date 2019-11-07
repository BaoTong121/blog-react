import React from 'react';
import PostService from '../service/post';
import { observer } from 'mobx-react';
import { inject, parse_qs } from '../utils';
import { Link } from "react-router-dom";
import { List} from 'antd';

import 'antd/lib/list/style'
import 'antd/lib/message/style'

const service = new PostService()

@inject({ service })
@observer
export default class L extends React.Component {
    constructor(props) {
        super(props);
        props.service.getall(props.location.search);
    }

    getUrl(pageNo) {
        let obj = parse_qs(this.props.location.search)
        let {size = 20} = obj
        return '?page=' + pageNo + '&size=' + size
    }

    handleChange(pageNo,pageSize) {
        let search = '?page=' + pageNo + '&size=' + pageSize;
        this.props.service.getall(search);
    }

    itemRender(page, type, originalElement) {
            if (page === 0) return originalElement;

            if (type === 'page') {
                return <Link to={this.getUrl(page)}>{page}</Link>;
            }
            if (type === 'prev') {
              return <Link to={this.getUrl(page)}>上一页</Link>;
            }
            if (type === 'next') {
              return  <Link to={this.getUrl(page)}>下一页</Link>;
            }
            return originalElement;      
    }

    render() {
        let data = this.props.service.posts

        if (data.length) {
            let pagination = this.props.service.pagination;
            return (
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Link to={'/post/' + item.post_id}>{item.title}</Link>
                        </List.Item>)}
                    pagination={{
                        current: pagination.page,
                        pageSize:pagination.size,
                        total: pagination.count,
                        onChange: this.handleChange.bind(this),
                        itemRender: this.itemRender.bind(this),
                    }}
                />
            );
        } else {
            return <div />
        }
    }
}