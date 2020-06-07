import React , { useState, useEffect, useContext } from 'react';
import CustomSnackbar from '../../Utils/SnackBar/CustomSnackbar';
import PersistentDrawer from '../Drawer/PersistentDrawer/PersistentDrawer'


export default () => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
  }, []);


  return (
    <div id='header' className='header'>

      <PersistentDrawer />
      {showError && (
        <CustomSnackbar
          vertical='bottom'
          horizontal='center'
          type='error'
          message='We could not load resource persitent configuration. Refresh page to try again'
        />
      )}
    </div>
  );
};
