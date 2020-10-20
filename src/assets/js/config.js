//api等配置地址
export default  {
    // 本地URl
    socketIP:process.env.VUE_APP_BASE_SOKET,
    apiUrl:process.env.VUE_APP_BASE_API,
    apiFileUrl:process.env.VUE_APP_FILE_API,
    // apiPDFView:'http://10.15.123.111:8080/pdfviewer/web/viewer.html?file=',
    // apiFileUrl: 'http://10.15.123.111:84',
     //上传文件类型
    ACCEPT_CONFIG:{
       image: ['gif', 'jpg', 'jpeg', 'png', 'bmp'],
       video: ['mp4', 'rmvb', 'wmv', 'mkv', 'flv'],
       audio: ['mp3'],
       document: ['doc', 'txt', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx'],
       eqpActive: ['olk','OLK'],
    },
};
