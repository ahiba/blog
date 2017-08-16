
import {Link,withRouter} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
    initMyPage:PT.func,
    getContent:PT.func,
    commentAjax:PT.func
}

function Preview(props){

    let {
        title,
        content,
        category,
        clt,
        user,
        addTime,
        initMyPage,
        myInfo,
        history,
        user_id,
        _id,
        getContent,
        commentAjax
    } = props;

    return (
        <div className={`${S.note}`}>
            <div className="ui divider hidden"></div>
            <div className={`${S.content}`}>
                <div className={`${S.author}`}>
                    <Link to="/"
                        className="avatar"
                    >
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502453118472&di=0d4f09f296eef5bf498974034bff4c88&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201408%2F04%2F20140804115024_HWPuk.thumb.224_0.jpeg" alt="" className="ui avatar image"/>
                    </Link>
                    <div className={`${S.name}`}>
                        <Link to="/mypage"
                        onClick={ev=>{
                            ev.preventDefault();
                            ev.stopPropagation();
                            history.push('/mypage',{
                                userInfo:{
                                    user_id,
                                    user
                                }
                            })
                            initMyPage(user_id,{user_id},'所有文章')
                        }}
                        >{user}</Link>
                        <span className="time">{addTime}</span>
                    </div>
                </div>
                <div>

                    <a className={S.meta}>
                        {props.children}
                    </a>
                    <Link to="/" className={S.title}>{title}</Link>
                </div>


                <p className={S.abstract}>
                    {content}
                </p>

                <div className="ui animated button" tabIndex="0"
                onClick={
                  ev=>{
                      ev.preventDefault();
                      ev.stopPropagation();
                      history.push('/view',{
                          contentInfo:{
                              _id
                          }
                      });
                      getContent(_id)
                      commentAjax(null,null,_id);
                  }
                }
                >
                    <div className="visible content">阅读全文</div>
                    <div className="hidden content">
                        <i className="right arrow icon"></i>
                    </div>
                </div>
                </div>
            </div>
    );
}

Preview.propTypes = propTypes;

export default withRouter(Preview)

