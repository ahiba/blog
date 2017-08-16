import {Link,withRouter} from 'react-router-dom';
import S from './style.scss';

 function AuthorInfo(props){
     let {state} = props.location
     let {userInfo} = state;
     let {user} = userInfo;
    return (
        <div className={S.author_info}>
            <div>
                <img style={{width:60,height:60}}
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502453118472&di=0d4f09f296eef5bf498974034bff4c88&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201408%2F04%2F20140804115024_HWPuk.thumb.224_0.jpeg" alt=""/>
            </div>
            <div className={S.title}>
                <Link
                    to="/my_page"
                    className={S.name}
                >
                    {user}
                </Link>
            </div>

        </div>
    );
}
export default withRouter(AuthorInfo)
