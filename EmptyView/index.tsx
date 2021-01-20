import React from 'react';
import {
  Image, StyleSheet, StyleProp, ImageStyle,
} from 'react-native';
import Box from '../../Box';
import { ViewProps } from '../../Themed';
import SkeletonComponent from './SkeletonView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    marginLeft: 16,
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  verticalAlign: {
    flexDirection: 'column',
  },
  horizontalAlign: {
    flexDirection: 'row',
  },
  horizontalImageSpacing: {
    marginRight: 16,
  },
  verticalImageSpacing: {
    marginBottom: 16,
  },
  alignCenter: {
    alignItems: 'center',
  },
  skeltonView: {
    marginBottom: 8,
  },
});

export interface Props extends ViewProps {
  alignment?: 'left' | 'center' | 'inline';
  hasImage?: boolean,
  imageStyle?: StyleProp<ImageStyle>,
  source?: object,
}

const EmptyState = (props: Props) => {
  const {
    alignment = 'left',
    hasImage = false,
    imageStyle,
    source = {},
    style,
  } = props;

  const getOrientation = () => (alignment === 'inline' ? styles.horizontalAlign : styles.verticalAlign);

  const getSpacing = () => (alignment === 'inline' ? styles.horizontalImageSpacing : styles.verticalImageSpacing);

  const getAlignment = () => (alignment === 'center' && styles.alignCenter);

  return (
    <Box style={[style, styles.container, getOrientation()]}>
      <Box style={[getAlignment(), getOrientation()]}>
        <Box>
          {hasImage && (
            <Image
              style={[imageStyle, styles.imageStyle, getSpacing()]}
              source={source}
            />
          )}
        </Box>
        <Box style={getAlignment()}>
          <SkeletonComponent width={44} style={styles.skeltonView} />
          <SkeletonComponent width={140} style={styles.skeltonView} />
          <SkeletonComponent width={117} />
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyState;
