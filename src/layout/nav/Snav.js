/**
 * Created by zhan on 2017/8/7.
 */

import { Link, NavLink} from 'react-router-dom';
export default class Snav extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        $(this.refs.dropdown).dropdown()
        $(this.refs.dropdown2).dropdown()
        $(this.refs.dropdown3).dropdown()
    }
    render(){
        return(
            <div className="ui pointing menu">
                <a className=" item">
                    <i className="home icon"></i> 后台管理
                </a>
                <NavLink className="active item" to="/admin">
                    <i className="user icon"></i> 用户管理
                </NavLink>

                <div className="ui dropdown item"  ref="dropdown">
                    分类管理
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <NavLink className="item" to="/category">分类列表</NavLink>
                        <NavLink className="item" to="/cat">添加分类</NavLink>
                    </div>
                </div>
                <div className="ui dropdown item" ref="dropdown3">
                    内容管理
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <NavLink className="item" to="blog">内容首页</NavLink>
                        <NavLink className="item" to="/write">添加内容</NavLink>
                    </div>
                </div>
                <div className="right menu">
                    <div className="ui dropdown item" ref="dropdown2">
                        admin
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <NavLink className="item" to="logout">注销</NavLink>
                            <NavLink className="item" to="/">切换前台首页</NavLink>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}