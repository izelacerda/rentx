import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import  { Confirmation } from '../pages/Confirmation';
import  { MyCars } from '../pages/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes(){
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen 
        name="Home"
        component={Home}
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