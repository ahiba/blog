/**
 * Created by zhan on 2017/8/10.
 */

import Onecomment from 'components/content/Onecomment'

let propTypes ={
    commentAjax:PT.func,
    username:PT.string,
    contentId:PT.string,
    commentMsg:PT.object
}

export default class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            commentVal:'',
            pages:1,
            page:1,
        }
        this.commentChange = this.commentChange.bind(this);
        this.commentPost = this.commentPost.bind(this);

    }
    commentChange(ev){
        this.refs.myTA.style.height = 'auto'
        if(this.refs.myTA.scrollHeight >= this.refs.myTA.offsetHeight){
            this.refs.myTA.style.height = this.refs.myTA.scrollHeight + 'px'
        }
        this.setState({
            commentVal:ev.target.value
        })
    }
       commentPost(){
        let commentVal = this.state
           let {username,contentId} = this.props
           console.log(1)
           if(username&&contentId){this.props.commentAjax(commentVal,username,contentId)}
       }



    render(){
           let {commentMsg} = this.props;
           let comments = [];
        if(commentMsg){
            comments = commentMsg.data.comments.reverse();
            comments = comments.map((elt,i)=>{
                let {
                    comment,
                    postTime,
                    username
                } = elt;
                return(
                    <Onecomment
                        {...{
                            comment,
                            postTime,
                            username
                        }}
                        key={i}
                    >
                    </Onecomment>
                )
            })
        }
        let{commentVal} = this.state;
        let{commentChange,commentPost} = this;
        return(
            <div className="ui threaded comments">
                <h5 className="ui dividing header">Comments</h5>
                    {comments}
                {/*<div className="ui buttons">*/}
                    {/*<button className="ui labeled icon button">Back </button>*/}
                    {/*<button className="ui button">1/2</button>*/}
                    {/*<button className="ui right labeled icon button">Forward </button>*/}
                {/*</div>*/}
                    <form className="ui reply form">
                    <div className="field">
                        <textarea
                        value={commentVal}
                        onChange={commentChange}
                        ref="myTA"
                        style={{height:30}}
                        ></textarea>
                    </div>
                    <div className="ui blue labeled submit icon button"
                    onClick={commentPost}
                    ><i className="icon edit"></i> Add Reply </div>
                </form>
            </div>
            )}
}
Comment.propTypes = propTypes

