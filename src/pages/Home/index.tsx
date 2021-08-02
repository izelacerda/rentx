import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
// import { StyleSheet, StatusBar, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
// import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { synchronize } from '@nozbe/watermelondb/sync';
import BackgroundTimer from 'react-native-background-timer';

import { database } from '../../database';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from 'styled-components';

// import Animated, {
//   useSharedValue,
//   // useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
// import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

async function offlineSynchronize() {
  try {
    console.log('rodou 1')
    await synchronize({
      database,
      // pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      //   const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(JSON.stringify(migration))}`
      //   const response = await fetch(`https://my.backend/sync?${urlParams}`)
      //   if (!response.ok) {
      //     throw new Error(await response.text())
      //   }
  
      //   const { changes, timestamp } = await response.json()
      //   return { changes, timestamp }
      // },
      pullChanges: async ({ lastPulledAt }) => {
        console.log('rodou 1.5')
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        console.log('rodou 1.6')
        const { changes, latestVersion } = response.data;

        // console.log('SERVIDOR ENVIA PARA APP')
        // console.log(changes);
        // console.log(response.data)
        console.log('rodou 2')
        return { changes, timestamp: latestVersion}

      },
      pushChanges: async ({ changes }) => {
        // console.log('APP ENVIA PARA SERVIDOR')
        // console.log(changes);
        console.log('rodou 3')
        const user = changes.users;
        await api.post('/users/sync', user);
      },
      _unsafeBatchPerCollection: false,
    });
    console.log('rodou 4')
      
  } catch (error) {
    console.log('rodou erro')
    console.log(error);
    throw new Error(error);      
  } finally {
    console.log('rodou')
  }
  console.log('rodou 6')
}
BackgroundTimer.runBackgroundTimer(async () => { 
  console.log('vai rodar')
  await offlineSynchronize();
  }, 
  3000);
export function Home(){
  const [cars, setCars] = useState<ModelCar[]>([])
  const [loading, setLoading] = useState(true);

  // const positionY = useSharedValue(0);
  // const positionX = useSharedValue(0);

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ]
  //   }
  // }) 

  // const onGestureEvent  = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = ctx.positionX + event.translationX;
  //     positionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd(){
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   }

  // });

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  // const theme = useTheme();

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car });
  }
  // function handleMyOpenCars() {
  //   navigation.navigate('MyCars');
  // }
  
  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        // buscava da api
        // const response = await api.get('/cars'); 
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if(isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);        
      } finally {
        if(isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    }
  },[])

  // useEffect(()=>{
  //   if(netInfo.isConnected === true) {
  //     offlineSynchronize();
  //   }
  // },[netInfo.isConnected]);

  // useEffect(() => {
  //   if(netInfo.isConnected) {
  //     Alert.alert('Você esta On-line!');
  //   } else{
  //     Alert.alert('Você esta Off-line!');
  //   }
  // },[netInfo.isConnected])
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   })
  // },[])
  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        background-Color="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          { !loading &&
            <TotalCars>
              Total {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      { loading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item =>item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleCarDetails(item)}/>
          }
        />
      }
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
          >
          <ButtonAnimated 
            onPress={handleMyOpenCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
              />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// })