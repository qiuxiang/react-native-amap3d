import * as React from "react";
import * as PropTypes from "prop-types";
import { LatLng } from "../types";
export interface PolylineProps {
    /**
     * 节点坐标
     */
    coordinates: LatLng[];
    /**
     * 线段宽度
     */
    width?: number;
    /**
     * 线段颜色
     */
    color?: string;
    /**
     * 层级
     */
    zIndex?: number;
    /**
     * 多段颜色
     */
    colors?: string[];
    /**
     * 是否使用颜色渐变
     */
    gradient?: boolean;
    /**
     * 是否绘制大地线
     */
    geodesic?: boolean;
    /**
     * 是否绘制虚线
     */
    dashed?: boolean;
    /**
     * 点击事件
     */
    onAMapPress?: () => void;
}
/**
 * @ignore
 */
export default class Polyline extends React.PureComponent<PolylineProps> {
    static propTypes: {
        coordinates: PropTypes.Validator<PropTypes.InferProps<{
            latitude: PropTypes.Validator<number>;
            longitude: PropTypes.Validator<number>;
        }>[]>;
        width: PropTypes.Requireable<number>;
        color: React.Validator<string>;
        zIndex: PropTypes.Requireable<number>;
        colors: PropTypes.Requireable<string[]>;
        gradient: PropTypes.Requireable<boolean>;
        geodesic: PropTypes.Requireable<boolean>;
        dashed: PropTypes.Requireable<boolean>;
        onAMapPress: PropTypes.Requireable<(...args: any[]) => any>;
        hitSlop?: PropTypes.Validator<import("react-native").Insets>;
        onLayout?: PropTypes.Validator<(event: import("react-native").LayoutChangeEvent) => void>;
        pointerEvents?: PropTypes.Validator<"auto" | "none" | "box-none" | "box-only">;
        removeClippedSubviews?: PropTypes.Validator<boolean>;
        style?: PropTypes.Validator<import("react-native").StyleProp<import("react-native").ViewStyle>>;
        testID?: PropTypes.Validator<string>;
        nativeID?: PropTypes.Validator<string>;
        collapsable?: PropTypes.Validator<boolean>;
        needsOffscreenAlphaCompositing?: PropTypes.Validator<boolean>;
        renderToHardwareTextureAndroid?: PropTypes.Validator<boolean>;
        shouldRasterizeIOS?: PropTypes.Validator<boolean>;
        isTVSelectable?: PropTypes.Validator<boolean>;
        hasTVPreferredFocus?: PropTypes.Validator<boolean>;
        tvParallaxProperties?: PropTypes.Validator<import("react-native").TVParallaxProperties>;
        tvParallaxShiftDistanceX?: PropTypes.Validator<number>;
        tvParallaxShiftDistanceY?: PropTypes.Validator<number>;
        tvParallaxTiltAngle?: PropTypes.Validator<number>;
        tvParallaxMagnification?: PropTypes.Validator<number>;
        onStartShouldSetResponder?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => boolean>;
        onMoveShouldSetResponder?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => boolean>;
        onResponderEnd?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderGrant?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderReject?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderMove?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderRelease?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderStart?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onResponderTerminationRequest?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => boolean>;
        onResponderTerminate?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onStartShouldSetResponderCapture?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => boolean>;
        onMoveShouldSetResponderCapture?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => boolean>;
        onTouchStart?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onTouchMove?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onTouchEnd?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onTouchCancel?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        onTouchEndCapture?: PropTypes.Validator<(event: import("react-native").GestureResponderEvent) => void>;
        accessible?: PropTypes.Validator<boolean>;
        accessibilityActions?: PropTypes.Validator<readonly Readonly<{
            name: import("react-native").AccessibilityActionName;
            label?: string;
        }>[]>;
        accessibilityLabel?: PropTypes.Validator<string>;
        accessibilityRole?: PropTypes.Validator<import("react-native").AccessibilityRole>;
        accessibilityStates?: PropTypes.Validator<import("react-native").AccessibilityStates[]>;
        accessibilityState?: PropTypes.Validator<import("react-native").AccessibilityState>;
        accessibilityHint?: PropTypes.Validator<string>;
        onAccessibilityAction?: PropTypes.Validator<(event: import("react-native").AccessibilityActionEvent) => void>;
        accessibilityComponentType?: PropTypes.Validator<"none" | "button" | "radiobutton_checked" | "radiobutton_unchecked">;
        accessibilityLiveRegion?: PropTypes.Validator<"none" | "assertive" | "polite">;
        importantForAccessibility?: PropTypes.Validator<"auto" | "yes" | "no" | "no-hide-descendants">;
        accessibilityElementsHidden?: PropTypes.Validator<boolean>;
        accessibilityTraits?: PropTypes.Validator<"search" | "link" | "none" | "button" | "text" | "disabled" | "header" | "summary" | "image" | "key" | "adjustable" | "selected" | "plays" | "frequentUpdates" | "startsMedia" | "allowsDirectInteraction" | "pageTurn" | import("react-native").AccessibilityTrait[]>;
        accessibilityViewIsModal?: PropTypes.Validator<boolean>;
        onAccessibilityEscape?: PropTypes.Validator<() => void>;
        onAccessibilityTap?: PropTypes.Validator<() => void>;
        onMagicTap?: PropTypes.Validator<() => void>;
        accessibilityIgnoresInvertColors?: PropTypes.Validator<boolean>;
    };
    static defaultProps: {
        colors: any[];
    };
    render(): JSX.Element;
}
