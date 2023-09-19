var myCupUnit=0;
var myCupRef;
var myCupCode="";

var cupRefs=[];
var cupTextRefs=[];
var cupLabel=Array(10);
var cupPoint=Array(10).fill(20);
var cupUnit=Array(10).fill(0);

var recordRef;
var hintRef;
var hints=["Hint:點選my_cup","Hint:點選左下角的容器"];
var hintIdx;

var tmp="";
var maxIdx;
var record = "Record:</br>"

function findMaxPoint(){
	maxIdx = 0;
	for(var i=0;i<cupPoint.length;i++){
		if(cupPoint[i]>cupPoint[maxIdx])
		maxIdx = i;
	}
}

function genLable(){
	var idx;
	for(var i=0;i<cupLabel.length;i++){
		idx = Math.floor(Math.random() * 3 + 1);
		switch (idx) {
			case 1:
				cupLabel[i]='A';
				cupPoint[i]+=2;
				break;
			case 2:
				cupLabel[i]='B';
				cupPoint[i]+=1;
				break;
			case 3:
				cupLabel[i]='C';
				cupPoint[i]+=0;
				break;
		}
	}
}

function start(){
	cupTextRefs = document.getElementsByClassName("cupText");
	cupRefs = document.getElementsByClassName("cup");
	myCupRef = document.getElementById('myCup');
	recordRef = document.getElementById('record');
	hintRef = document.getElementById('hint');
	hintIdx=0;
	genLable();
	show();
}

function myCupFill(){
	myCupUnit = Math.floor(Math.random() * 3 + 1);
	record += 'myCup隨機填入'+String(myCupUnit)+'個單位<br>';
	hintIdx=1;
	show();
}

function fill(idx){
	/*var num = window.prompt('請輸入想轉移的數量');*/
	if(cupUnit[idx] + myCupUnit>20){
		alert('無法操作，會超過容量上限');
	}
	else{
		cupUnit[idx] += myCupUnit;
		cupPoint[idx] -= myCupUnit;
		record += '容器'+String(idx+1)+'號中倒入'+String(myCupUnit)+'個單位，';
		record += '積分最高值為'+String(maxIdx+1) +'號容器<br>';
		myCupUnit = 0;
		hintIdx=0;
		show();
	}
}

function show(){
	//show mycup
	myCupCode="";
	myCupCode+='<div class="smallCupLabel">my_cup</div>';
	for(var i=0;i<myCupUnit;i++){
		myCupCode+='<div class="smallCupUnit"></div>';
	}
	myCupRef.innerHTML=myCupCode;
	
	//show cups
	findMaxPoint();
	for(var i=0;i<cupTextRefs.length;i++){
		tmp="";
		for(var j=0;j<cupUnit[i];j++)
			tmp+='<div class="unit"></div>';
		cupRefs[i].innerHTML='<div class="mylabel">'+cupLabel[i]+'</div>'+tmp;
		if(i==maxIdx)
			cupTextRefs[i].innerHTML=String(i+1)+'. Point: '+String(cupPoint[i])+'<div class="highlight"> (MAX) </div>';
		else
			cupTextRefs[i].innerHTML=String(i+1)+'. Point: '+String(cupPoint[i]);
	}
	
	//show record
	recordRef.innerHTML=record;
	
	//show hint
	hintRef.innerHTML=hints[hintIdx];
}