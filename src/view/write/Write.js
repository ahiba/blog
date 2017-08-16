/**
 * Created by zhan on 2017/8/5.
 */


import {Component} from 'react';
// import cfg from 'config/config.json';
import S from './style.scss';
let propTypes = {
    myInfo:PT.object,
    categories:PT.array,
    categoriesAjax:PT.func,
    page:PT.number
}

export default class Write extends Component{

    constructor(props){
        super(props);
        this.state = {
            collections:[],
            titleVal:'',
            contentVal:'',
            cltVal:''
        }
        this.titleChange =this.titleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.cltChange = this.cltChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addCollections = this.addCollections.bind(this);
    }
    titleChange(ev){
        this.setState({
            titleVal:ev.target.value
        })
    }
    contentChange(ev){
        this.setState({
            contentVal:ev.target.value
        })
    }
    cltChange(ev){
        this.setState({
            cltVal:ev.target.value
        })
    }
    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();
        console.log(1)
        let {value:clsId} = this.refs.clsIdInput;
        let {value:cltId} = this.refs.cltIdInput;
        let{titleVal,contentVal} = this.state
        let {_id} = this.props.myInfo;
        $.post('/ahiba/admin/write',{
            category:clsId,
            title:titleVal,
            content:contentVal,
            user:_id,
            collection: cltId
        })
            .done(ret=>{
                let{code} = ret;
                if(code==0){
                   this.setState({
                       titleVal:'',
                       contentVal:''
                   })
                }
            })
    }
    componentDidMount(){
        let {page} = this.props
        this.props.categoriesAjax(page);
        $(this.refs.dropdown1).dropdown();
        $(this.refs.dropdown2).dropdown();
        $.post('/ahiba/admin/cltList')
            .done(
                ret=>{
                    let{code,data} = ret;
                    if(code===0){
                        this.setState({
                            collections:data
                        })
                    }}

            )

    }
    componentWillUnMount(){
        $(this.refs.dropdown1).off();
        $(this.refs.dropdown2).off();
    }
    addCollections(ev){
        let {_id:user_id} = this.props.myInfo;
        if(ev.keyCode==13){
            $.post('/ahiba/admin/addCollection',{
                name:this.state.cltVal,
                user_id
            })
                .done((ret)=>{
                  let {data} = ret;
                    if(data){
                        this.setState({
                            collectionVal:'',
                            collections:data
                        })
                     }
                })
            }
    }


    render() {
        let {titleChange, contentChange, cltChange, onSubmit,addCollections} = this;
        let {titleVal, contentVal, cltVal} = this.state;
        let {categories} = this.props;
        let {collections} = this.state;

        categories = categories.map(({categoryname, _id}, i) => {
            return (
                <div className="item"
                     key={i}
                     data-value={_id}
                >
                    {categoryname}
                </div>
            )
        })
        collections = collections.map(({collection_name,_id},i)=>{
            return(
                <div className="item"
                     key={i}
                     data-value={_id}
                >
                    {collection_name}
                </div>
            )
        })
        return (
            <div className="ui container">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <form className="ui form"
                onSubmit={onSubmit}
                >
                    <div className="ui selection dropdown field" id="writeArtical" ref="dropdown1">
                        <input
                            type="hidden"
                            name="album"
                            ref="clsIdInput"
                        />
                        <div className="default text">选择文章类别</div>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            {categories}
                        </div>
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                            value={titleVal}
                            onChange={titleChange}
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div className="ui selection dropdown" id="writeArtical" ref="dropdown2">
                                <input
                                    type="hidden"
                                    name="album"
                                    ref="cltIdInput"
                                />
                                <div className="default text">选择一个文集</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    {collections}
                                </div>
                            </div>
                        </div>
                        <div className="field eleven wide column">
                            <input
                                type="text"
                                className=""
                                placeholder="回车, 添加文集"
                                value={cltVal}
                                onChange={cltChange}
                                onKeyDown={addCollections}

                            />
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="随便写点文字. . ."
                            value={contentVal}
                            onChange={ contentChange}
                        >
                        </textarea>
                    </div>
                    <div className="field">
                        <button type="submit"
                                className="ui button primary"
                        >保存
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}

Write.propTypes = propTypes;
