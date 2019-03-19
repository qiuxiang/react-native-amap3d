
declare module "react-native-amap3d" {
    import React, { CSSProperties } from 'react'

    export interface LocationStyle {
        image?: String,
        fillColor?: String,
        strokeColor?: String,
        strokeWidth?: Number
    }

    export interface LatLng {
        latitude: Number
        longitude: Number
    }
      
    export interface Region {
        latitude: Number
        longitude: Number
        latitudeDelta: Number
        longitudeDelta: Number
    }
      
    export interface Point {
        x: Number
        y: Number
    }

    export class Circle extends React.PureComponent<{
        /**
         * 圆点坐标
         */
        coordinate?: LatLng

        /**
         * 半径（米）
         */
        radius: Number

        /**
         * 边线宽度
         */
        strokeWidth?: Number

        /**
         * 边线颜色
         */
        strokeColor?: React.Validator<string>

        /**
         * 填充颜色
         */
        fillColor?: React.Validator<string>

        /**
         * 层级
         */
        zIndex?: Number
    }> {}

    export class HeatMap extends React.PureComponent<{
        /**
         * 节点坐标
         */
        coordinates: Array<LatLng>

        /**
         * 半径（米）
         */
        radius?: Number

        /**
         * 透明度
         */
        opacity?: Number
    }> {}

    export class MapView extends React.PureComponent<{
        mapType?: "standard" | "satellite" | "navigation" | "night" | "bus"

        style?: CSSProperties

        /**
         * 设置定位图标的样式
         */
        locationStyle?: LocationStyle

        /**
         * 设置定位模式 默认 LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER
         *
         * @platform android
         */
        locationType?: "show" | "locate" | "follow" | "map_rotate" | "location_rotate" | "location_rotate_no_center" | "follow_no_center" | "map_rotate_no_center"

        /**
         * 是否启用定位
         */
        locationEnabled?: Boolean

        /**
         * 定位间隔(ms)，默认 2000
         *
         * @platform android
         */
        locationInterval?: Number

        /**
         * 定位的最小更新距离
         *
         * @platform ios
         */
        distanceFilter?: Number

        /**
         * 是否显示室内地图
         */
        showsIndoorMap?: Boolean

        /**
         * 是否显示室内地图楼层切换控件
         *
         * TODO: 似乎并不能正常显示
         */
        showsIndoorSwitch?: Boolean

        /**
         * 是否显示3D建筑
         */
        showsBuildings?: Boolean

        /**
         * 是否显示文本标签
         */
        showsLabels?: Boolean

        /**
         * 是否显示指南针
         */
        showsCompass?: Boolean

        /**
         * 是否显示放大缩小按钮
         *
         * @platform android
         */
        showsZoomControls?: Boolean

        /**
         * 是否显示比例尺
         */
        showsScale?: Boolean

        /**
         * 是否显示定位按钮
         *
         * @platform android
         */
        showsLocationButton?: Boolean

        /**
         * 是否显示路况
         */
        showsTraffic?: Boolean

        /**
         * 最大缩放级别
         */
        maxZoomLevel?: Number

        /**
         * 最小缩放级别
         */
        minZoomLevel?: Number

        /**
         * 当前缩放级别，取值范围 [3, 20]
         */
        zoomLevel?: Number

        /**
         * 中心坐标
         */
        coordinate?: LatLng

        /**
         * 显示区域
         */
        region?: Region

        /**
         * 限制地图只能显示某个矩形区域
         */
        limitRegion?: Region

        /**
         * 倾斜角度，取值范围 [0, 60]
         */
        tilt?: Number

        /**
         * 旋转角度
         */
        rotation?: Number

        /**
         * 是否启用缩放手势，用于放大缩小
         */
        zoomEnabled?: Boolean

        /**
         * 是否启用滑动手势，用于平移
         */
        scrollEnabled?: Boolean

        /**
         * 是否启用旋转手势，用于调整方向
         */
        rotateEnabled?: Boolean

        /**
         * 是否启用倾斜手势，用于改变视角
         */
        tiltEnabled?: Boolean

        /**
         * 点击事件
         *
         * @param {{ nativeEvent: LatLng }}
         */
        onPress?: (nativeEvent: LatLng) => void

        /**
         * 长按事件
         *
         * @param {{ nativeEvent: LatLng }}
         */
        onLongPress?: (nativeEvent: LatLng) => void

        /**
         * 定位事件
         *
         * @param {{
         *   nativeEvent: {
         *     timestamp: number,
         *     speed: number,
         *     accuracy: number,
         *     altitude: number,
         *     longitude: number,
         *     latitude: number,
         *   }
         * }}
         */
        onLocation?: (nativeEvent: {timestamp: number, speed: number, accuracy: number,altitude: number,longitude: number,latitude: number}) => void

        /**
         * 动画完成事件
         */
        onAnimateFinish?: Function

        /**
         * 动画取消事件
         */
        onAnimateCancel?: Function

        /**
         * 地图状态变化事件
         *
         * @param {{
         *   nativeEvent: {
         *     longitude: number,
         *     latitude: number,
         *     rotation: number,
         *     zoomLevel: number,
         *     tilt: number,
         *   }
         * }}
         */
        onStatusChange?: (nativeEvent: {longitude: number,latitude: number,rotation: number,zoomLevel: number,tilt: number}) => void

        /**
         * 地图状态变化完成事件
         *
         * @param {{
         *   nativeEvent: {
         *     longitude: number,
         *     latitude: number,
         *     longitudeDelta: number,
         *     latitudeDelta: number,
         *     rotation: number,
         *     zoomLevel: number,
         *     tilt: number,
         *   }
         * }}
         */
        onStatusChangeComplete?: (nativeEvent: {longitude: number,latitude: number,longitudeDelta: number,latitudeDelta: number,rotation: number,zoomLevel: number,tilt: number}) => void
    }> {}


    export class Marker extends React.PureComponent<{
        /**
         * 坐标
         */
        coordinate: LatLng /// 必选

        style?: CSSProperties

        /**
         * 标题，作为默认的选中弹出显示
         */
        title?: String

        /**
         * 描述，显示在标题下方
         */
        description?: String

        /**
         * 默认图标颜色
         */
        color?: "azure" | "blue" | "cyan" | "green" | "magenta" | "orange" | "red" | "rose" | "violet" | "yellow" | "red" | "green" | "purple"

        /**
         * 自定义图标
         */
        icon?: Function

        /**
         * 自定义图片，对应原生图片名称
         */
        image?: String

        /**
         * 透明度 [0, 1]
         */
        opacity?: Number

        /**
         * 是否可拖拽
         */
        draggable?: Boolean

        /**
         * 是否平贴地图
         */
        flat?: Boolean

        /**
         * 层级
         */
        zIndex?: Number

        /**
         * 覆盖物锚点比例
         *
         * @link http://a.amap.com/lbs/static/unzip/Android_Map_Doc/3D/com/amap/api/maps/model/Marker.html#setAnchor-float-float-
         * @platform android
         */
        anchor?: Point

        /**
         * 覆盖物偏移位置
         *
         * @link http://a.amap.com/lbs/static/unzip/iOS_Map_Doc/AMap_iOS_API_Doc_3D/interface_m_a_annotation_view.html#a78f23c1e6a6d92faf12a00877ac278a7
         * @platform ios
         */
        centerOffset?: Point

        /**
         * 是否选中，选中时将显示信息窗体，一个地图只能有一个正在选中的 marker
         */
        active?: Boolean

        /**
         * 是否禁用点击，默认不禁用
         */
        clickDisabled?: Boolean

        /**
         * 是否禁用弹出窗口，默认不禁用
         */
        infoWindowDisabled?: Boolean

        /**
         * 点击事件
         */
        onPress?: Function

        /**
         * 拖放开始事件
         */
        onDragStart?: Function

        /**
         * 拖放进行事件，类似于 mousemove，在结束之前会不断调用
         */
        onDrag?: Function

        /**
         * 拖放结束事件，最终坐标将传入参数
         */
        onDragEnd?: Function

        /**
         * 信息窗体点击事件
         *
         * 注意，对于自定义信息窗体，该事件是无效的
         */
        onInfoWindowPress?: Function
    }> {}

    export class MultiPoint extends React.PureComponent<{
        /**
         * 节点
         */
        points: Array<{
            latitude: Number
            longitude: Number
            title?: String
            subtitle?: String
        }>

        /**
         * 图标，只接受原生图片名字
         */
        image?: String

        /**
         * 点击事件
         *
         * @param {Point}
         */
        onItemPress?: (point: Point) => void
    }> {}

    export class Polygon extends React.PureComponent<{
        /**
         * 节点坐标
         */
        coordinates: Array<LatLng>

        /**
         * 边线宽度
         */
        strokeWidth?: Number

        /**
         * 边线颜色
         */
        strokeColor?: React.Validator<string>

        /**
         * 填充颜色
         */
        fillColor?: React.Validator<string>

        /**
         * 层级
         */
        zIndex?: Number
    }> {}

    export class Offline {
        getProvinces: () => any
        getCities: () => any
        download: (name: string) => any
        remove: (name: string) => any
        addDownloadListener: (callback: Function) => void
    }
}