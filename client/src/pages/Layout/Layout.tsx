import React from 'react';
import { Outlet } from 'react-router';
import NavigationBar from '../../widgets/NavigationBar/ui/NavigationBar';

function Layout(): React.JSX.Element {
  return (
    <>
      <NavigationBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
