import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
    myInfo:PT.object,
    logoutAjax:PT.func
}

export default class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            categories:[]
        }
    }
    componentDidMount(){
        $.post('/')
            .done(ret=>{
                let{code,categories} = ret;

                if(code===0){
                    this.setState({
                        categories:categories
                    })
                }


            })
    }
    render(){
        let {categories} = this.state;
        let {myInfo} = this.props
        let userlink = null;
        if(myInfo){
            let {username,isAdmin} = myInfo;
            let{logoutAjax} = this.props
            if(isAdmin){
                userlink=[(
                    <Link to="#javasccript:"
                             className={`item`}
                             activeClassName="active"
                    >{username}</Link>),
                    (<NavLink to="/admin"
                              className={`item`}
                              activeClassName="active"
                    >管理</NavLink>),
                    (<Link to="/article"
                              className={`item`}
                              activeClassName="active"
                           onClick={logoutAjax}
                    >注销</Link>)]
            }else{
                userlink=[
                    (<Link to="#javasccript"
                              className={`item`}
                              activeClassName="active"
                    >{username}</Link>),
                    (<Link to="#javasccriptr"
                              className={`item`}
                              activeClassName="active"
                           onClick={logoutAjax}
                    >注销</Link>)
                ]
            }
        }else{
            userlink=[
                (<NavLink to="/login"
                          className={`item`}
                          activeClassName="active"
                >登入</NavLink>),
                (<NavLink to="/register"
                          className={`item`}
                          activeClassName="active"
                >注册</NavLink>)
            ]
        }
        if(categories){
            categories = categories.map((elt,i)=>{
                let {categoryname} = elt;
                return(
                    <NavLink exact to={`/${categoryname}`}
                             className={`item`}
                             activeClassName="active"
                    >{categoryname}</NavLink>
                )
            })
        }
        return (
            <div className={`ui fixed secondary pointing menu ${S.nav}`}>
                <div className="ui container">

                    <Link to="/"
                          className={`header item`}
                    >ahiba</Link>

                    <NavLink exact to="/"
                             className={`item`}
                             activeClassName="active"
                    >首页</NavLink>

                    {categories}

                    <div className="menu right">
                        {userlink}
                        <NavLink to="/write"
                                 className={`item`}
                                 activeClassName="active"
                        >写文章</NavLink>
                    </div>
                </div>
            </div>
        );
    }

}
Nav.propTypes = propTypes;
