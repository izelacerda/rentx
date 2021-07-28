import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import  { Confirmation } from '../pages/Confirmation';
import  { Splash } from '../pages/Splash';
import  { SignIn } from '../pages/SignIn';
import  { FirstStep } from '../pages/SignUp/FirstStep';
import  { SecondStep } from '../pages/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen 
        name="Splash"
        component={Splash}
      />
      <Screen 
        name="SignIn"
        component={SignIn}
      />
      <Screen 
        name="FirstStep"
        component={FirstStep}
      />
      <Screen 
        name="SecondStep"
        component={SecondStep}
      />
      <Screen 
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}