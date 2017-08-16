import {Link} from 'react-router-dom';
import Preview from './Preview';
import S from './style.scss';

let propTypes = {
    contents:PT.array,
    initMyPage:PT.func,
    myInfo:PT.object,
    getContent:PT.func,
    commentAjax:PT.func
}

export default function PreviewList(props){
let {contents,initMyPage,myInfo,getContent,commentAjax} = props;

contents = contents.map((elt,i)=>{
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
        <Preview
            {...{
                title,
                content,
                category,
                collection_name,
                user,
                addTime,
                initMyPage,
                myInfo,
                user_id,
                _id,
                getContent,
                commentAjax
            }}
            key = {i}
        >
            { collection_id ? (
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
                ):null }

        </Preview>
    )
})
    return (
        <div>
            {contents}
        </div>
    );
}
PreviewList.propTypes = propTypes;