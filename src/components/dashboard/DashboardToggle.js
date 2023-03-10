import React, { useCallback } from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import DashBoard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');
  
  const onSignOut = useCallback(() => {
    database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(()=>{
      auth.signOut();
      Alert.info('Signed out', 4000);
      close();
    }).catch(err => {
      Alert.error(err.message, 4000);
    })
  }, [close]);
  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <DashBoard onSignOut={onSignOut} />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;
