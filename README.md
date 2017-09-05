## s-touch

##### 一个简单的触摸模块
	单点触摸 无跟随, singleTouch: 支持单元素,支持x轴
	单点触摸 跟随, SINGLE_FOLLOW_TOUCH: 支持单元素
	多点手势 跟随 MULTIPLE_FOLLOW_TOUCH: 支持单元素, 根据两指进行计算:两指直线距离
	
##### 安装:
	npm install s-touch --save-dev
	
##### 参数:
	(dom='body',{touchmove, touchstart, touchend})
	
###### singleTouch
		
	import TOUCH from 's-touch';
	TOUCH.singleTouch('body', {
		touchmove: (d, end) => {
			console.log(d);
			end();
		}
	});
	
	注: touchmove = (d: 方向, end: 结束此次跟随)
		
		
###### singleFollowTouch
	
	import TOUCH from 's-touch';
	TOUCH.singleFollowTouch("body", {
		touchmove: ({x, y}, e) => {
			e.preventDefault();
		},
		touchstart: (e) => {
			e.preventDefault();
		},
		touchend: (e) => {
			e.preventDefault();
		}
	});
	
	注: touchmove = ({x: 此次x轴位移,y: 此次y轴位移}, e: touchmove事件对象)
	
	
##### multipleFollowTouch
	
	import TOUCH from 's-touch';
	let oImage = document.getElementsByClassName('image_test')[0],
		iScale = 1,
		iNewScale = null;
	TOUCH.multipleFollowTouch('body', {
		touchstart: (e) => {
			e.preventDefault();
		},
		touchmove: ({diff}, e) => {
			let iDiff = (diff / 100);
			iNewScale = iScale+iDiff;
			iNewScale = iNewScale>=0.5 ? iNewScale : 0.5; 
			oImage.style.transform = "scale("+(iNewScale)+")";
			e.preventDefault();
		},
		touchend: (e) => {
			iScale = iNewScale;
			e.preventDefault();
		}
	});
	
	注: touchmove = ({diff: 多点位移计算后的距离}, e: 事件对象)