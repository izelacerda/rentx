import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}
export function PasswordInput({
  iconName,
  value,
  ...rest
} : Props ){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPassWordVisible, setIsPassWordVisible] = useState(true);

  function handleInputFocus(par: boolean) {
    setIsFocused(par);
    if(par===false) {
      setIsFilled(!!value)
    }
  }

  const theme = useTheme();

  function handlePassWordVisibilityChange() {
    setIsPassWordVisible(!isPassWordVisible);
  }
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        secureTextEntry={isPassWordVisible}
        onFocus={() => handleInputFocus(true)}
        onBlur={() => handleInputFocus(false)}
        isFocused={isFocused}
        autoCorrect={false}
        {...rest}
      />
      <BorderlessButton onPress={handlePassWordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather 
            name={isPassWordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
            />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}