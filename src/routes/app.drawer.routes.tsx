import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AppTabRoutes } from './app.tab.routes';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/SignIn';

const Drawer = createDrawerNavigator();

export function AppDrawerRoutes(){
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerType={'front'}
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
    >
      <Drawer.Screen name="Home" component={AppTabRoutes} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="SigIn" component={SignIn} />
    </Drawer.Navigator>
  )
}