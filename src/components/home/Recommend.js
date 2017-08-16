import {Link} from 'react-router-dom';
import S from './style.scss';
import Author from './Author';

let propTypes = {
    contents:PT.array,
    authors:PT.array
}

export default function Recommend(props){
    let {contents,authors} = props;
   if(contents.length>=1){
       contents = contents.map((elt, i)=>{
               let {username} =elt.user
                   return (
                       <Author
                           {...{
                           username
                           }}
                           key={i}
                       />);
               })

           }
    return (

    <div className={S.recommend} style={{marginTop:30}}>
        <div className={S.title}>
            <span>作者列表</span>
        </div>
        <div className="ui items">
            {contents}
        </div>
    </div>
    );

}
Recommend.propTypes = propTypes
