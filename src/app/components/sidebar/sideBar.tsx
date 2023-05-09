
import React from 'react'
import DesktopSideBar from './desktopSidebar';
import MobileFooter from './mobileFooter';

async function SideBar({children} : {children: React.ReactNode}) {
  return (
    <div className='h-full'>
      <DesktopSideBar/>
      <MobileFooter/>
        <div className='lg:pl-20 h-full'>
          {children}
        </div>
    </div>
  );
};

export default SideBar;