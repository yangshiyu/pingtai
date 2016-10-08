/**
 * Created by Administrator on 2016/8/7.
 */
function $(id) {
    return document.getElementById(id);
}
function addEvent(element,type,handler) {
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if (element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}
function getstyle(obj,name)
{
    if(obj.currentStyle)
        return obj.currentStyle[name];
    else
        return getComputedStyle(obj,null)[name];
}
function startmove(obj,attr,iTarget,handle)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=0;
        if(attr=='opacity')
            cur=Math.round(parseFloat(getstyle(obj,attr))*100);//Math.round四舍五入
        else
            cur=parseInt(getstyle(obj,attr));//getstyle(obj,attr)=150px,是字符串，要把它转化为数字
        var speed=(iTarget-cur)/5;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(cur==iTarget) {
            clearInterval(obj.timer);
            handle();
        }
        else
        {
            if(attr=='opacity')
                obj.style[attr]=(cur+speed)/100;
            else
                obj.style[attr]=cur+speed+'px';
        }//属性为参数时要用括号
    },30);
}
//localstorage兼容只支持globalstorage的浏览器
function getLocalStorage(){
    if(typeof localStorage=="object"){
        return localStorage;
    }else if(typeof globalStorage=="object"){
        return globalStorage[location.host];
    }else {
        throw new Error("Local Storage not available.");
    }
}
//判断浏览器的类型和版本
var sys={};
var ua=navigator.userAgent.toLowerCase();
var s;
(s=ua.match(/msie([\d.]+)/))?sys.ie=s[1]:
    (s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
        (s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
            (s=ua.match(/opera.([\d.]+)/))?sys.opera=s[1]:
                (s=ua.match(/version\/([\d.]+).*safari/))?sys.safari=s[1]:0;
//页面跳转
function jump(url){
    if(sys.ie){
        var a=document.createElement("a");
        a.href=url;
        document.body.appendChild(a);
        a.click();
    }else{
        window.location.href=url;
    }
}
