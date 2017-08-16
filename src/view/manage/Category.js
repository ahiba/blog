/**
 * Created by zhan on 2017/8/7.
 */

/**
 * Created by zhan on 2017/8/7.
 */

let propTypes ={
    categoriesAjax:PT.func,
    categories:PT.array,
    pages:PT.number,
    page:PT.number,
    limit:PT.number,
    count:PT.number
}

export default class Category extends React.Component{
    constructor(props){
        super(props)
        this.state={
            categories:[],
            pages:1,
            page:1,
            limit:0,
            count:0
        }
        this.pageMin = this.pageMin.bind(this);
        this.pagePlu = this.pagePlu.bind(this);
    }

    pageMin(){
        let {page} = this.props;
        page=page-1;
        this.setState({
            page:page
        })
        this.props.categoriesAjax(page);
        console.log('pageMin')
    }
    pagePlu(){
        let {page} = this.props;
        page=page+1;
        this.setState({
            page:page
        })
        this.props.categoriesAjax(page);
        console.log('pagePlu')
    }
    componentDidMount(reqData) {
        let {page} = this.props
        this.props.categoriesAjax(page);
    }

    render(){
        let {pageMin,pagePlu}=this;
        let{  categories, pages, page, limit, count} = this.props
        if(categories){
            categories = categories.map((elt,i)=>{
                let {
                    _id,
                  categoryname
                } = elt;

                return(
                    <tr key = {i}>
                        <td>{_id}</td>
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
                    <a className="section">分类列表</a>
                </div>

                <table className="ui red table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>分类名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories}
                    </tbody>
                </table>
                <div className="ui center aligned  container ">
                    <div className="ui buttons">
                        <button className="ui labeled icon button active"
                                onClick={pageMin}><i className="left chevron icon"
                        ></i> 上一页 </button>
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
Category.propTypes = propTypes;
