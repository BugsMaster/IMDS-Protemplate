<template>
    <div class="wrap">
        <input type="file" style="display:none" id="uploadImage" @change="toUpload" placeholder=""/>
        <el-button type="success" icon="el-icon-upload" size="mini" circle title="上传" @click="upload"></el-button>
    </div>
</template>
<script>
import OSS from "ali-oss";
import Config from "assets/js/config";
export default {
    name: "upload",
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        upload(){
            document.getElementById("uploadImage").click();
        },
        toUpload() {
            let _this = this;
            _this.loading = true;
            let client = new OSS({
                region: 'oss-cn-beijing',
                accessKeyId: "",
                accessKeySecret: "",
                bucket: "nt-device",
            });
            //获取文件信息
            const files = document.getElementById("uploadImage");
            if (files.files) {
                const fileLen = document.getElementById("uploadImage").files;
                const file = document.getElementById("uploadImage").files[0];
                let consat = file.name;
                let name = 'device_file/'+fileLen[0].name;
                for (let i = 0; i < fileLen.length; i++) {
                    const file = fileLen[i];
                    client
                        .multipartUpload(name, file,{
                            progress: function(percentage, cpt) {
                            // 上传进度
                            console.log(percentage)
                        }}).then(function(res) {
                            console.log(res)
                            _this.loading = false;
                            _this.$message({ message: '上传成功', duration: 1000,type: 'success'});
                            _this.$emit("ossSuccess", res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
