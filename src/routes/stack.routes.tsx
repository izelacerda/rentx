import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import  { SchedulingComplete } from '../pages/SchedulingComplete';
import  { MyCars } from '../pages/MyCars';
import  { Splash } from '../pages/Splash';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
       <Screen 
        name="Splash"
        component={Splash}
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
        name="SchedulingComplete"
        component={SchedulingComplete}
      />
       <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}