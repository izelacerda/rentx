import React, { useState } from 'react';
import { 
  // StatusBar, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { Confirmation } from '../../Confirmation';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PassWordInput } from '../../../components/PassWordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: number;
  }
}
export function SecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a sua confirmação');
    }
    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais!');
    }
    navigation.navigate('Confirmation', {
      title: 'Conta Criada!',
      message: `Agora é só fazer login\ne aproveitar`,
      nextScreenRoute: 'SignIn'
    });
   
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PassWordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PassWordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button 
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}