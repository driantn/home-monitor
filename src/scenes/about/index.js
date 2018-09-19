import React from 'react';
import { Text } from 'react-native';
import MainView from 'base/components/main';

class About extends React.PureComponent {
  render() {
    return (
      <MainView>
        <Text>
          {'About me'}
        </Text>
      </MainView>
    );
  }
}

export default About;
