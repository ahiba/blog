import {Route,Redirect,Link} from 'react-router-dom';
import Nav from 'nav/Nav';
import Snav from 'nav/Snav';
import Home from 'view/home/Home.js';
import LoginPanel from 'components/user/LoginPanel'
import RegisterPanel from 'components/user/RegisterPanel'
import Write from 'view/write/Write'
// import S from './style.scss';
import Admin from  'view/manage/Admin'
import Category from  'view/manage/Category'
import CategoryAdd from  'view/manage/CategoryAdd'
import Blog from  'view/manage/Blog'
import Mypage from 'view/mypage/Mypage';
import View from 'view/content/View'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            myInfo:null,
            categories:[],
            pages:1,
            page:1,
            limit:0,
            count:0,
            myPagePreviews:[],
            notebooks:[],
            previewsName:'所有文集',
            article:[],
            loginMsg:null,
            registerMsg:null,
            commentMsg:null
        }

        this.registerAjax = this.registerAjax.bind(this);
        this.loginAjax = this.loginAjax.bind(this);
        this.logoutAjax = this.logoutAjax.bind(this);
        this. catAjax = this.catAjax.bind(this);
        this.categoriesAjax = this.categoriesAjax.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.changePeview = this.changePeview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
        this.getContent = this.getContent.bind(this);
        this.clearMsg = this.clearMsg.bind(this);
        this.commentAjax = this.commentAjax.bind(this);

    }
    commentAjax(commentVal,username,contentId){
        $.post('/ahiba/admin/comment',{commentVal,username,contentId})
            .done(ret=>{
                this.setState({
                    commentMsg:ret
                })
        })
    }
    getContent(_id){
        $.post('/ahiba/admin/getContent',{_id})
            .done(({code,article})=>{
            if(code==0){
                this.setState({
                    article:article
                })
            }
            })
    }
    getPreview(data, previewsName){
        $.post('/ahiba/admin/getPreview',data)
            .done(({code,contents})=>{
                if(code===0){
                    this.setState({
                        myPagePreviews:contents,
                        // previewsName
                    })
                }
            })
    }
    changePeview(data, previewsName){
        this.getPreview(data, previewsName);
    }
    initMyPage(user_id,prviewsData,previewsName){
        this.getPreview(prviewsData);
        $.post('ahiba/admin/getCollection',{user_id})
            .done(({code,data})=>{
                if(code===0){
                    this.setState({
                        notebooks:data
                    })
                }
            })
    }
    changePreviewsName(previewsName){
        this.setState({
            previewsName
        })
    }
    componentDidMount() {
        $.post('/ahiba/api/autologin')
            .done((ret) => {
                let {code, userInfo}=ret
                if (code === 0) {
                    this.setState({myInfo: userInfo});
                }
            })
        let {state,pathname} = this.props.location;
        if(state){
            if(state.userInfo){
                let {user_id} = state.userInfo;
                if(pathname==='/mypage'){
                    this.initMyPage(user_id,{user_id},'所有文集')
            }}
            if(state.contentInfo){
                let{_id} = state.contentInfo;
                if(pathname==='/view'){
                    this.getContent(_id)
                    this.commentAjax(null,null,_id)
                }
            }

        }

    }

    clearMsg(){
        this.setState({
            loginMsg:null,
            registerMsg:null
        })
    }

    registerAjax(reqData){
        $.post('/ahiba/api/register',reqData)
            .done(ret=>{
               this.setState({
                  registerMsg:ret
               })
                let{code,message} = ret;
                if(code===0){
                    console.log(ret.userInfo)
                   setTimeout(this.setState({
                       myInfo:ret.userInfo
                   }),1000)
                }
            })
    }

    loginAjax(reqData){

        $.post('/ahiba/api/login',reqData)
            .done(ret=>{
                let{code,userInfo,message}=ret;
                if(code===0){
                    this.setState({myInfo:userInfo})
                }else{
                    this.setState({
                        loginMsg:ret
                    })
                }
            })
    }

    logoutAjax(){
        $.post('/ahiba/api/logout')
            .done(ret=>{
                let {code}=ret;
                if(code===0){
                    this.setState({myInfo:null})
                }
            })
    }
    catAjax(catVal){
        $.post('/ahiba/admin/cat',catVal)
            .done((ret)=>{
                let {code,message} = ret;
                    console.log(message)
                })
    }
    categoriesAjax(page){
        $.post('/ahiba/admin/category',{page})
            .done(ret=>{
                this.setState({
                    categories:ret.categories,
                    pages:ret.pages,
                    page:ret.page,
                    limit:ret.limit,
                    count:ret.count
                })
            })
    }



    render(){
        let {registerAjax,loginAjax, logoutAjax,catAjax,categoriesAjax,collectionAjax,initMyPage,getContent,clearMsg,commentAjax} = this;
        let{myInfo,categories,pages,page,limit,count,myPagePreviews,notebooks,
            previewsName,article,loginMsg,registerMsg,commentMsg} = this.state;
        return (
            <div >
               <Route exact path="/" render={
                   (props)=>(
                         <div>
                           <Nav
                               {...{
                                   myInfo,
                                   logoutAjax
                               }}

                           />
                           <Home
                               {...{
                                   initMyPage,
                                   getContent,
                                   commentAjax
                               }}
                               {...props}
                           />
                         </div>
                   )
               }/>
                <Route  path="/view" render={
                    (props)=>(
                        <div>
                            <Nav
                                {...{
                                    myInfo,
                                    logoutAjax
                                }}

                            />
                            <View
                                {...{
                                    article,
                                    commentAjax,
                                    myInfo,
                                    commentMsg,
                                    getContent
                                }}
                            />
                        </div>
                    )
                }/>
                <Route exact path="/mypage" render={
                    (props)=>(
                        <div>
                            <Nav
                                {...{
                                    myInfo,
                                    logoutAjax
                                }}

                            />
                            <Mypage
                                {...{
                                    myInfo,
                                    myPagePreviews,
                                    notebooks,
                                    previewsName
                                }}
                                {...props}
                            />
                        </div>
                    )
                }/>
                <Route exact path="/login" render={(props)=>(
                    <Nav
                        {...{
                            myInfo,
                            logoutAjax
                        }}
                    />
                )}/>
                <Route exact path="/login" render={(props)=>(
                    myInfo?(<Redirect to="/"/>):( <LoginPanel
                        {...{
                            loginAjax,
                            loginMsg,
                            clearMsg
                        }}/>)
                )}/>

                    <Route exact path="/register" render={
                        (props)=>(
                            myInfo?(<Redirect to="/"/>):(
                                <div>
                                    <Nav
                                    {...{
                                        myInfo,
                                        logoutAjax
                                    }}
                                />

                                    <RegisterPanel
                                    {...{
                                        registerAjax,
                                        registerMsg,
                                        clearMsg
                                    }}/>
                                </div>
                                )
                        )
                    }/>
                <Route exact path="/Write" render={
                    (props)=>(
                        myInfo?(<div>
                                <Nav
                                    {...{
                                        myInfo,
                                        logoutAjax
                                    }}

                                />
                                <Write
                                    {...{
                                        myInfo,
                                        categories,
                                        page,
                                        categoriesAjax
                                    }}/>
                            </div>):(
                                <div>
                            <Nav
                                {...{
                                    myInfo,
                                    logoutAjax
                                }}

                            />
                                <div className="ui message err" style={{paddingTop:50}}>对不起，只有登入后才能写文章</div>
                                </div>
                            )

                    )
                }/>
                <Route path="/admin" render={
                (props)=>(
                    myInfo&&myInfo.isAdmin?(<div>
                            <Snav/>
                            <Admin/>
                        </div>):(
                            < div className="ui message err">
                                对不起，您不是管理员
                                <a href="/">点击，跳转至首页</a>
                            </div>

                        )
                )
            }/>
                <Route path="/category" render={
                    (props)=>(
                        myInfo&&myInfo.isAdmin?(       <div>
                                <Snav/>
                                <Category
                                    {...{
                                        categoriesAjax,
                                        categories,
                                        pages,
                                        page,
                                        limit,
                                        count
                                    }}
                                />
                            </div>):(
                                < div className="ui message err">
                                    对不起，您不是管理员
                                    <a href="/">点击，跳转至首页</a>
                                </div>
                            )

                    )
                }/>
                <Route path="/cat" render={
                    (props)=>(
                        myInfo&&myInfo.isAdmin?(<div>
                                <Snav/>
                                <CategoryAdd
                                    {...{
                                        catAjax
                                    }}
                                />
                            </div>):(  < div className="ui message err">
                                对不起，您不是管理员
                                <a href="/">点击，跳转至首页</a>
                            </div>)

                    )
                }/>
                <Route path="/Blog" render={
                    (props)=>(
                        myInfo&&myInfo.isAdmin?( <div>
                                <Snav/>
                                <Blog/>
                            </div>):(
                                < div className="ui message err">
                                    对不起，您不是管理员
                                    <a href="/">点击，跳转至首页</a>
                                </div>)
                    )
                }/>
            </div>
        );
    }
}

