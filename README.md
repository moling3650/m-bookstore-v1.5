# m-bookstore-v1.5

> 用vue.js v1.026搭建的移动端书城，如果对您有帮助的话请star，如果有问题可以提issues，欢迎fork和pr来改善代码质量

## Build Setup

``` bash
# 安装依赖包
npm install

# 启动热加载服务器运行在 localhost:5000
npm run dev

# 打包成生产环境压缩文件
npm run build

```

## 项目开发流程

1. 开发平台的搭建，一般靠手脚架工具完成，基本包括lint库，简易服务器模拟真实线上环境（完成）
2. mock数据的导入，开发模拟真实线上的api接口，并测试api是否成功返回响应（完成）
3. 确定页面分层结构，编写主页面骨架，编写路由，测试路由跳转（完成）
  - 主页面
  - 免费专区
  - 女生频道
  - 男生频道
  - 分区页面
  - 书籍详情页
4. 在页面编写api调用接口，调试是否成功获取响应（完成）
5. 确定可复用的组件，编写可复用组件的结构与样式
  - top          （二级页面的顶部导航）
  - group-header （主区块的通用头部）
  - book-table   （主区块的内容区，一行三本书并排）
  - book-list    （主区块的内容区，每行一本书简介）
  - group-footer （主区块的通用脚部）
6. 在页面导入组件，编写页面中其余的结构与样式（完成）
  - main  （完成）
  - free  （完成）
  - girl  （完成）
  - boy   （完成）
  - category  （JSON数据不完整，放弃）
  - book  （完成）
7. 编写交互事件（完成）
  - 页面跳转
  - 切换书籍
  - 瀑布流加载更多
8. 编写动画
  - 组件入场出场动画
  - 广告轮播
9. 联调测试部署上线