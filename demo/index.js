import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PieChart } from '../PieChart'

export default class PieChartView extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}



	render() {
		return (
			<ScrollView style={{
				backgroundColor: '#EFEFEF',
				flex: 1,
			}}>
				<Text>基本用法：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4, 0.3]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
					outerRadius={40}
					innerRadius={25}
					animationEndCallBack={()=>{console.log("animationEndCallBack")}}
				/>
				<Text>总percent不足100%：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
					outerRadius={40}
					innerRadius={25}
				/>
				<Text>总percent超过100%,内半径为0：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4, 0.3, 0.4]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow', 'black']}
					outerRadius={40}
					innerRadius={0}
				/>
				<Text>动画时间设定为4秒，逆时针显示：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4, 0.3]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
					outerRadius={40}
					innerRadius={25}
					duration={4000}
					animationType='sequence'
					isClockwise={false}
				/>
				<Text>内半径为0，有设置虚线，90度起始点：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4, 0.3]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
					outerRadius={60}
					innerRadius={0}
					duration={1500}
					animationType='sequence'
					rotation={90}
					configArray={[{ stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] }, ,]}
				/>
				<Text>animationType为同步，有设置虚线：</Text>
				<PieChart
					percentArray={[0.2, 0.1, 0.4, 0.3]}
					colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
					outerRadius={40}
					innerRadius={25}
					duration={1500}
					animationType='synchron'
					animationEndCallBack={()=>{console.log("同步animationEndCallBack")}}
					configArray={[, { stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, , { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] }]}
				/>
			</ScrollView>
		);
	}
}
