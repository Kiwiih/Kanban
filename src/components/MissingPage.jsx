import {Link} from "react-router-dom"
import { FaUndo } from "react-icons/fa";

const MissingPage = () => {
 return ( 
 <main className="missing">
    <h2>These aren't the droids you're looking for.</h2>
    <img className="MissingPic" src="https://404consultancy.nl/wp-content/uploads/2022/10/Oops-404-Error-with-a-broken-robot-bro-1024x1024.png" alt="" />
    <Link to="/" className="missingLink">Back to the homepage <FaUndo/></Link>
</main>
)}

export default MissingPage;