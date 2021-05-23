# a

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

<!-- # 支持项目logo和名称可替换 -->
<!-- cd /data/tomcat/apache-tomcat-8.5.43/webapps/dbd, 新建一个config目录， -->

# 替换网页内的项目logo
cd /data/tomcat/apache-tomcat-8.5.43/webapps/dbd/config, 然后在此目录下放入要替换的图片，名称改为header.png即可

# 改动网页内的项目名字
cd /data/tomcat/apache-tomcat-8.5.43/webapps/dbd/config, 找到global.js文件，打开，修改其中的name属性值，刷新即可

# 改动网页标签名字
cd /data/tomcat/apache-tomcat-8.5.43/webapps/dbd, 找到index.html，打开，找到<title>xxx</title>，修改这里的xxx，刷新即可修改title名字

# 改动网页标签logo
cd /data/tomcat/apache-tomcat-8.5.43/webapps/dbd, 替换logo.ico，刷新即可

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
