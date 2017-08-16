/**
 * Created by zhan on 2017/8/7.
 */

export default class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            blogs:[],
            pages:1,
            page:1,
            limit:0,
            count:0
        }
        this.pageMin = this.pageMin.bind(this);
        this.pagePlu = this.pagePlu.bind(this);
        this.getBlog = this.getBlog.bind(this);
    }

    pageMin(){
        let {page} = this.state;
        page=page-1;
        this.setState({
            page:page
        })
        this.getBlog(page);
    }
    pagePlu(){
        let {page} = this.state;
        page=page+1;
        this.setState({
            page:page
        })
        this.getBlog(page);
    }
    componentDidMount(reqData) {
        let {page} = this.state
        $.post('/ahiba/admin/blog',{page})
            .done(ret=>{
                this.setState({
                    blogs:ret.blogs,
                    pages:ret.pages,
                    page:ret.page,
                    limit:ret.limit,
                    count:ret.count

                })
            })
    }
    getBlog(page){
        $.post('/ahiba/admin/blog',{page})
            .done(ret=>{
                this.setState({
                    blogs:ret.blogs,
                    pages:ret.pages,
                    page:ret.page,
                    limit:ret.limit,
                    count:ret.count
                })
            })
    }
    render(){
        let {pageMin,pagePlu}=this;
        let{ blogs, pages, page, limit, count} = this.state
        if(blogs){
            blogs = blogs.map((elt,i)=>{
                let {
                    _id,
                    title,
                    category
                } = elt;
                let {categoryname} = category

                return(
                    <tr key = {i}>
                        <td>{_id}</td>
                        <td>{title}</td>
                        <td>{categoryname}</td>
                        <td>
                            <a href="/admin/category/edit?id={{category._id.toString()}}">修改</a> |
                            <a href="/admin/category/delete?id={{category._id.toString()}}">删除</a>
                        </td>
                    </tr>
                )
            })

        }
        return(
            <div>
                <div className="ui breadcrumb">
                    <a className="section">管理首页</a>
                    <div className="divider"> / </div>
                    <a className="section">内容列表</a>
                </div>

                <table className="ui red table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>标题</th>
                        <th>分类名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blogs}
                    </tbody>
                </table>
                <div className="ui center aligned  container ">
                    <div className="ui buttons">
                        <button className="ui labeled icon button active"
                                onClick={pageMin}
                        ><i className="left chevron icon"></i> 上一页 </button>
                        <button className="ui button">一共有{count}条数据，每页显示{limit}条，一共{pages}页，当前{page}页</button>
                        <button className="ui right labeled icon button"
                                onClick={pagePlu}
                        >下一页<i className="right chevron icon"></i> </button>
                    </div>
                </div>
            </div>
        )
    }
}