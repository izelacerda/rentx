import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
// import { StyleSheet, StatusBar, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
// import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { useNavigation } from '@react-navigation/native';
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
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([])
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

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }
  // function handleMyOpenCars() {
  //   navigation.navigate('MyCars');
  // }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get('/cars'); 
        if(isMounted) {
          setCars(response.data);
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
  useEffect(() => {
    if(netInfo.isConnected) {
      Alert.alert('Você esta On-line!');
    } else{
      Alert.alert('Você esta Off-line!');
    }
  },[netInfo.isConnected])
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