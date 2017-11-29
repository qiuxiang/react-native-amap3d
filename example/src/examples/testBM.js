import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { MapView, Marker, MapSearch, PlanDrive } from 'react-native-amap3d'
import styles from '../styles'

const dimensions = require('Dimensions')
const screenWidth = dimensions.get('window').width
const screenHeight = dimensions.get('window').height

export default class TestBM extends Component {
    static navigationOptions = {
        title: '宝马测试'
    }
    constructor(props) {
        super(props)
        this.state = {
            startLocked: false,
            locationCoor:{latitude: 0, longitude: 0},
            coordinates:{latitude: 31.216706, longitude: 121.466152,}
        }
    }
    // _coordinates = [
    //     {
    //         latitude: 31.216706,
    //         longitude: 121.466152,
    //     },
    //     {
    //         latitude: 31.217706,
    //         longitude: 121.466152,
    //     },
    //     {
    //         latitude: 39.906901,
    //         longitude: 116.397972,
    //     },
    //     {
    //         latitude: 39.706901,
    //         longitude: 116.397972,
    //     },
    // ]
    render() {
        return (
            <View style = {{flex: 1}}>
                <MapView
                    locationEnabled = { true }
                    showsCompass = { true }
                    showsScale = { true }
                    showsZoomControls = { true }
                    showsLocationButton = { true }
                    userTrackingMode = {'follow'}
                    zoomLevel = { 17 }
                    style = {{flex: 1}}
                    onStatusChange={this._logStatusChangeCompleteEvent}
                >
                    {this.state.startLocked ? this._renderMarkers() : <View/>}
                    {this.state.startLocked ? this._renderMapSearch() : <View/>}
                </MapView>
                <TouchableWithoutFeedback onPress={()=>this._startAnnotation()}>
                    <View style={style.redBtn}>
                        <Text style={{textAlign:'center', lineHeight:50}}>开始设置终点</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    _logStatusChangeCompleteEvent = ({nativeEvent}) => {
        console.log(':::')
        console.log(nativeEvent)
        if (this.state.startLocked) {
            this.setState({
                coordinates:{latitude:nativeEvent.latitude, longitude:nativeEvent.longitude}
            })
        }
    }
    _startAnnotation () {
        this.setState({startLocked: true})
    }
    _renderMarkers() {
        let self = this
        return [{}].map((val, idx) => {
            return(
                <Marker
                    key = {idx}
                    title='一个可拖拽的标记 '
                    draggable = {false}
                    clickable = {false}
                    active = {true}
                    coordinate={self.state.coordinates}
                />
            )
        })
    }
    _renderMapSearch() {
        MapSearch.searchLocation(this.state.coordinates).then(dic => console.log(dic), err => console.log('err'))
        return <PlanDrive/>
    }
    _infoEvent = ({nativeEvent}) => {
        console.log('+++++')
        console.log(nativeEvent)
    }
}

const style = StyleSheet.create({
    redBtn: {
        position: 'absolute',
        top: 10,
        left:20,
        backgroundColor: 'red',
        width: 100,
        height: 50,
    }
})