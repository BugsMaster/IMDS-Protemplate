<template>
    <div class="threeDScene">
        <span
            @click="out"
            class="shutdown nucfont inuc-shutdown"
        ></span>
        <div class="title-box">
            <h1>{{title}}</h1>
        </div>
        <div class="main">
            <div id="WebGL"></div>
        </div>
        <ul class="info-border border-angle">
            <li class="info">设备状态</li>
            <li class="info">总数量：<span style="color: #00bcd4">{{statusNumber.total}}</span></li>
            <li class="info">正常：<span style="color: #49cd45">{{statusNumber.normal}}</span></li>
            <li class="info">异常：<span style="color: #fd2671">{{statusNumber.abnormal}}</span></li>
            <!-- <li class="info">{{$t('title.prewarning')}}：<span style="color: #fa9b25">{{statusNumber.prewarning}}</span></li>
            <li class="info">{{$t('title.offline')}}：<span style="color: #aaa">{{statusNumber.offline}}</span></li> -->
            <div class="border-angle-bottom"></div>
        </ul>
        <ul
            class="info-device border-angle"
            v-show="isInfoBorderShow"
        >
            <li class="title yellow-light">{{$t('title.eqpInfo')}}
                <span
                    class="view hvr-icon-forward"
                    :title="$t('c.view')"
                    size="mini"
                    @click="toEqpDetail(deviceInfoData.EQP_ID)"
                >
                    <i class="green r nucfont inuc-arrow-circle-right hvr-icon"></i>
                </span>
            </li>
            <li class="info">{{$t('c.eqpName')}}：<span style="color: #00bcd4">{{deviceInfoData.ByName}}</span></li>
            <li class="info">{{$t('c.eqpStatus')}}：<span :class="deviceInfoData.stateColor">{{deviceInfoData.stateName}}</span></li>
            <li class="info">{{$tc('c.type',1)}}：{{deviceInfoData.Type}} / {{deviceInfoData.Serie}}</li>
            <li class="info">{{$t('c.image')}}：
                <img :src="deviceInfoData.Url">
            </li>
            <li class="info">{{$t('c.address')}}：{{deviceInfoData.Address}}</li>
            <div class="border-angle-bottom"></div>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Storage, Ticket } from "assets/js/utils";
export default {
    data() {
        return {
            title:'',
            deviceGroup: {},
            locationData: [],
            statusNumber: {
                total: 0,
                normal: 0,
                abnormal: 0,
                prewarning: 0,
                offline: 0
            },
            isInfoBorderShow: false,
            deviceInfoData: {},
            currentMapID:1
        };
    },
    created() {
    },
    mounted() {
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
        //     return this.initScene();
        // });
        this.initScene();
    },
    computed: {
    },
    methods: {
        out() {
            // this.$router.push({name:'home',params:{mapID:this.currentMapID}});
            this.$router.push({name:'home'});
        },
        toEqpDetail(EQP_ID) {
            if (Storage.get("userTicket").userType == 3) {
                this.$router.push(
                    `/devicelist/detailcustom/${encodeURIComponent(EQP_ID)}`
                );
                return;
            }
            this.$router.push(
                `/devicelist/detail/${encodeURIComponent(EQP_ID)}`
            );
        },
        initScene() {
            let $this = this;
            let objBaseUrl = "../../../static/obj/";
            this.deviceGroup = new THREE.Object3D();
            this.deviceGroup.name = "deviceGroup";
            // //GUI组件
            /*   let optionGUI = new function(){
          this.perspective = false;
          this.rotate = true;
          this.video = true;
        }
        let gui = new dat.GUI();
        gui.add(optionGUI, 'perspective').onChange((e)=>{
            if(e){
              this.deviceGroup.children.forEach((item)=> {
                   let meshWireframe = item.getObjectByName("shell");
                      meshWireframe.material.wireframe = true;
              });
            }else{
              this.deviceGroup.children.forEach((item)=> {
                  let meshWireframe = item.getObjectByName("shell");
                      meshWireframe.material.wireframe = false;
              });
            }
        }); 
        gui.add(optionGUI, 'rotate').onChange((e)=>{
           if(e){
               controls.autoRotate = true;
           }else{
               controls.autoRotate = false;
           }
        });  
        gui.add(optionGUI, 'video').onChange((e)=>{
          if (e) {
              let ledobj = scene.getObjectByName("led");
              ledobj.traverse((item)=> {
                    if (item.name == "screen") {
                       let video = document.getElementById( 'video' );
                         let planetTexture =  new THREE.VideoTexture( video );
                         item.material = new THREE.MeshPhongMaterial({color:"#bd2648"});
                         item.material.map = planetTexture;
                         item.material.needsUpdate = true;
                    }
                });
            }else{
              let ledobj = scene.getObjectByName("led");
              ledobj.traverse((item)=> {
                  if (item.name == "screen") {
                     let video = document.getElementById( 'video' );
                     item.material = new THREE.MeshPhongMaterial({color:"rgba(0,0,0,.7)"});
                  }
              });
            }
        }); */
            // ==========================================================
            let clock = new THREE.Clock();
            let scene = new THREE.Scene();
            let camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                3000
            );
            let webGLRenderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            // webGLRenderer.setClearColor('#262626',0.0);
            webGLRenderer.setSize(window.innerWidth, window.innerHeight);
            webGLRenderer.shadowMap.enabled = true;
            // webGLRenderer.shadowMapEnabled  = true;

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
                let mapLoader;
                switch ($this.currentMapID) {
                    case 1:
                        mapLoader = new THREE.MTLLoader()
                        .setPath(objBaseUrl)
                        .load("map_miyun_en.mtl", materials => {
                            materials.preload();
                            let objLoader = new THREE.OBJLoader()
                                .setMaterials(materials)
                                .setPath(objBaseUrl)
                                .load(
                                    "map_miyun_en.obj",
                                    loadedMesh => {
                                        loadedMesh.scale.set(0.5, 0.5, 0.5);
                                        loadedMesh.position.x = 0;
                                        loadedMesh.position.y = -6;
                                        loadedMesh.position.z = 0;
                                        loadedMesh.castShadow = true;
                                        loadedMesh.name = "map";
                                        scene.add(loadedMesh);
                                    },
                                    onProgress,
                                    onError
                                );
                        });
                        break;
                    case 2:
                        mapLoader = new THREE.MTLLoader()
                        .setPath(objBaseUrl)
                        .load("map_jintan_en.mtl", materials => {
                            materials.preload();
                            let objLoader = new THREE.OBJLoader()
                                .setMaterials(materials)
                                .setPath(objBaseUrl)
                                .load(
                                    "map_jintan_en.obj",
                                    loadedMesh => {
                                        loadedMesh.scale.set(0.5, 0.5, 0.5);
                                        loadedMesh.position.x = 0;
                                        loadedMesh.position.y = -6;
                                        loadedMesh.position.z = 0;
                                        loadedMesh.castShadow = true;
                                        loadedMesh.name = "map";
                                        scene.add(loadedMesh);
                                    },
                                    onProgress,
                                    onError
                                );
                        });
                        break;
                    default:
                        $this.$message.error('无此地图');
                        return;
                }
                let ctMachineMatl_HS2100 = new THREE.MTLLoader()
                    .setPath(objBaseUrl)
                    .load("HS2100.mtl", materials => {
                        materials.preload();
                        new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath(objBaseUrl)
                            .load(
                                "HS2100.obj",
                                loadedMesh => {
                                    loadedMesh.scale.set(0.1, 0.1, 0.1);
                                    loadedMesh.rotation.y = 180;
                                    loadedMesh.traverse(item => {
                                        if (item instanceof THREE.Mesh) {
                                            item.castShadow = true;
                                        }
                                    });
                                    loadedMesh.castShadow = true;
                                    loadedMesh.receiveShadow = true;
                                    $this.locationData.forEach(item => {
                                        if (item.Serie.indexOf("XT2100") != -1) {
                                            loadedMesh.position.x =
                                                item.Local_Y;
                                            loadedMesh.position.y = 0;
                                            loadedMesh.position.z =
                                                item.Local_X;
                                            loadedMesh.name = item.EQP_ID;
                                            $this.deviceGroup.add(
                                                loadedMesh.clone()
                                            );
                                        }
                                    });
                                    scene.add($this.deviceGroup);
                                },
                                onProgress,
                                onError
                            );
                    });
                let ctMachineMatl_XT2080 = new THREE.MTLLoader()
                    .setPath(objBaseUrl)
                    .load("XT2080AD.mtl", materials => {
                        materials.preload();
                        new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath(objBaseUrl)
                            .load(
                                "XT2080AD.obj",
                                loadedMesh => {
                                    loadedMesh.scale.set(0.1, 0.1, 0.1);
                                    loadedMesh.rotation.y = 180;
                                    loadedMesh.traverse(item => {
                                        if (item instanceof THREE.Mesh) {
                                            item.castShadow = true;
                                        }
                                    });
                                    loadedMesh.castShadow = true;
                                    loadedMesh.receiveShadow = true;
                                    $this.locationData.forEach(item => {
                                        if (
                                            item.Serie.indexOf("XT2080") != -1
                                        ) {
                                            loadedMesh.position.x =
                                                item.Local_Y;
                                            loadedMesh.position.y = 0;
                                            loadedMesh.position.z =
                                                item.Local_X;
                                            loadedMesh.name = item.EQP_ID;
                                            $this.deviceGroup.add(
                                                loadedMesh.clone()
                                            );
                                        }
                                    });
                                    scene.add($this.deviceGroup);
                                },
                                onProgress,
                                onError
                            );
                    });
                let ctMachineMatl_CID2000 = new THREE.MTLLoader()
                    .setPath(objBaseUrl)
                    .load("CID2000.mtl", materials => {
                        materials.preload();
                        new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath(objBaseUrl)
                            .load(
                                "CID2000.obj",
                                loadedMesh => {
                                    loadedMesh.scale.set(0.1, 0.1, 0.1);
                                    loadedMesh.rotation.y = 180;
                                    loadedMesh.traverse(item => {
                                        if (item instanceof THREE.Mesh) {
                                            item.castShadow = true;
                                        }
                                    });
                                    loadedMesh.castShadow = true;
                                    loadedMesh.receiveShadow = true;
                                    $this.locationData.forEach(item => {
                                        if (
                                            item.Serie.indexOf("CID2000") != -1
                                        ) {
                                            loadedMesh.position.x =
                                                item.Local_Y;
                                            loadedMesh.position.y = 0;
                                            loadedMesh.position.z =
                                                item.Local_X;
                                            loadedMesh.name = item.EQP_ID;
                                            $this.deviceGroup.add(
                                                loadedMesh.clone()
                                            );
                                        }
                                    });
                                    scene.add($this.deviceGroup);
                                },
                                onProgress,
                                onError
                            );
                    });
                let ctMachineMatl_Kylin = new THREE.MTLLoader()
                    .setPath(objBaseUrl)
                    .load("Kylin_Ti.mtl", materials => {
                        materials.preload();
                        new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath(objBaseUrl)
                            .load(
                                "Kylin_Ti.obj",
                                loadedMesh => {
                                    loadedMesh.scale.set(0.1, 0.1, 0.1);
                                    loadedMesh.rotation.y = 180;
                                    loadedMesh.traverse(item => {
                                        if (item instanceof THREE.Mesh) {
                                            item.castShadow = true;
                                        }
                                    });
                                    loadedMesh.castShadow = true;
                                    loadedMesh.receiveShadow = true;
                                    $this.locationData.forEach(item => {
                                        if (
                                            item.Serie.indexOf("Kylin") != -1
                                        ) {
                                            loadedMesh.position.x =
                                                item.Local_Y;
                                            loadedMesh.position.y = 0;
                                            loadedMesh.position.z =
                                                item.Local_X;
                                            loadedMesh.name = item.EQP_ID;
                                            $this.deviceGroup.add(
                                                loadedMesh.clone()
                                            );
                                        }
                                    });
                                    scene.add($this.deviceGroup);
                                },
                                onProgress,
                                onError
                            );
                    });
                // let ledLoader = new THREE.MTLLoader()
                // .setPath(objBaseUrl)
                // .load( 'led.mtl',( materials )=> {
                //   materials.preload();
                //   let objLoader =new THREE.OBJLoader()
                //     .setMaterials( materials )
                //     .setPath(objBaseUrl)
                //     .load( 'led.obj', function ( loadedMesh ) {
                //       loadedMesh.scale.set(60, 60, 60);
                //       loadedMesh.position.x = 0;
                //       loadedMesh.position.y = -6;
                //       loadedMesh.position.z = -520;
                //       loadedMesh.castShadow = true;
                //       loadedMesh.name="led";
                //       loadedMesh.traverse((item)=> {
                //         if (item.name == "screen") {
                //            let video = document.getElementById( 'video' );
                //              let planetTexture =  new THREE.VideoTexture( video );
                //              item.material = new THREE.MeshPhongMaterial({color:"#bd2648"});
                //              item.material.map = planetTexture;
                //              item.material.needsUpdate = true;
                //         }
                //       })
                //       scene.add( loadedMesh );
                //     }, onProgress, onError );
                // });
            }
            loadObj();
            camera.position.x = 200;
            camera.position.y = 500;
            camera.position.z = 800;
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            //视图控件
            let controls = new THREE.OrbitControls(
                camera,
                webGLRenderer.domElement
            );
            controls.enableDamping = true;
            controls.dampingFactor = 0.35;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.2;
            controls.rotateSpeed = 0.2;
            controls.zoomSpeed = 1.0;
            controls.minDistance = 100;
            controls.maxDistance = 1800;
            controls.enablePan = false;
            controls.minPolarAngle = 0;
            controls.maxPolarAngle = Math.PI / 2;
            //光源
            let hemiLight = new THREE.HemisphereLight(0xeeeeee, 0xeeeeee, 0.6);
            hemiLight.position.set(0, 500, 0);
            scene.add(hemiLight);
            let ambientLight = new THREE.AmbientLight(0xeeeeee);
            ambientLight.intensity = 0.5;
            scene.add(ambientLight);
            let spotLight = new THREE.SpotLight(0xeeeeee);
            spotLight.position.set(200, 1800, 0);
            spotLight.castShadow = true;
            spotLight.target = axes;
            spotLight.shadow.camera.near = 50;
            spotLight.shadow.camera.far = 2000;
            spotLight.intensity = 0.6;
            scene.add(spotLight);
            document.getElementById("WebGL").appendChild(webGLRenderer.domElement);

            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2(),
                INTERSECTED;
            addEventListener("dblclick", onMouseDblclick, false);
            function onMouseDblclick(event) {
                // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
                let intersects = getIntersects(event);
                // 获取选中最近的 Mesh 对象
                // if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
                //     selectObject = intersects[0].object;
                //     changeMaterial(selectObject);
                // } else {
                //     alert("未选中 Mesh!");
                // }
                if (intersects.length > 0) {
                    if (INTERSECTED != intersects[0].object) {
                        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                        if (intersects[0].object.parent.parent.name != "deviceGroup") {
                            $this.isInfoBorderShow = false;
                        } else {
                            INTERSECTED = intersects[0].object;
                            INTERSECTED.material = INTERSECTED.material.clone();
                            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                            INTERSECTED.material.emissive.setHex(0xff0000);
                            $this.isInfoBorderShow = true;
                            $this.locationData.forEach(item => {
                                if (item.EQP_ID == INTERSECTED.parent.name) {
                                    $this.deviceInfoData = item;
                                }
                            });
                            for (let el in $this.$store.state.homDeviceStat) {
                                if ($this.deviceInfoData.EQP_ID == el) {
                                    switch (Number($this.$store.state.homDeviceStat[el])) {
                                        case 0:
                                            $this.deviceInfoData.stateName = "正常";
                                            $this.deviceInfoData.stateColor = "green";
                                            break;
                                        case 1:
                                            $this.deviceInfoData.stateName = "异常";
                                            $this.deviceInfoData.stateColor = "red";
                                            break;
                                        case 2:
                                            $this.deviceInfoData.stateName = "预警";
                                            $this.deviceInfoData.stateColor = "yellow";
                                            break;
                                        case 4:
                                            $this.deviceInfoData.stateName = "离线";
                                            $this.deviceInfoData.stateColor = "gray";
                                            break;
                                        default:
                                            return;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                    INTERSECTED = null;
                    $this.isInfoBorderShow = false;
                }
            }
            function changeMaterial(object) {
                var material = new THREE.MeshLambertMaterial({
                    color: 0xffffff * Math.random(),
                    transparent: object.material.transparent ? false : true,
                    opacity: 0.8
                });
                object.material = material;
            }
            console.log(scene);
            function getIntersects(event) {
                event.preventDefault();
                console.log("event.clientX:" + event.clientX);
                console.log("event.clientY:" + event.clientY);

                // 声明 raycaster 和 mouse 变量
                var raycaster = new THREE.Raycaster();
                var mouse = new THREE.Vector2();

                // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
                raycaster.setFromCamera(mouse, camera);

                // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
                var intersects = raycaster.intersectObjects(
                    scene.children,
                    true
                );

                //返回选中的对象
                return intersects;
            }
            //最终渲染
            renderScene();
            function renderScene() {
                let delta = clock.getDelta();
                controls.update(delta);
                stats.update();
                requestAnimationFrame(renderScene);
                webGLRenderer.render(scene, camera);
            }
        }
    },
    destroyed() {
        $(".dg.ac").html("");
    },
    watch: {
        "$store.state.homDeviceStat"(val) {
            //过滤掉其他mapID设备
            for(let item in val){
                let isExist=false
                this.locationData.forEach(el=>{
                    if(el.EQP_ID==item){
                        isExist=true;
                    }
                });
                if(!isExist){
                    delete val[item];
                }
            }
            let a = 0,
                b = 0,
                c = 0,
                d = 0,
                e = 0;
            if (Object.keys(val).length) {
                for (let el in val) {
                    if (this.deviceInfoData.EQP_ID == el) {
                        switch (Number(val[el])) {
                            case 0:
                                this.deviceInfoData.stateName = "正常";
                                this.deviceInfoData.stateColor = "green";
                                break;
                            case 1:
                                this.deviceInfoData.stateName = "异常";
                                this.deviceInfoData.stateColor = "red";
                                break;
                            case 2:
                                this.deviceInfoData.stateName = "预警";
                                this.deviceInfoData.stateColor = "yellow";
                                break;
                            case 4:
                                this.deviceInfoData.stateName = "离线";
                                this.deviceInfoData.stateColor = "gray";
                                break;
                            default:
                                break;
                        }
                    }
                    switch (Number(val[el])) {
                        case 0:
                            a++;
                            break;
                        case 1:
                            b++;
                            break;
                        case 2:
                            c++;
                            break;
                        case 4:
                            d++;
                            break;
                        default:
                            break;
                    }
                    e++;
                }
                this.statusNumber = {
                    normal: a,
                    abnormal: b,
                    prewarning: c,
                    offline: d,
                    total: e
                };
            }
            if (this.deviceGroup.children && this.deviceGroup.children.length > 0) {
                this.deviceGroup.children.forEach(item => {
                    for (let el in val) {
                        if (item.name == el) {
                            switch (Number(val[el])) {
                                case 0:
                                    item.children.forEach(per => {
                                        if (per.name == "statusLamp") {
                                            per.material = new THREE.MeshPhongMaterial(
                                                {
                                                    color: "#00e42e",
                                                    emissive: "#00e42e"
                                                }
                                            );
                                            per.material.needsUpdate = true;
                                        }
                                    });
                                    break;
                                case 1:
                                    item.children.forEach(per => {
                                        if (per.name == "statusLamp") {
                                            per.material = new THREE.MeshPhongMaterial(
                                                {
                                                    color: "#bd2648",
                                                    emissive: "#bd2648"
                                                }
                                            );
                                            per.material.needsUpdate = true;
                                        }
                                    });
                                    break;
                                case 2:
                                    item.children.forEach(per => {
                                        if (per.name == "statusLamp") {
                                            per.material = new THREE.MeshPhongMaterial(
                                                {
                                                    color: "#84350e",
                                                    emissive: "#84350e"
                                                }
                                            );
                                            per.material.needsUpdate = true;
                                        }
                                    });
                                    break;
                                case 4:
                                    item.children.forEach(per => {
                                        if (per.name == "statusLamp") {
                                            per.material = new THREE.MeshPhongMaterial(
                                                {
                                                    color: "#aaaaaa",
                                                    emissive: "#aaaaaa"
                                                }
                                            );
                                            per.material.needsUpdate = true;
                                        }
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                });
            }
        }
    },
    components: {}
};
</script>
<style lang="scss">
.dg.ac {
    bottom: 0;
    z-index: 2000;
}
</style>

<style scoped lang="scss">
$chart-bgc: rgba(19, 21, 32, 1);
.threeDScene {
    color: #fff;
    width:100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 2000;
    .shutdown {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 38px;
        z-index: 101;
        cursor: pointer;
        &:hover {
            color: $yellow;
        }
    }
    .title-box {
        position: absolute;
        top:0;
        width:100%;
        z-index: 100;
        h1 {
            font-size: 28px;
            background-image: -webkit-gradient(
                linear,
                0 0,
                0 bottom,
                from(rgba(255, 255, 255, 1)),
                to(#0cabff)
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            font-weight: 700;
            letter-spacing: 4px;
        }
        h3 {
            line-height: 3;
            font-size: 18px;
            text-align: center;
        }
    }
    .main {
        position: absolute;
        .led {
            position: absolute;
            top: 0;
            width: 320px;
            border: 2px dashed $blue;
        }
    }
    .info-border {
        background-color: $blue;
        position: absolute;
        top: 5%;
        left: 0;
        padding: 20px;
        border: 1px solid $olive;
        li {
            font-size: 16px;
        }
    }
    .info-device {
        background-color: $blue;
        position: absolute;
        top: 25%;
        padding: 20px;
        width: 350px;
        border: 1px solid $olive;
        li {
            font-size: 16px;
        }
        .title {
            text-align: center;
            .view {
                cursor: pointer;
                i {
                    float: right;
                    font-size: 22px;
                }
            }
        }
    }
}
</style>

