/**
 * Created by zhan on 2017/8/5.
 */

import Validation from 'util/validation'

let propTypes = {
    registerAjax:PT.func,
    registerMsg:PT.object
}

export default class RegisterPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userVal:'',
            passVal:'',
            rePassVal:'',
            userErr:false,
            passErr:false,
            rePassErr:false
        }

        this.validator = new Validation();

        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg: '用户名不能是空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:16', errorMsg: '用户名最长为16'},
        ]);

        this.validator.addByValue('password',[
            {strategy: 'isEmpty', errorMsg: '密码不能是空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:10', errorMsg: '密码最长为10'},
            {strategy: 'minLength:4', errorMsg: '密码最短为4'}
        ]);

        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.rePassChange = this.rePassChange.bind(this);
        this.registerPost = this.registerPost.bind(this);
    }
    registerPost(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let {registerAjax} = this.props
        let username = this.refs.user.value;
        let password = this.refs.password.value;
        let repassword = this.refs.repassword.value;

        let nameErr = this.validator.valiOneByValue('username',username);
        let passErr = this.validator.valiOneByValue('password',password);
        let rePassErr = password=== repassword ? '': '密码不一致';

        this.setState({
            nameErr,passErr,rePassErr
        })
        if(!nameErr&&!passErr&&!rePassErr){
           registerAjax({
               username:username,
               password:password
           });
                
            }
        }

    userChange(ev){
    this.setState({
        userVal:ev.target.value
    })
}

    passChange(ev){
        this.setState({
            passVal:ev.target.value
        })
    }
    rePassChange(ev){
        this.setState({
            rePassVal:ev.target.value
        })
    }
    componentWillUnmount(){
        this.props.clearMsg();
        this.setState({
            userErr:false,
            passErr:false,
            rePassErr:false
        })
    }

    render(){
        let {userVal,passVal,rePassVal,userErr,passErr,rePassErr} = this.state;
        let {userChange,passChange,rePassChange,registerPost} = this
        let {registerMsg} = this.props
        let resInfo = null;
        if(registerMsg){
            if(registerMsg.code===0){
              resInfo=(  <div className="ui message success">
                    {registerMsg.message}
                    <p>注册成功，马上帮您登入</p>
                </div>)
            }else{
                resInfo=(
                    <div className="ui message err">
                        {registerMsg.message}
                    </div>
                )
            }
        }

        return(
            <div className="ui middle aligned center aligned grid  eleven wide column" style={{paddingTop:60}}>
                <div className="column seven wide">
                    {resInfo}{userErr}{passErr}{rePassErr}
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="user" placeholder="User name"
                                    value={userVal}
                                    onChange={userChange}
                                           ref="user"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password"
                                    value={passVal}
                                           onChange={passChange}
                                           ref="password"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="repassword" placeholder="RePassword"
                                    value={rePassVal}
                                           onChange={rePassChange}
                                           ref="repassword"
                                    />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button"
                            onClick={registerPost}
                            >Register</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
RegisterPanel.propTypes = propTypes;