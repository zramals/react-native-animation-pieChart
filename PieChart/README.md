###
	动画扇形图 @by zramals  201704

	201808 fix some bugs
### example
```
<PieChat
	percentArray={[0.4, 0.6]}
	colorArray={['#4d84eb', '#fca63e']}
	outerRadius={40}
	innerRadius={25}
	duration={1000}
/>
```
### 属性
```
PieChat.propTypes = {
	percentArray: PropTypes.array.isRequired,
	colorArray: PropTypes.array.isRequired,
	innerRadius: PropTypes.number,
	outerRadius: PropTypes.number.isRequired,
	duration: PropTypes.number,
};
PieChat.defaultProps = {
	innerRadius: 0,
	duration: 1500,
}
```
### 属性定义

| 名称 | 类型 | 描述 |
|------|------|-------------|
| `percentArray` | `array` | 扇形各段的百分比，需自行计算，1为整个圆形图案 ，必填|
| `colorArray` | `array` | 扇形各段的颜色，按顺序，与percentArray数量须相同 ，必填|
| `innerRadius` | `number` | 扇形内环半径，默认为0（圆形），扇形效果需设置，需小于外环半径|
| `outerRadius` | `number` | 扇形外环半径，必填|
| `duration` | `number` | 每段动画时长，默认1500毫秒 |
