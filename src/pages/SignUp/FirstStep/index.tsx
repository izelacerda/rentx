import React, { useState } from 'react';
import { 
  // StatusBar, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

export function FirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState(0);

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });
      const data = { name, email, driverLicense};
      await schema.validate(data);

      navigation.navigate('SecondStep', { user: data});
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa',error.message);
      } else {
        Alert.alert(
          'Erro na Autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active />
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={(value) => setDriverLicense(Number(value))}
              value={driverLicense.toString()}
            />
          </Form>
          <Button 
            title="Próximo"
            onPress={handleNextStep}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}