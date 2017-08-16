/**
 * Created by zhan on 2017/8/7.
 */

let propTypes = {
    catAjax:PT.func
}

export default class CategoryAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            catVal:''
        }
        this.catPost = this.catPost.bind(this);
        this.catChange = this.catChange.bind(this);
    }
    catChange(ev){
        this.setState({
            catVal:ev.target.value
        })
    }
    catPost(){
        let {catAjax} = this.props
       let catVal =this.state
        catAjax(catVal);
}
    render(){
        let {catPost,catChange} = this
        let {catVal} = this.state
        return(
            <div>
                <div className="ui breadcrumb">
                    <a className="section">管理首页</a>
                    <div className="divider"> / </div>
                    <a className="section">分类添加</a>
                </div>
                <form className="ui form">
                    <div className="field">
                        <label>分类名称</label>
                        <input type="text" name="category" placeholder="category"
                               value={catVal}
                               onChange = {catChange}
                        />
                    </div>
                    <button className="ui button" type="submit"
                    onClick={catPost}
                    >提交</button>
                </form>
            </div>
        )
    }
}
CategoryAdd.propTypes = propTypes;