# 本文件说明初步建立一个Grunt Project

## 设置npm镜像
由于直接访问npm，可能会很慢，甚至会出现链接中断，所以我们需要设置npm镜像，这样下载就会快些，执行以下命令来设置
```
npm config set registry https://registry.npm.taobao.org
```

## 初始化
### 1.Grunt 初始化
```
git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile  
grunt-init gruntfile
```
### 2.初始化package.json
```
npm init
```
license使用BSD-3-Clause或MIT
### 3.bower初始化
```
Bower init
```

## 添加依赖
```
bower install requirejs --save   
bower install angularjs --save   
bower install jquery –save
```

bower只负责把依赖下载到本地的 bower_components 目录，并不负责把它们拷贝到我们项目中实际使用的地方，比如 public/js/lib 目录下。为了实现这样的功能，我们还需要另一个插件的帮助：
npm install grunt-bower-task --save-dev
在Gruntfile中合适位置添加：
grunt.loadNpmTasks('grunt-bower-task');
然后在grunt.initConfig({...})参数中，添加相应的配置项：
```
bower: {
    install: {
      options: {
        targetDir: './public/js/lib',
        layout: 'byComponent',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      }
    }
  }
```
文件按照模块分成单个目录(byComponent)。如果想把所有的js放在同一个目录，所有的css文件放在同一个目录，则使用byType


## 一个简单的服务部署
### 1.安装server
```npm install -g http-server```
### 2.安装成功后
```http-server -a hostip -p port```