/**
 * Created by zhan on 2017/8/5.
 */

let propTypes = {
    loginAjax:PT.func,
    clearMsg:PT.func,
    loginMsg:PT.object

}
import Validation from 'util/validation'

export default class LoginPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userVal:'',
            passVal:'',
            nameErr:false,
            passErr:false,

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
            {strategy: 'maxLength:10', errorMsg: '密码最长为10'}
        ]);

        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.loginPost = this.loginPost.bind(this);
    }
    loginPost(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {loginAjax} = this.props
        let username = this.refs.user.value;
        let password = this.refs.password.value;

        let nameErr = this.validator.valiOneByValue('username',username);
        let passErr = this.validator.valiOneByValue('password',password);

        if(!nameErr&&!passErr){
            loginAjax({username,password})
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
    componentWillUnmount(){
        this.props.clearMsg();
        this.setState({
            nameErr:false,
            passErr:false,
        })
    }

    render(){
        let {nameVal,passVal,nameErr,passErr} = this.state;
        let {nameChange,passChange,loginPost} = this;
        let {loginMsg} = this.props
        let resInfo = null;
        if(loginMsg){
            if(loginMsg.code!=0){
                resInfo = (
                    <div className="ui message error">
                        {loginMsg.message}
                    </div>
                )
            }
        }


        return(
            <div className="ui container center aligned grid "  style={{paddingTop:60}}>
                <div className="column seven wide">
                    {resInfo}{nameErr}{passErr}
                    <form className="ui large form"

                    >
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="user" placeholder="username"
                                    value={nameVal}
                                           ref="user"
                                    onChange = {nameChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password"
                                    value={nameVal}
                                           ref="password"
                                           onChange={passChange}
                                    />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button"
                            onClick={loginPost}
                            >Login</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
LoginPanel.propTypes = propTypes;