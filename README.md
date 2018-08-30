# react-native-animation-pieChart
react-native-animation-pieChart

带有动画效果的绘制扇形图，可以绘制边线为虚线。

PS:注意需要依赖react-native自带的ART库

![显示文本](https://github.com/zramals/react-native-animation-pieChart/blob/master/demo/pieChart%E7%A4%BA%E4%BE%8B%E5%9B%BE.png)

### PropTypes

```
// 饼图数据
percentArray: PropTypes.array.isRequired,
// 饼图颜色
colorArray: PropTypes.array.isRequired,
// 饼图内直径
innerRadius: PropTypes.number,
// 饼图外直径
outerRadius: PropTypes.number.isRequired,
// 动画执行方式
animationType: PropTypes.oneOf(['sequence', 'synchron']),
// 开始动画的角度
rotation:PropTypes.number,
// 动画执行方向，是否为顺时针
isClockwise: PropTypes.bool,
// 动画执行时间
duration: PropTypes.number,
// 配置, eg: [,{stroke:'red',strokeWidth:1,strokeDash:[2,5]},,{stroke:'black',strokeWidth:1,strokeDash:[2,5]}]
configArray: PropTypes.array,
// 动画结束时的回调函数
animationEndCallBack: PropTypes.func,
```

### example
简单的例子
```
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
			<View style={privateStyle.bgStyle}>
				<View style={privateStyle.pieStyle}>
					<PieChart
						percentArray={[0.2,0.1, 0.4,0.3]}
						colorArray={['#4d84eb', '#fca63e','green','yellow']}
						outerRadius={40}
						innerRadius={25}
					/>
				</View>
			</View>
		);
	}
}

var privateStyle = StyleSheet.create({
	bgStyle: {
		flex: 1,
	},
	pieStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

})
```

更多的用法请参照：
https://github.com/zramals/react-native-animation-pieChart/blob/master/demo/index.js
