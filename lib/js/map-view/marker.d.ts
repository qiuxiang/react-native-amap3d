import * as React from "react";
import { LatLng, Point } from "../types";
import Component from "./component";
export interface MarkerProps {
    /**
     * 坐标
     */
    coordinate: LatLng;
    /**
     * 标题，作为默认的选中弹出显示
     */
    title?: string;
    /**
     * 描述，显示在标题下方
     */
    description?: string;
    /**
     * 默认图标颜色
     */
    color?: string;
    /**
     * 自定义图标
     */
    icon?: () => React.ReactElement;
    /**
     * 自定义图片，对应原生图片名称
     */
    image?: string;
    /**
     * 透明度 [0, 1]
     */
    opacity?: number;
    /**
     * 是否可拖拽
     */
    draggable?: boolean;
    /**
     * 是否平贴地图
     */
    flat?: boolean;
    /**
     * 层级
     */
    zIndex?: number;
    /**
     * 覆盖物锚点比例
     *
     * @link http://a.amap.com/lbs/static/unzip/Android_Map_Doc/3D/com/amap/api/maps/model/Marker.html#setAnchor-float-float-
     * @platform android
     */
    anchor?: Point;
    /**
     * 覆盖物偏移位置
     *
     * @link http://a.amap.com/lbs/static/unzip/iOS_Map_Doc/AMap_iOS_API_Doc_3D/interface_m_a_annotation_view.html#a78f23c1e6a6d92faf12a00877ac278a7
     * @platform ios
     */
    centerOffset?: Point;
    /**
     * 是否选中，选中时将显示信息窗体，一个地图只能有一个正在选中的 marker
     */
    active?: boolean;
    /**
     * 是否禁用点击，默认不禁用
     */
    clickDisabled?: boolean;
    /**
     * 是否禁用弹出窗口，默认不禁用
     */
    infoWindowDisabled?: boolean;
    /**
     * 自定义 InfoWindow
     */
    children?: React.ReactChild;
    /**
     * 点击事件
     */
    onPress?: () => void;
    /**
     * 拖放开始事件
     */
    onDragStart?: () => void;
    /**
     * 拖放进行事件，类似于 mousemove，在结束之前会不断调用
     */
    onDrag?: () => void;
    /**
     * 拖放结束事件，最终坐标将传入参数
     */
    onDragEnd?: (coordinate: LatLng) => void;
    /**
     * 信息窗体点击事件
     *
     * 注意，对于自定义信息窗体，该事件是无效的
     */
    onInfoWindowPress?: () => void;
}
/**
 * @ignore
 */
export default class Marker extends Component<MarkerProps> {
    static propTypes: any;
    nativeComponent: string;
    icon: any;
    _ismounted: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    active(): void;
    update(): void;
    lockToScreen(x: number, y: number): void;
    renderCustomMarker(icon: () => React.ReactElement): any;
    renderInfoWindow(view: React.ReactChild): JSX.Element;
    render(): JSX.Element;
}
