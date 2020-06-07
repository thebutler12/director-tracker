import React, { useState, useEffect, useContext } from 'react';
import PersistentDrawer from '../Drawer/PersistentDrawer/PersistentDrawer';

export default () => {
  useEffect(() => {}, []);

  return (
    <div id='header' className='header'>
      <PersistentDrawer />
    </div>
  );
};
