import {Link} from 'react-router-dom';

let propTypes = {
    username:PT.array
}

export default function Author(props){
    let {username} = props;
    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
            >
                <img src='http://p2.gexing.com/G1/M00/1B/D1/rBACJlRxPwTyuRnpAAAgifkS-zM719_200x200_3.jpg?recache=20131108' alt=""/>
            </Link>
            <div className="content" style={{marginTop:12}}>
                <div className="header">
                    {username}
                </div>
            </div>
        </div>

    );
}
