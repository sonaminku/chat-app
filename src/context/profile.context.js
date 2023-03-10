/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import { auth, database, messaging } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let userRef;
    let userStatusRef;
    let tokenRefreshUnsub;

    const authUnSub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (!!snapshot.val() === false) {
            return;
          }
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            const currentToken = await messaging.getToken()
            if(currentToken) {
              await database.ref(`/fcm_tokens/${currentToken}`).set(authObj.uid)
              // todo
            }
          } catch (err) {
            
            // eslint-disable-next-line no-console
            console.log('An error occurred while retrieving token. ', err);
          }

          tokenRefreshUnsub = messaging.onTokenRefresh(async() =>{
            try {
              const currentToken = await messaging.getToken()
              if(currentToken) {
                await database.ref(`/fcm_tokens/${currentToken}`).set(authObj.uid)
                // todo
              }
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log('An error occurred while retrieving token. ', err);
            }
          })
      } 
    } else {
      if (userRef) {
        userRef.off();
      }
      if(tokenRefreshUnsub) {
        tokenRefreshUnsub()
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
      database.ref('.info/connected').off();

      setProfile(null);
      setIsLoading(false);
    }
    });
    return () => {
      authUnSub();
      database.ref('.info/connected').off();
      if (userRef) {
        userRef.off();
      }
      if(tokenRefreshUnsub) {
        tokenRefreshUnsub()
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
