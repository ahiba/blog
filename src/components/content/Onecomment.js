/**
 * Created by zhan on 2017/8/11.
 */

let propTypes = {
    comment:PT.string,
    postTime:PT.string,
    username:PT.string
}

export default class Onecomment extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {comment,postTime,username} = this.props;
        return(
            <div className="comment">
                <a className="avatar">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502453118472&di=0d4f09f296eef5bf498974034bff4c88&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201408%2F04%2F20140804115024_HWPuk.thumb.224_0.jpeg"/>
                </a>
                <div className="content">
                    <a className="author">{username}</a>
                    <div className="metadata">
                        <span className="date">{postTime}</span>
                    </div>
                    <div className="text">{comment} </div>
                    <div className="actions">
                        <a className="reply">Reply</a>
                    </div>
                </div>
            </div>
        )
    }
}
Onecomment.propTypes = propTypes;