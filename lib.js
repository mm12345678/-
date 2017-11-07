//返回前面和后面  所有的兄弟节点。。。
//现获取父元素节点下的所有子节点
//最后把元素自己去掉。
function siblings(obj) {
    var arr = [];
    var bobo = obj.parentNode.children;
    for (var i = 0, bb = bobo.length; i < bb; i++) {
        if (bobo[i] !== obj) {
            arr.push(bobo[i]);
        }
    }
    return arr;
}


// closest(node,selector)  难度:☆☆☆☆
// 参数说明:
//     node:Object类型,期望传入合法的Node节点元素
//     selector: String类型,期望传入合法的css选择器;
// 功能:
//     从Node参数元素本身开始，逐层向组先级元素匹配，返回最先与selector参数选择器匹配到的祖先元素。

// 提示:
//     字符串拥有substring()全局方法,
//     如若使用 字符串.substring(0,1) 则返回字符串第一个字符
//     参考:http://www.w3school.com.cn/jsref/jsref_substring.asp

function closest(node,selector){
    var method = selector.substring(0,1);
    if(method == "#"){
        while(node.parentNode != null){
            if("#" + node.parentNode.id  ==  selector){
                return node.parentNode;
            }
            else{
                node = node.parentNode;
            }
        }
    }
    if(method == "."){
        while(node.parentNode != null){
            if("." + node.parentNode.className  ==  selector){
                return node.parentNode;
            }
            else{
                node = node.parentNode;
            }
        }
    }
    if(method != "#" && method != "."){
        while(node.parentNode != null){
            if(node.parentNode.nodeName  ==  selector.toUpperCase()){
                return node.parentNode;
            }
            else{
                node = node.parentNode;
            }
        }
    }
}
//绑定事件
function addEvent(nodeList,eventType,operation){
	for(var i = 0; i < nodeList.length; i++){
		nodeList[i][eventType] = operation
	}
}












