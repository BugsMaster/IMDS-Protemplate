<template>
    <div class="uploader-box">
        <el-tooltip class="item" effect="dark" placement="top" manual v-model="percentageShow">
            <div slot="content">
                <el-progress v-if="percentageVal<98" :percentage="percentageVal"></el-progress>
                <el-progress v-else :percentage="percentageVal" status="success"></el-progress>
            </div>
            <span @click="openUploader">
                <slot name="clickContent"></slot>
            </span>
        </el-tooltip>
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="true"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                :limit="1"
                class="uploader-app">
                <uploader-btn id="file-uploader-btn" ref="uploadBtn"></uploader-btn>
        </uploader>
    </div>
</template>

<script>
    import api from 'assets/js/api';
    import Config from 'assets/js/config';
    import SparkMD5 from 'spark-md5';
    import { Storage, Ticket } from 'assets/js/utils';
    export default {
        props:{
            uploaderObj:{
                type: Object,
                default: function () {
                    return {
                        type:'image',
                        size: 10,
                    }
                }
            },
            apiUrl:{
                type: String,
                default: Config.apiFileUrl+'/api/file/upload/doc'
            }
        },
        data() {
            return {
                options: {
                    target: this.apiUrl,
                    chunkSize: '2048000',
                    fileParameterName: 'upfile',
                    maxChunkRetries: 1,
                    testChunks: true,   //是否开启服务器分片校验
                    // 服务器分片校验函数，秒传及断点续传基础
                    checkChunkUploadedByResponse:(chunk, message)=> {
                        let objMessage = JSON.parse(message);
                        console.log(objMessage)
                        if (objMessage.status!=200) {
                            this.$message.error(objMessage.msg);
                            this.uploader.pause();
                            return;
                        }
                        if(objMessage.data.isuploaded){
                            return true;
                        }
                        return [].indexOf(chunk.offset + 1) >= 0
                    },
                    headers: {
                        Authorization: "Bearer " + Ticket.get()
                    }
                },
                percentageVal:0,
                percentageShow:false,
            }
        },
        created() {

        },
        mounted() {
        },
        computed: {
            uploader() {
                return this.$refs.uploader.uploader;
            }
        },
        methods: {
            openUploader(){
                if (this.$refs.uploadBtn) {
                    this.$refs.uploadBtn.$el.click();
                }
            },
            onFileAdded(file) {
                this.$emit('fileAdded',true);
                let arrTemp;
                if(this.uploaderObj.type!='any'){
                    arrTemp = Config.ACCEPT_CONFIG[this.uploaderObj.type];
                    if(arrTemp.indexOf(file.name.split('.')[file.name.split('.').length - 1])==-1){
                        this.$message.warning('请上传 '+arrTemp+' 格式文件');
                        file.pause();
                        this.uploader.removeFile(file);
                        return;
                    }
                }
                
                let isLimmited = file.size / 1024 / 1024 < this.uploaderObj.size;
                if (!isLimmited) {
                    file.pause();
                    this.$message.warning(this.$t('tip.fileSizeLimited',[this.uploaderObj.size]));
                    return
                }
                this.computeMD5(file);
                this.percentageShow=true;
            },
            onFileProgress(rootFile, file, chunk) {
                let currentVal =  Number(((chunk.endByte/file.size)*100).toFixed(2));
                if(currentVal<this.percentageVal) return;
                this.percentageVal=currentVal;
                if(this.percentageVal>99){
                    this.percentageVal=100;
                }
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                console.log("%c上传成功，曹锐说：","line-height:28px;padding:4px;color:#333;font-size:16px;margin-right:15px;text-shadow: 1px 1px 1px grey",res);
                // 服务器自定义的错误，这种错误是Uploader无法拦截的
                if (res.status!=200) {
                    this.$message.error(res.msg);
                    return;
                }
                // 如果服务端返回需要合并
                if (res.data.need_merge) {
                    api.putFileuploadDoc({
                        tempname: res.data.temp_folder,
                        filename: file.name,
                    }).then(res => {
                        // 文件合并成功
                        this.$emit('fileUploadSuccess',res);
                    });
                // 不需要合并
                } else {
                    this.$emit('fileUploadSuccess',res);
                }
                setTimeout(()=>{
                    this.percentageShow=false;
                    setTimeout(()=>{
                        this.percentageVal=0;
                    },50)
                },1000);
            },
            onFileError(rootFile, file, response, chunk) {
                this.$message.error(response);
                this.percentageVal=0;
                this.percentageShow=false;
            },
                /**
             * 计算md5
             */
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let md5 = '';
                file.pause();

                fileReader.readAsArrayBuffer(file.file);

                fileReader.onload = (e => {
                    if (file.size != e.target.result.byteLength) {
                        this.$message.error('Browser reported success but could not read the file until the end.');
                        return
                    }
                    md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
                    console.log(`MD5计算完毕：${file.id} ${file.name} MD5：${md5} 用时：${new Date().getTime() - time} ms`);
                    file.uniqueIdentifier = md5;
                    file.resume();
                });

                fileReader.onerror = function () {
                    this.$message.error('FileReader onerror was triggered, maybe the browser aborted due to high memory usage.');
                };
            },
        },
        watch: {},
        destroyed() {
        },
        components: {}
    }
</script>
<style lang="scss">
.uploader-box{
    .uploader-file-info{
        overflow: auto;
        display: flex;
        .uploader-file-name{
            max-width: 250px;
        }
        .uploader-file-size{
            text-indent:0;
            text-align: center;
        }
        .uploader-file-actions{
             flex:1;
             text-align: center;
             width:50px;
             span{
                 margin-right: 5px;
             }
        }
        .uploader-file-status{
            text-indent:0;
            text-align: center;
            width: 150px;
            i{
                display: none;
            }
        }
        .uploader-file-meta{
            display: none;
        }
    }
}
.el-progress{
    width: 250px;
    .el-progress-bar{
        width: 240px;
    }
    .el-progress__text{
        color: #fff;
    }
}
</style>

<style scoped lang="scss">
    #uploader-box {
        .uploader-app {
            width: 100%;
            height: 100%;
        }
        .uploader-list{
            width: 100%;
            height: 100%;
        }
        .file-panel {
            display: flex;
            flex-flow:column nowrap;
            width: 100%;
            height: 100%;
            .file-title {
                line-height: 30px;
                border-bottom: 1px solid #ddd;
            }
            .file-list {
                flex:1;
                overflow: auto;
            }
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
    }
    /* 隐藏上传按钮 */
    #file-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>
