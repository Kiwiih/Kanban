import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";

const Footers = () => {
  return (
    <footer>
        <Link to="/"><FaHome className='footer-icon'/></Link>
    </footer>
  )
}

export default Footers

