import { useCallback, useState } from 'react';
import { View, ActivityIndicator, useWindowDimensions, Alert } from 'react-native';
import YoutubeIframe, { PLAYER_STATES } from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';

import { SCREEN_SPACE, styles, VIDEO_HEIGHT } from './styles';

export function Home() {
  const [isVideoReady, setIsVideoReady] = useState(false)

  const { width } = useWindowDimensions()
  const VIDEO_WITH = width - (SCREEN_SPACE * 2)

  const handleFullScreenChange = useCallback((isFullScreen: boolean) => {
    if(isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }, [])

  const handleChangeState = useCallback((state: string) => {
    if(state === PLAYER_STATES.ENDED) {
      Alert.alert('E aí? curtiu?', "Não deixe de comentar e seguir para mais!")
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        <YoutubeIframe
          videoId='0GOUF8vNqzE'
          width={VIDEO_WITH}
          height={isVideoReady ? VIDEO_HEIGHT : 0}
          onReady={() => setIsVideoReady(true)}
          onFullScreenChange={handleFullScreenChange}
          onChangeState={handleChangeState}
        />
      
        {!isVideoReady && <ActivityIndicator color='red' />}
      </View>
    </View>
  );
}