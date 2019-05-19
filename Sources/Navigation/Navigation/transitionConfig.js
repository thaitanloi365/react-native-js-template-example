import { Animated, Easing, I18nManager } from "react-native";

const EPS = 1e-5;

function getSceneIndicesForInterpolationInputRange(props) {
  const { scene, scenes } = props;
  const index = scene.index;
  const lastSceneIndexInScenes = scenes.length - 1;
  const isBack = !scenes[lastSceneIndexInScenes].isActive;

  if (isBack) {
    const currentSceneIndexInScenes = scenes.findIndex(item => item === scene);
    const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive);
    const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
    const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

    if (index !== targetSceneIndex && currentSceneIndexInScenes === lastSceneIndexInScenes) {
      return {
        first: Math.min(targetSceneIndex, index - 1),
        last: index + 1
      };
    } else if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return {
        first: index - 1,
        last: Math.max(lastSceneIndex, index + 1)
      };
    } else if (index === targetSceneIndex || currentSceneIndexInScenes > targetSceneIndexInScenes) {
      return null;
    } else {
      return { first: index - 1, last: index + 1 };
    }
  } else {
    return { first: index - 1, last: index + 1 };
  }
}

function forInitial(props) {
  const { navigation, scene } = props;

  const focused = navigation.state.index === scene.index;
  const opacity = focused ? 1 : 0;
  // If not focused, move the scene far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  };
}

function forHorizontal(props) {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props);

  if (!interpolate) return { opacity: 0 };

  const { first, last } = interpolate;
  const index = scene.index;

  const width = layout.initWidth;
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    outputRange: I18nManager.isRTL ? [-width, 0, width * 0.3] : [width, 0, width * -0.3],
    extrapolate: "clamp"
  });

  const shadowOpacity = props.shadowEnabled
    ? position.interpolate({
        inputRange: [first, index, last],
        outputRange: [0, 0.7, 0],
        extrapolate: "clamp"
      })
    : null;

  let overlayOpacity = props.cardOverlayEnabled
    ? position.interpolate({
        inputRange: [index, last - 0.5, last, last + EPS],
        outputRange: [0, 0.07, 0.07, 0],
        extrapolate: "clamp"
      })
    : null;

  return {
    transform: [{ translateX }],
    overlayOpacity,
    shadowOpacity
  };
}

function forVertical(props) {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props);

  if (!interpolate) return { opacity: 0 };

  const { first, last } = interpolate;
  const index = scene.index;
  const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [height, 0, 0],
    extrapolate: "clamp"
  });

  return {
    transform: [{ translateY }]
  };
}

export default function getSlideFromRightTransitionConfig() {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      timing: Animated.timing
    },
    screenInterpolator: forHorizontal
  };
}
