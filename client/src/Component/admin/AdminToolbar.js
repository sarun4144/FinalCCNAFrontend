import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import { ToolbarData } from './ToolbarData';
import './AdminToolbar.css';

const AdminToolbar = () => {
  const [toolbar, setToolbar] = useState(false);
  const showToolbar = () => setToolbar(!toolbar);
  const closeMenu = () => setToolbar(false);

  return (
    <>
    <div className='admin-toolbar'>
      <Link to='#' className='menu-toolbar' onClick={showToolbar} >
        <AiIcons.AiOutlineTool />        
      </Link>
    </div>
    <nav className={toolbar ? 'tool-menu active' : 'tool-menu'}>
      <ul className='tool-menu-item'>
        <li className='toolbar-toggle'>
            <Link to='#' className='menu-toolbar'>
          <AiIcons.AiOutlineCloseSquare  onClick={showToolbar}/>
            </Link>
        </li>
        {ToolbarData.map((item, index) => {
            return(
                <li key={index} className={item.cName} onClick={closeMenu}>
                   <Link to={item.path}>
                    <span>{item.title}</span>
                   </Link>
                </li>
            );   
        })}
        <div className='toolbar-spacer'></div>
        <Link to="#" className='menu-toolbar'>
        <AiIcons.AiOutlineCloseSquare  onClick={closeMenu}/>
        </Link>
      </ul>
    </nav>
    </>
  )
}

export default AdminToolbar
