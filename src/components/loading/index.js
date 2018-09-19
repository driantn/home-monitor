import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import css from './styles';

type Props = {
  isLoading: boolean,
}
const Loading = (props: Props) => {
  const { isLoading } = props;
  return (
    <View style={css.loading}>
      <ActivityIndicator
        size={70}
        color="#fff"
        animating={isLoading}
        hidesWhenStopped={isLoading}
      />
    </View>
  );
}

export default Loading;
