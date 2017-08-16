
import AuthorInfo from 'components/mypage/AuthorInfo';
import Aside from 'components/mypage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    myPagePreviews:PT.array,
    notebooks:PT.array,
    previewsName:PT.string
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {myPagePreviews,notebooks,previewsName} = this.props
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                        <PreviewList
                            {...{
                                contents: myPagePreviews
                            }}
                        />


                </div>
                <div className="four wide column">
                        <Aside
                            {...{
                                notebooks
                            }}
                        />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
