import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, ART, Animated, Platform } from 'react-native';
import Wedge from './Wedge'

const { Surface, Shape, Path, Group } = ART;

var AnimatedWedge = Animated.createAnimatedComponent(Wedge);
var circumference = 360;
export default class PieChart extends Component {
	static propTypes = {
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
		// 动画执行时间
		duration: PropTypes.number,
		// 配置, eg: [,{stroke:'red',strokeWidth:1,strokeDash:[2,5]},,{stroke:'black',strokeWidth:1,strokeDash:[2,5]}]
		configArray: PropTypes.array,
	}

	static defaultProps = {
		// 饼图内直径
		innerRadius: 0,
		// 动画执行时间
		duration: 1500,
		// 配置, eg: [,{stroke:'red',strokeWidth:1,strokeDash:[2,5]},,{stroke:'black',strokeWidth:1,strokeDash:[2,5]}]
		configArray: [],
		animationType: 'sequence',
	}

	constructor(props) {
		super(props);

		this.animationArray = [];
		this.endAngleArray = [];
		//初始化动画对象
		for (var index = 0; index < this.props.percentArray.length; index++) {
			this.animationArray.push(new Animated.Value(0));
		}

		this.state = {
			wedgeAngles :[]
		};
	}

	_sequenceAnimation = () => {
		var animatedArray = [];
		for (var index = 0; index < this.props.percentArray.length; index++) {
			animatedArray.push(Animated.timing(this.animationArray[index], {
				duration: this.props.duration,
				toValue: circumference
			}));
		}
		Animated.sequence(animatedArray).start();
	}
	_syncAnimation = () => {
		for (var index = 0; index < this.props.percentArray.length; index++) {
			Animated.timing(this.animationArray[index], {
				duration: this.props.duration,
				toValue: circumference
			}).start();
		}
	}

	_animations = () => {
		this.props.animationType === 'sequence' ? this._sequenceAnimation() : this._syncAnimation()
	}

	_handleData = () => {
		var wedgeAngles = [];
		var percentArray = [];
		var endAngleArray = [];

		//处理百分比，得到每个部分的结束位置
		for (var index = 0; index < this.props.percentArray.length; index++) {
			var sum = 0;
			for (var index2 = 0; index2 <= index; index2++) {
				sum += this.props.percentArray[index2];
			}
			endAngleArray.push(sum);
		}
		this.endAngleArray = endAngleArray;

		//添加动画对象数组
		for (var index = 0; index < this.props.percentArray.length; index++) {
			//起始角度
			let startAngle = index === 0 ? 0 : this.endAngleArray[index - 1] * circumference;
			//结束角度
			let endAngle = startAngle + this.props.percentArray[index] * circumference;

			wedgeAngles.push(this.animationArray[index].interpolate({
				inputRange: [0, circumference],
				outputRange: [startAngle, endAngle],
				extrapolate: 'clamp'
			}));
		}
		this.setState({
			wedgeAngles:wedgeAngles
		})

	}

	componentDidMount() {
		this._handleData();
		this._animations();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props && nextProps) {
			if ((this.props.percentArray.toString() == nextProps.percentArray.toString()) &&
				(this.props.colorArray.toString() == nextProps.colorArray.toString())) {
				return
			}
		}

		//初始化动画对象
		if (nextProps) {
			this.animationArray = [];
			for (var index = 0; index < nextProps.percentArray.length; index++) {
				this.animationArray.push(new Animated.Value(0));
			};
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props && nextProps) {
			if ((this.props.percentArray.toString() == nextProps.percentArray.toString()) &&
				(this.props.colorArray.toString() == nextProps.colorArray.toString())) {
				return
			}
		}
		if (nextProps && nextState) {
			this.props = nextProps;
			this.state = nextState;
		}
		this._handleData();
		this._animations();
	}

	render() {
		//if RN version <0.47 ,need rotation
		//const rotation = Platform.OS === 'ios' ? 0 : -90;

		return (
			<Surface width={this.props.outerRadius * 2} height={this.props.outerRadius * 2}>
				<Group originX={this.props.outerRadius} originY={this.props.outerRadius}>
					{this.state.wedgeAngles.map((data, index) => {
						let stroke;
						let strokeWidth;
						let strokeDash;
						if (this.props.configArray.length > 0 && this.props.configArray[index]) {
							stroke = this.props.configArray[index].stroke;
							strokeWidth = this.props.configArray[index].strokeWidth;
							strokeDash = this.props.configArray[index].strokeDash
						}
						return <AnimatedWedge
							key={index}
							outerRadius={this.props.outerRadius}
							innerRadius={this.props.innerRadius}
							startAngle={index === 0 ? index : this.endAngleArray[index - 1] * circumference}
							stroke={stroke}
							strokeWidth={strokeWidth}
							strokeDash={strokeDash}
							endAngle={this.state.wedgeAngles[index]}
							fill={this.props.colorArray[index]}
						/>
					})}
				</Group>
			</Surface>
		)
	}
}

PieChart.Wedge = Wedge