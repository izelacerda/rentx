import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import  { Confirmation } from '../pages/Confirmation';
import  { MyCars } from '../pages/MyCars';
import  { Splash } from '../pages/Splash';
import  { SignIn } from '../pages/SignIn';
import  { FirstStep } from '../pages/SignUp/FirstStep';
import  { SecondStep } from '../pages/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
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
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen 
        name="CarDetails"
        component={CarDetails}
      />
      <Screen 
        name="Scheduling"
        component={Scheduling}
      />
      <Screen 
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen 
        name="Confirmation"
        component={Confirmation}
      />
       <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}