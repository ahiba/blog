
import S from './style.scss';

let propTypes = {
    notebooks:PT.array
}

export default class Aside extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let {notebooks} = this.props
       notebooks = notebooks.map((elt,i)=>{
            let {_id,collection_name} = elt;
            return(
                <div className="ui list"
                key={i}
                >
                    <i className="book icon"></i>
                    {collection_name}
                </div>
            )
       })

        return (
            <div className={S.aside}>

                <div className="introduce">
                    <div className="title">
                        个人介绍
                        <div className="ui divider hidden"></div>

                        <p>个人介绍的信息</p>

                    </div>
                </div>

                <div className="ui divider hidden"></div>

                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    {notebooks}
                </div>

            </div>
        );
    }
}
Aside.propTypes = propTypes
