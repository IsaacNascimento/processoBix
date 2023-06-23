import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'reactstrap'
import { sideBarData } from '../../containers/layout/sideBar/SideBarData'


export const VerticalLayoutTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  console.log(isOpen);

  const handleCollapse = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <React.Fragment>
      {(sideBarData || []).map((item, key) => {
        return (
            <React.Fragment key={key}>
              {item['isHeader'] ? 
               <li className='menu-title'>
                <span data-key='t-menu'>{item.label}</span>
               </li>
              : (
                (item.subMenu ? (
                  <li className='nav-item'>
                    <Link>
                     <i>{item.icon}</i>
                     <span>{item.title}</span>
                    </Link>
                     <button onClick={handleCollapse}>abrir</button>
                    <Collapse
                      isOpen={isOpen}
                      className='menu-dropdown'
                    >
                     <ul className='nav nav-sm flex-column test'>
                        {item.subMenu && ((item.subMenu || []).map((subItem, key) => (
                            <React.Fragment key={key}>
                                <li>
                                 {subItem.title}
                                </li>    
                            </React.Fragment>
                        )))}
                    </ul> 
                    </Collapse> 
                  </li> 
                ) : 
                 <li></li>
                )
              )}
            </React.Fragment>    
        )
    })}   
    </React.Fragment>
  )
}
