// ==UserScript==
// @name 论坛签到工具
// @namespace bbssign
// @version 0.5
// @description 用于各种论坛自动签到
// @include      http://*/plugin.php?id=dsu_paulsign*
// @include      http://bbs.kafan.cn/*
// @include      http://bbs.kafan.cn/forum.php?mod=viewthread*
// @include      http://www.stus8.com/*
// @include      http://bbs.kafan.cn/thread-*-*-*.html
// @include      http://bbs.wstx.com/*
// @include      http://bbs.houdao.com/
// @include      http://*/dsu_paulsign-sign*
// @include      http://www.tsdm.net/*
// @include      http://bbs.gfan.com/*
// @include      http://www.horou.com/*
// @include      http://www.92jh.cn/*
// @include      http://bbs.wstx.com/*
// @include      http://bbs.ntrqq.net/*
// @include      http://www.gn00.com/*
// @include      http://*plugin.php?id=mpage_sign:sign*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @note         论坛签到工具,整合自卡饭Coolkids论坛自动签到和jasonshaw网页自动化系列点击,做了一点微小的修改
// @note         感谢@颜太吓的指导
// @grant GM_xmlhttpRequest
// @run-at document-end
// @copyright 2013+, Coolkid
// @copyright 2014+, jasonshaw
// @copyright 2016+, wycaca
// ==/UserScript==

if(isURL("http://bbs.houdao.com")){
	//猴岛
	var p = {
		elements: ['#houdaoSignClick']
	}
	qd3();
}
if(isURL("http://bbs.kafan.cn/*")){
	//卡饭
	var p = {
		elements: ['a#pper_a']
	}
	qd3();
}

if(isURL("http://www.emuijd.com/plugin.php?id=dsu_paulsign:sign")){
	//据点
	var p = {
		elements: ['.tr3 > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)']
	}
	qd4();
}


if(isURL("http://www.gn00.com/plugin.php?id=dsu_paulsign:sign")){
	//技术宅
	var p = {
		elements: ['.tr3 > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)']
		}
	qd4();

}


if(isURL("http://cn.club.vmall.com/plugin.php?id=dsu_paulsign:sign")){
	//华为
	var p = {
		elements: ['a.sign-btn.btn_rs']
	}
	qd3();
}
if(isURL("http://bbs.wstx.com/plugin.php?id=dsu_paulsign:sign")){
	//外设天下
	var p = {
		elements: ['.tr3 > div:nth-child(2) > a:nth-child(1)']
	}
	qd4();
}

if(isURL("http://www.yeapk.com/plugin.php?id=mpage_sign:sign")){
	//夜安卓
	GM_xmlhttpRequest({
		method:'POST',
		url:'http://www.yeapk.com/plugin.php?id=mpage_sign:sign&inajax=1',
		data:'formhash=4dc88acc&signsubmit=yes&handlekey=sign&moodid=1&content=123',
		headers:{
			//表单编码,表单默认的提交数据的格式
			"Content-Type": "application/x-www-form-urlencoded"
		},
		
		onload: function(responseDetails) {
			//alert(responseDetails.responseText);
		}
	});
}


if(isURL("http://www.tsdm.net/")){
	//天使论坛
	qd();
    if(window.find("签到领奖")&&(window.location.href!="http://www.tsdm.net/plugin.php?id=dsu_paulsign:sign")){
        window.location.href="http://www.tsdm.net/plugin.php?id=dsu_paulsign:sign";
        return;
    }
}else if(isURL("bbs.kafan.cn")){
	//卡饭论坛
	qd2();
}else if(isURL("www.lightnovel.cn/home.php?mod=task")){
	//轻国
	if(window.find("每日任务")&&window.find("啪啪啪")){
		window.location.href="http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
		return;
	}
}else{
	//其他论坛
	qd();
}
if(isURL("http://bbs.gfan.com/")){//机锋
    qd();
    if(window.find("签到领奖!")){
        window.location.href="http://bbs.gfan.com/plugin.php?id=dsu_paulsign:sign";
        return;
    }
}


if(isURL("http://www.horou.com/")){//河洛
    qd();
    if(window.find("签到领奖!")){
        window.location.href="http://www.horou.com/plugin.php?id=dsu_paulsign:sign";
        return;
    }
}
if(isURL("http://bbs.ntrqq.net/")){//NTRQQ
    qd();
    if(window.find("签到领奖!")){
        window.location.href="http://bbs.ntrqq.net/plugin.php?id=dsu_paulsign:sign";
        return;
    }
}


function isURL(x){
    if(window.location.href.indexOf(x)!=-1){
    	return true;
    }else{
     	return false;
    }
}

function qd(){
	if(window.find("今天签到了吗")&&window.find("请选择您此刻的心情图片并写下今天最想说的话")){
		var text = document.getElementById("ch_s");
		var text2 = document.getElementById("todaysay");
        if(text==null){
        	return;
        }
    	text.setAttribute('checked',true);    
        text2.value = "全自动签到,就是爽~";
		var button = document.getElementById("qiandao");
		button.submit();
        return;
    }
}

function qd2(){
	var imgs = document.getElementById("pper_a").getElementsByTagName("IMG");
	if(imgs[0].src.indexOf("wb.png")==-1){
		var a = document.getElementById("pper_a");;
		a.onclick();
		return;
	}
}

function qd3(){
var elements = p.elements, i = 0;
setTimeout(function(){
try {
if(elements instanceof Array) var els = p.elements;
else {//function
var els = p.elements();
}
while(els[i]){
var obj = (p.elements instanceof Array)?document.querySelector(els[i]):els[i];
if(obj == null) return;
if(obj.tagName=="A" && obj.href.indexOf("javascript")<0 && obj.onclick == "undefined") GM_openInTab(obj.href);
else obj.click();
i++;
}
} catch(e){alert(e);}
}, 400);
setTimeout(function(){
if(autoClose) window.close();
}, delay+100);
}

function qd4(){
var elements = p.elements, i = 0;

setTimeout(function(){
var obj1 = document.getElementById("kx");
obj1.click();
try {
if(elements instanceof Array) var els = p.elements;
else {//function
var els = p.elements();
}
while(els[i]){
var obj = (p.elements instanceof Array)?document.querySelector(els[i]):els[i];
if(obj == null) return;
if(obj.tagName=="A" && obj.href.indexOf("javascript")<0 && obj.onclick == "undefined") GM_openInTab(obj.href);
else obj.click();
i++;
}
} catch(e){alert(e);}
}, 400);
}
