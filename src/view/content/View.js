/**
 * Created by zhan on 2017/8/10.
 */
import {Link} from 'react-router-dom';

import S from 'layout/preview/style.scss';
import Read from 'layout/preview/Read';
import Comment from 'components/content/Comment'
let propTypes = {
    article:PT.array,
    commentAjax:PT.func,
    myInfo:PT.object,
    getContent:PT.func
}

export default class View extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:null,
            contentId:null
        }
        this.idChange = this.idChange.bind(this);
    }
   idChange(data1,data2){
        this.setState({
            username:data1,
            contentId:data2
        })
   }


    render(){
       let {idChange} = this;
       let {username,contentId} =this.state;
        let {article,commentAjax,myInfo,commentMsg,getContent} = this.props
       article = article.map((elt,i)=>{
           let{
               title,
               content,
               addTime,
               _id
           } = elt
           let category = elt.category.categoryname;
           let  collection_name = elt.clt.collection_name;
           let  user = elt.user.username;
           let user_id = elt.user._id
           let collection_id = elt.clt._id
           return(
               <Read
                   {...{
                       title,
                       content,
                       category,
                       collection_name,
                       user,
                       addTime,
                       user_id,
                       _id,
                       idChange,
                       getContent
                   }}
                   key = {i}
               >
                   { collection_id ? (
                       <div>
                           <Link to=""
                                 className={S.tag}
                                 onClick={(ev)=>{
                                     ev.preventDefault();
                                     ev.stopPropagation();
                                     collectionClick && collectionClick(
                                         collection_id,
                                         collection_name,
                                         {
                                             user_id,
                                             user_name,
                                             avatar,
                                             user_intro
                                         }
                                     )
                                 }}
                           >{collection_name}</Link>
                        </div>
                       ):null }
               </Read>
       )})

        return(
            <div className="ui container grid">
                <div className="column twelve wide" style={{paddingTop:30}}>
                    {article}
                </div>
                <div className="column four wide" style={{paddingTop:30}}>
                    <Comment
                        {...{
                            commentAjax,
                            username,
                            contentId,
                            commentMsg
                        }}
                    />
                </div>
            </div>

        )
    }
}
View.propTypes = propTypes