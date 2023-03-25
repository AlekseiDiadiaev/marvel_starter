import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bolt', 'fontSize': "24px"}}>Page do not exist</p>
            <Link to='/' style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bolt', 'fontSize': "24px"}}>Home page</Link>
        </div>
    )
}

export default Page404;