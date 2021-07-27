import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}
export function Input({
  iconName,
  value,
  ...rest
} : Props ){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus(par: boolean) {
    setIsFocused(par);
    if(par===false) {
      setIsFilled(!!value)
    }
  }

  const theme = useTheme();

  return (
    <Container>
      <IconContainer  isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onFocus={() => handleInputFocus(true)}
        onBlur={() => handleInputFocus(false)}
        {...rest}
      />
    </Container>
  );
}