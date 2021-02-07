<template>
    <div class="periodictable">
		<div id="container" class="container"></div>
		<!-- <div id="menu">
			<button class="button" id="grid">GRID</button>
			<button class="button" id="sphere">SPHERE</button>
			<button class="button" id="table">TABLE</button>
			<button class="button" id="helix">HELIX</button>
		</div> -->
    </div>
</template>

<script>
// import { Debounce,Throttle } from 'assets/js/utils'
import * as THREE from 'assets/js/lib/3D/three.module.js';
import { TWEEN } from 'assets/js/lib/3D/tween.module.min.js';
import { TrackballControls } from 'assets/js/lib/3D/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'assets/js/lib/3D/CSS3DRenderer.js';
export default {
    data() {
        return {
            deviceListData:[],
            deviceStateData:{},
            localOptions:{},
            chartWidth:500,
            chartHeight:500
        };
    },
    props: {
      
    },
    computed: {},
    created() {
        for (let i = 0; i < 500; i++) {
            this.deviceListData.push({name:1,url:'../img/maomao.jpg'})  
        }  
    },
    mounted() {
        this.chartWidth= $('#container').width();
        this.chartHeight= $('#container').height();
        this.initPage();
    },
    methods: {
        initPage(){
            let that = this;
            let number = 1;
			let camera, scene, renderer;
			let controls;
            let clock = new THREE.Clock();

            let mainObj = new THREE.Object3D();
			let objects = [];
			let targets = { table: [], sphere: [], helix: [], grid: [] };

			init();
			animate();
            
			function init() {
				camera = new THREE.PerspectiveCamera( 40, that.chartWidth / that.chartHeight, 1, 10000 );
				camera.position.z = 3000;
				camera.position.y = -500;

				scene = new THREE.Scene();
				// table

				for ( let i = 0; i < that.deviceListData.length; i++ ) {
                    
					let element = document.createElement( 'div' );
                    element.className = 'element';
                    element.innerHTML = `<img class="avata" src="${that.deviceListData[i].url}">`
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

					let object = new CSS3DObject( element );
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
                    object.position.z = Math.random() * 4000 - 2000;
					mainObj.add( object );
					objects.push( object );

					// let tepObject = new THREE.Object3D();
					// tepObject.position.x = ( table[ i + 3 ] * 140 ) - 1330;
					// tepObject.position.y = - ( table[ i + 4 ] * 180 ) + 990;
					// let tepObject = new THREE.Object3D();
					// tepObject.position.x = ( (i%20)* 140 ) - 1330;
					// tepObject.position.y = - ( (Math.floor(i/20) + 1) * 180 ) + 990;

					// targets.table.push( tepObject );
				}
                scene.add( mainObj );
				// sphere

				let vector = new THREE.Vector3();

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					let phi = Math.acos( - 1 + ( 2 * i ) / l );
					let theta = Math.sqrt( l * Math.PI ) * phi;

					let object = new THREE.Object3D();

					object.position.setFromSphericalCoords( 800, phi, theta );

					vector.copy( object.position ).multiplyScalar( 2 );

					object.lookAt( vector );

					targets.sphere.push( object );
				}

				// helix

				let vectorHelix = new THREE.Vector3();

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					let theta = i * 0.175 + Math.PI;
					let y = - ( i * 8 ) + 450;

					let object = new THREE.Object3D();

					object.position.setFromCylindricalCoords( 800, theta, y );

					vectorHelix.x = object.position.x * 2;
					vectorHelix.y = object.position.y;
					vectorHelix.z = object.position.z * 2;

					object.lookAt( vectorHelix );

					targets.helix.push( object );
				}

				// grid

				for ( let i = 0; i < objects.length; i ++ ) {

					let object = new THREE.Object3D();

					object.position.x = ( ( i % 5 ) * 400 ) - 800;
					object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
					object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

					targets.grid.push( object );
				}

				//

				renderer = new CSS3DRenderer();
				renderer.setSize( that.chartWidth, that.chartHeight );
				document.getElementById( 'container' ).appendChild( renderer.domElement );

				//new THREE.OrbitControls(
				controls = new TrackballControls( camera, renderer.domElement );
				controls.minDistance = 100;
				controls.maxDistance = 6000;
				controls.addEventListener( 'change', render );
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.2;
                controls.rotateSpeed = 0.2;
				//
                window.addEventListener( 'resize', onWindowResize, false );
                
                setInterval(()=>{
                    number++;
                    switch (number) {
                        case 1:
                            transform( targets.sphere, 2000 );
                            // transform( targets.grid, 2000 );
                            // animateCamera(
                            //     { 
                            //         x:0,
                            //         y:1500,
                            //         z:4000
                            //     },
                            //     {
                            //         x:0,
                            //         y:0,
                            //         z:0
                            //     },
                            //     {
                            //         x:0,
                            //         y:0,
                            //         z:1800
                            //     },
                            //     {
                            //         x:0,
                            //         y:0,
                            //         z:0
                            //     },
                            //     ()=>{
                            //         transform( targets.grid, 2000 );
                            //     }
                            // )
                            break;
                        case 2:
                            transform( targets.grid, 1000 );
                            // transform( targets.sphere, 2000 );
                            setTimeout(()=>{
                                transform( targets.helix, 2000 );
                            },2000)
                            break;
                        // case 3:
                        //     break;
                        default:
                            break;
                    }
                    if(number>2){
                        number = 0
                    }
                },12000);
            }
            function animateCamera(oldP, oldT, newP, newT, callBack){
                var tween = new TWEEN.Tween({
                    x1: oldP.x, // 相机x
                    y1: oldP.y, // 相机y
                    z1: oldP.z, // 相机z
                    x2: oldT.x, // 控制点的中心点x
                    y2: oldT.y, // 控制点的中心点y
                    z2: oldT.z  // 控制点的中心点z
                });
                tween.to({
                    x1: newP.x,
                    y1: newP.y,
                    z1: newP.z,
                    x2: newT.x,
                    y2: newT.y,
                    z2: newT.z
                },1300);
                tween.onUpdate(function(object){
                    camera.position.x = object.x1;
                    camera.position.y = object.y1;
                    camera.position.z = object.z1;
                    controls.target.x = object.x2;
                    controls.target.y = object.y2;
                    controls.target.z = object.z2;
                    controls.update();
                })
                tween.onComplete(function(){
                    controls.enabled = true;
                    callBack&&callBack()
                })
                tween.easing(TWEEN.Easing.Cubic.InOut);
                tween.start();
            }
			function transform( targets, duration ) {

				// TWEEN.removeAll();

				for ( let i = 0; i < objects.length; i ++ ) {

					let object = objects[ i ];
					let target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( render )
					.start();

            }
            
            transform( targets.sphere, 2000 )
            rotateBalll();
            function rotateBalll(){
                    let posSrc = {pos: 1};  // 初始化一个动画需要更新的值，tweenjs使用
                    // 每次更新需要调用 TWEEN.update函数
                    // tween对象更新的回调函数
                    const onUpdateBall = () => {
                        // 将构件的位置设置成新的位置
                        mainObj.rotation.x += Math.PI * posSrc.pos * 0.005;            // 将构件的位置的x轴旋转值增加0.01
                        mainObj.rotation.y += Math.PI * Math.sin(posSrc.pos) * 0.003;            // 将构件的位置的y轴旋转值增加0.01
                        mainObj.rotation.z += Math.PI * posSrc.pos * 0.003;            // 将构件的位置的z轴旋转值增加0.01
                    };
                    // 实例化一个tween对象，设置它的参数posSrc在3秒内从1减到0
                    const tween = new TWEEN.Tween(posSrc)
                        .to({pos: 0}, 3000)      // 将posSrc.pos的值缓慢变成0
                        .onUpdate(onUpdateBall)      // 更新时执行的函数
                        .easing( TWEEN.Easing.Exponential.InOut )
                        // .easing(TWEEN.Easing.Sinusoidal.InOut)   // posSrc变化的规律
                        .start();   // 开始执行此动画
                    // 实例化另一个tween对象，设置它的参数posSrc在3秒内从0加到1
                    const tweenBack = new TWEEN.Tween(posSrc)
                        .to({pos: 1}, 3000)  // 将posSrc.pos的值缓慢变成1
                        .onUpdate(onUpdateBall)  // 更新时执行的函数
                        // .easing( TWEEN.Easing.Quadratic.InOut )
                        .easing(TWEEN.Easing.Exponential.InOut)  // posSrc变化的规律
                        .chain(tween)  // 与tween衔接
                        .start();
                    tween.chain(tweenBack);  // 与tweenBack衔接
            }
			function onWindowResize() {

				camera.aspect = that.chartWidth / that.chartHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( that.chartWidth, that.chartHeight );

				render();

            }
			function animate() {
                // mainObj.rotateY(Math.PI/500);
				requestAnimationFrame( animate );
                TWEEN.update();
                let delta = clock.getDelta();
                controls.update(delta);
                render();
			}

			function render() {
				renderer.render( scene, camera );
			}
        },
    },
    watch: {
        // "$store.state.XRayStateData": Throttle(function(val){
        //     this.deviceStateData = val;
        //     if(!this.deviceListData.length) return;
        //     this.deviceListData.forEach(item=>{
        //         if([0,1,2,3].indexOf(this.deviceStateData[item.eqp_num].code)>-1){
        //             item.hasState=true;
        //         }else{
        //             item.hasState=false;
        //         }
        //     });
        //     // let tempArr1=[],tempArr2=[];
        //     // this.deviceListData.forEach(item=>{
        //     //     if(item.hasState){
        //     //         tempArr1.push(item);
        //     //     }else{
        //     //         tempArr2.push(item);
        //     //     }
        //     // });
        //     // this.deviceListData=[...tempArr1,...tempArr2];
        //     // this.deviceListData = this.deviceListData.length>100?this.deviceListData.slice(0,100):this.deviceListData;
        //     // jq拼接状态
        //     $('.element').each((i,item)=>{
        //         if(this.deviceListData[i]){
        //             $(item).children('img').attr('src',this.deviceListData[i].url);
        //             // $(item).children('.number').text(`No.${i + 1}`);
        //             $(item).children('.symbol').html(this.deviceListData[i].eqp_num);
        //             let colorName = this.deviceStateData[this.deviceListData[i].eqp_num]?this.deviceStateData[this.deviceListData[i].eqp_num].color:'';
        //             $(item).children('.state-box').html(`<i class="state-lamp nucfont inuc-warncenter ${colorName}"></i>`);
        //             // $(item).children('.details').html(`<p>${this.deviceListData[i].eqp_num}</p><p>${this.deviceListData[i].name}</p>`);
        //             // $(item).html(`<img src="${this.deviceListData[i].url}">
        //             //        <div class="number">No.${i + 1}</div>
        //             //        <div class="symbol">${this.deviceListData[i].type}</div>
        //             //        <div class="state-box" data-eqp="${this.deviceListData[i].eqp_num}"><i class="state-lamp nucfont inuc-warncenter"></i></div>
        //             //        <div class="details"><p>${this.deviceListData[i].serie}</p><p>${this.deviceListData[i].name}</p></div>`); 
        //             $(item).dblclick(()=>{
        //                 this.$router.push({name:'devicelist',params:{eqp_name:this.deviceListData[i].name}});
        //             })
        //         }
        //     });
        // },8000)
    },
    components: {},
};
</script>

<style lang="scss">
.periodictable{
    height: 100%;
    padding: 20px;
    position: relative;
    background: url('https://img2.wmnetwork.cc/w/202011/25/0_20201125130028_CxAgqruz.png');
    
    .container{
        height: 100%;
    }
    a {
		color: #8ff;
	}
	#menu {
		position: absolute;
		right: 20px;
		width: 100px;
        bottom: 20px;
        .button {
            width: 100%;
            color: rgba(127,255,255,0.75);
            background: transparent;
            outline: 1px solid rgba(127,255,255,0.75);
            border: 0px;
            padding: 5px 10px;
            cursor: pointer;
        }

        .button:hover {
            background-color: rgba(0,255,255,0.5);
        }

        .button:active {
            color: #000000;
            background-color: rgba(0,255,255,0.75);
        }
	}

	.element {
		width: 80px;
		height: 80px;
		box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
		border: 1px solid rgba(127,255,255,0.25);
		font-family: Helvetica, sans-serif;
		text-align: center;
		line-height: normal;
		cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
	}
	.element .avata {
		width: 100%;
		height: 100%;
	}
}

</style>
