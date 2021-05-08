import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export default function Footer(){
    return(
        <div className="footer">
            <div className="footer-header">
              Made with <span style={{color:"red"}}> ❤ </span> by
              Prem Kantikar
            </div>
            <div className="social-links">
                <a className="icon" href="https://github.com/alcatraz69" target="_blank" rel="noreferrer"> <FaGithub/></a>
                <a className="icon" href="https://twitter.com/prem_kantikar_" target="_blank" rel="noreferrer"> <FaTwitter/> </a>
                <a className="icon" href="https://twitter.com/prem_kantikar_" target="_blank" rel="noreferrer"> <FaLinkedinIn/></a>
            </div>
            <div className="footer-end">
                © 2021 Alcatraz Designs
           </div>
        </div>
    )
}