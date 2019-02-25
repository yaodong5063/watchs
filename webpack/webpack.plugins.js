const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin'); 


//前面是路径，后面是要加载的js
let map=new Map([
	['./src/demo.html',['config','index']]
	]);


let plugins=[
   new webpack.HotModuleReplacementPlugin(),
   new webpack.ProvidePlugin({
        $: "jquery",
        Query: "jquery"
   }),
];

//新增模板
for (let [key, value] of map.entries()) {
  plugins.push(new htmlPlugin({
          filename:key.split('/')[key.split('/').length-1],
          template:key,
          inject:true,
          cache: true,  //发生变化才生成一个文件
          minify:{
            removeComments:true, //删除注释
            collapseWhitespace:true //删除空格
          },
          chunks:value,  //引入数组js
          chunksSortMode: function(chunk1,chunk2){
                var orders = value;
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
      }))
}

module.exports=plugins;    