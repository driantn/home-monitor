import React from 'react';
import { View, ScrollView, } from 'react-native';

import css from './styles';

type Props = {
  children: any,
};

class MainView extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <ScrollView style={css.scrollView}>
        <View style={css.container}>
          {children}
        </View>
      </ScrollView>
    );
  }
}

export default MainView;
