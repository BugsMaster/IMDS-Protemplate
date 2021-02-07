<template>
    <div class="Fly_3D">
        <div class="main">asdsafae
            <div id="WebGL_Fly" class="WebGL"></div>
        </div>
        <audio class="fly_video" ref="audioFly"  id="fly_video" :loop="false" src="../../../public/static/fly.wav"></audio>
    </div>
</template>
<script>
import { Storage, Ticket } from "assets/js/utils";
import { TWEEN } from 'assets/js/lib/3D/tween.module.min';
export default {
    data() {
        return {
            flyOne: {},
            flyTwo: {},
            timeInte:null,
        };
    },
    created() {
        
    },
    mounted() {
        // let playPromise = new Audio('../../../public/static/fly.wav');
           
        // api.getAuthDeviceData({isexternal:0}).then(({ data }) => {
        //     data.forEach(item => {
        //         item.Local_X = (Number(item.Local_X) / 775) * 1000 - 420;
        //         item.Local_Y = (Number(item.Local_Y) / 870) * 1000 - 420;
        //     });
        //     let tempArr=[];
        //     data.forEach((el,index)=>{
        //         if(el.MapID==this.currentMapID){
        //             tempArr.push(el);
        //         }
        //     });
        //     this.locationData = tempArr;
        //     return this.initScene();e
        // });
        this.initScene();
    },
    computed: {
    },
    methods: {
        initScene() {
            console.log(888)
            let $this = this;
            let webglWidth = $("#WebGL_Fly").width();
            let webglHeight = $("#WebGL_Fly").height();
            let objBaseUrl = "/obj/";
            this.flyOne = new THREE.Object3D();
            this.flyOne.name = "Fly_one";
            // ======初始化====================================================
            let webGLRenderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            webGLRenderer.setSize(webglWidth, webglHeight);
            webGLRenderer.shadowMap.enabled = true;

            let clock = new THREE.Clock();
            let scene = new THREE.Scene();
            let camera = new THREE.PerspectiveCamera(
                45,
                webglWidth / webglHeight,
                0.1,
                3000
            );
            camera.position.x = 750;
            camera.position.y = 700;
            camera.position.z = 0;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            //光源
            let hemiLight = new THREE.HemisphereLight(0xeeeeee, 0xeeeeee, 0.6);
            hemiLight.position.set(0, 500, 0);
            scene.add(hemiLight);
            let ambientLight = new THREE.AmbientLight(0xeeeeee);
            ambientLight.intensity = 0.8;
            scene.add(ambientLight);
            let axes = new THREE.AxesHelper(0);
            scene.add(axes);
            
            //=============加载模型=========================
            function loadObj() {
                let onProgress = function(xhr) {
                    if (xhr.lengthComputable) {
                        let percentComplete = (xhr.loaded / xhr.total) * 100;
                        console.log(
                            Math.round(percentComplete, 2) + "% downloaded"
                        );
                    }
                };
                let onError = function() {
                    $this.$message.error('地图加载失败。。。');
                };              
                let ctMachineMatl_HS2100 = new THREE.MTLLoader()
                    .setPath(objBaseUrl)
                    .load("fly.mtl", materials => {
                        materials.preload();
                        let deviceObjLoader = new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath(objBaseUrl)
                            .load(
                                "fly.obj",
                                loadedMesh => {
                                    loadedMesh.scale.set(0.6, 0.6, 0.6);
                                    loadedMesh.traverse(item => {
                                        if (item instanceof THREE.Mesh) {
                                            item.castShadow = true;
                                        }
                                    });
                                    loadedMesh.castShadow = true;
                                    loadedMesh.receiveShadow = true;
                                    // let flyMesh =  loadedMesh.clone();
                                    // flyMesh.rotation.set(0,60,30);
                                    $this.flyOne.add(loadedMesh);
                                    scene.add($this.flyOne);
                                },
                                onProgress,
                                onError
                            );
                    });
            }
            loadObj();
            // function eggCreated(){
            //     var geom = new THREE.SphereGeometry(100, 100, 200);
            //     var mate = new THREE.ShaderMaterial({
            //         vertexShader: `
            //         varying vec3 vNormal;
            //         void main() {
            //             //将attributes的normal通过varying赋值给了向量vNormal
            //             vNormal = normal;
            //             //projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵 最后我们将y值乘以1.4得到了一个形如鸡蛋的几何体
            //             gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y * 1.4, position.z, 1.0 );
            //         }
            //         `,
            //         fragmentShader: `  
            //         // 片元着色器同样需要定义varying vec3 vNormal；
            //         varying vec3 vNormal;
            //         void main() {
            //                    //vNormal是一个已经归一化的三维向量
            //            float pr = (vNormal.x + 1.0) / 2.0; //pr红色通道值范围为0~1
            //            float pg = (vNormal.y + 1.0) / 2.0; //pg绿色通道值范围为0~1
            //            float pb = (vNormal.z + 1.0) / 2.0; //pb蓝色通道值范围为0~1
            //            gl_FragColor=vec4(pr, pg, pb, 1.0); //最后设置顶点颜色，点与点之间会自动插值
            //         }
            //         `
            //     })
            //     var mesh = new THREE.Mesh(geom, mate);
            //     scene.add(mesh)
            // }
            // eggCreated();
            // ==============end===================================

            // 动画区==============================================
            flyAction();
            function flyAction(){
                $this.flyAnimate(
                    {
                        x:-1200,
                        y:-300,
                        z:2000
                    },
                    {
                        x:-600,
                        y:150,
                        z:0
                    },
                    ()=>{
                        $this.flyAnimate(
                            {
                                x:-600,
                                y:150,
                                z:0
                            },
                            {
                                x:-500,
                                y:100,
                                z:-1600
                            },
                            ()=>{
                                
                            }
                        ,6000,$this.flyOne);
                    }
                ,8000,$this.flyOne);
            }
            $this.timeInte = setInterval(()=>{
                flyAction();
            },16000);

            //最终渲染==============================================
            document.getElementById("WebGL_Fly").appendChild(webGLRenderer.domElement);
            renderScene();
            function renderScene() {
                $this.flyOne.rotateZ(Math.PI/50);
                let delta = clock.getDelta();
                requestAnimationFrame(renderScene);
                TWEEN.update();
                webGLRenderer.render(scene, camera);
            }
        },
        flyAnimate(oldP,newP,callBack,time,obj){
            let tween = new TWEEN.Tween({
                x: oldP.x,
                y: oldP.y,
                z: oldP.z,
            });
            if(!time){
                time = 15000;
                tween.easing(TWEEN.Easing.Cubic.InOut);
            }
            tween.to({
                x: newP.x,
                y: newP.y,
                z: newP.z,
            },time);
            tween.onUpdate((object)=>{
                obj.position.set(object.x,object.y,object.z);
            })
            tween.onComplete(()=>{
                callBack&&callBack()
            })
            tween.start();
        }
    },
    destroyed() {
        this.timeInte = null;
    },
    watch: {
    },
    components: {}
};
</script>
<style scoped lang="scss">
$chart-bgc: rgba(19, 21, 32, 1);
.Fly_3D {
    width:100%;
    height: 100%;
    // border:1px solid #ccc;
    .main {
        height: 100%;
        .WebGL{
            height: 100%;
        }
    }
}
</style>

