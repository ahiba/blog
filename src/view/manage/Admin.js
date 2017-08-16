/**
 * Created by zhan on 2017/8/7.
 */

export default class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            pages:1,
            page:1,
            limit:0,
            count:0
        }
        this.pageMin = this.pageMin.bind(this);
        this.pagePlu = this.pagePlu.bind(this);
        this.getAdmin = this.getAdmin.bind(this);
    }
    pageMin(){
        let {page} = this.state;
        page=page-1;
        this.setState({
            page:page
        })
        this.getAdmin(page);
        console.log('pageMin')
    }
    pagePlu(){
        let {page} = this.state;
        page=page+1;
        this.setState({
            page:page
        })
        this.getAdmin(page);
        console.log('pagePlu')
    }
    componentDidMount(reqData) {
        let {page} = this.state
       $.post('/ahiba/admin/admin',{page})
           .done(ret=>{
               this.setState({
                   users:ret.users,
                   pages:ret.pages,
                   page:ret.page,
                   limit:ret.limit,
                   count:ret.count

               })
           })
        }
        getAdmin(page){
            $.post('/ahiba/admin/admin',{page})
                .done(ret=>{
                    this.setState({
                        users:ret.users,
                        pages:ret.pages,
                        page:ret.page,
                        limit:ret.limit,
                        count:ret.count
                    })
                })
        }

    render(){
        let {pageMin,pagePlu} = this
        let {users,pages,page,count,limit} = this.state;
        if(users){
            users = users.map((elt,i)=>{
                let {
                    _id,
                    username,
                    password,
                    isAdmin
                } = elt;

                return(
                        <tr key = {i}>
                            <td>{_id}</td>
                            <td>{username}</td>
                            <td>{password}</td>
                            <td>{  isAdmin?('是'):("")}</td>
                        </tr>
                )
            })

        }
        return(
            <div>
            <div className="ui breadcrumb">
                <a className="section">管理首页</a>
                <div className="divider"> / </div>
                <a className="section">用户列表</a>
            </div>

            <table className="ui red table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>是否是管理员</th>
                    </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
        </table>
                <div className="ui center aligned  container ">
                <div className="ui buttons">
                    <button className="ui labeled icon button active"
                    onClick={pageMin}
                    ><i className="left chevron icon"></i> 上一页 </button>
                    <button className="ui button">{`一共有${count}条数据，每页显示${limit}条，一共${pages}页，当前${page}页`}</button>
                    <button className="ui right labeled icon button"
                    onClick={pagePlu}
                    >下一页<i className="right chevron icon"></i> </button>
                </div>
                </div>
            </div>
        )
    }
}