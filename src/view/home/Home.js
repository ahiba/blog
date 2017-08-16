
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';

let propTypes = {
    initMyPage:PT.func,
    getContent:PT.func,
    commentAjax:PT.func
}

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contents:[],
            authors:[]
        }
    }
    componentDidMount(){
        $.post('/ahiba/admin/getPreview')
            .done(ret=>{
                let{code,contents} = ret;
                if(code==0){
                    this.setState({
                        contents:contents
                    })
                }
            })
        $.post('/ahiba/admin/getAuthors')
            .done(ret=>{
                this.setState({
                    authors:ret.authorsInfo
                })
            })
    }

    render(){
        let {contents,authors} = this.state
        let{initMyPage,history,getContent,commentAjax}= this.props
        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList
                        {...{
                            contents,
                            initMyPage,
                            getContent,
                            commentAjax
                        }}
                    />
                </div>
                <div className="column four wide">
                    <Recommend
                        {...{
                           contents,authors
                        }}
                    />
                </div>
            </div>
        );
    }
}
Home.propTypes = propTypes;
