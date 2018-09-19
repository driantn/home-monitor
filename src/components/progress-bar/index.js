import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View, Text, Dimensions } from 'react-native';

import css from './styles';

type ProgressBarProps = {
  value: number;
  unit: string;
  color: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { value, unit, color } = props;
  const { width } = Dimensions.get('window');
  return (
    <View>
      <AnimatedCircularProgress
        size={width / 2}
        width={20}
        fill={value}
        tintColor={color}
        linecap={'round'}
        capWidth={6}
        capColor={'#fff'}
        circleRadian={200}
        backgroundColor={'#3d5875'}
        rotation={-90}
        arcSweepAngle={180}
      >
        {
          (value) => (
            <Text style={css.fillingText}>
              {`${parseInt(`${value}`, 10)} ${unit}`}
            </Text>
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;