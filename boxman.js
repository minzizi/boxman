/**
 * Created by asusa on 2017/4/15.
 */
function boxMan(stage,config){
    this.box=[];//对象
    this.wall=[];//对象
    this.end=[];//对象
    this.man=null;//对象
    this.currbox=null;//对象
    this.status=[];//标志目的是否被占
    //this.num=0;//标志占据个数
    this.stage=stage;
    this.config=config;
    this.level=0;
    this.direction="right";
    this.leftIndex=0;
    this.rightIndex=2;
    this.upIndex=7;
    this.downIndex=4;
}
boxMan.prototype={
    init:function(){
        this.box=[];//对象
        this.wall=[];//对象
        this.end=[];//对象
        this.man=null;//对象
        this.currbox=null;//对象
        this.status=[];//标志目的是否被占
        this.wallInit(this.config['wallArr'][this.level]);
        this.boxInit(this.config['boxArr'][this.level]);
        this.manInit(this.config['manArr'][this.level]);
        this.endInit(this.config['endArr'][this.level]);
        this.groundInit(this.config['groundArr'][this.level]);
    },
    wallInit:function(wall){
        for(var i=0;i<wall.length;i++){
            this.paint('wall',wall[i]);
            //this.wall.push(wall[i]);
        }
    },
    boxInit:function(box){
        for(var i=0;i<box.length;i++){
            this.paint('box',box[i]);
            //this.box.push(box[i]);
        }
    },
    manInit:function(man){
        this.paint('man',man);
    },
    endInit:function(end){
        for(var i=0;i<end.length;i++){
            this.paint('end',end[i]);
            //this.end.push(end[i]);
        }
    },
    groundInit:function(ground){
        for(var i=0;i<ground.length;i++){
            var div=document.createElement("div");
            div.className="ground";
            div.style.height=ground[i][1]-ground[i][0]+"px";
            div.style.left=i*50+"px";
            div.style.top=ground[i][0]+"px";
            this.stage.appendChild(div);
        }
    },
    paint:function(type,arr){
        var div=document.createElement("div");
        div.className=type;
        div.style.left=arr[0]+"px";
        div.style.top=arr[1]+"px";
        this.stage.appendChild(div);
        if(type=='man'){
            this.man=div;
        }else if(type=='box'){
            this.box.push(div);
        }else if(type=='end'){
            this.end.push(div);
            this.status.push({s: false, t: null});
        }else if(type=='wall'){
            this.wall.push(div);
        }
    },
    manMove:function(index){
        var left=parseInt(this.man.style.left);
        var top=parseInt(this.man.style.top);
        this.man.style.backgroundImage='url("img/Character'+index+'.png")';
        if(this.direction=="left"){
            if(this.isObstacle(left-50,top,'wall')===true||this.boxMove(left-50,top)===false){
                this.man.style.left=left+"px";
            }else{
                this.man.style.left=left-50+"px";
                //this.man.style.backgroundImage='url("img/Character'+this.leftIndex+'.png")';
                //this.leftIndex++;
                //this.leftIndex=this.leftIndex>1?0:this.leftIndex;
            }
        }else if(this.direction=="right"){
            if(this.isObstacle(left+50,top,'wall')===true||this.boxMove(left+50,top)===false){
                this.man.style.left=left+"px";
            }else{
                this.man.style.left=left+50+"px";
                //this.man.style.backgroundImage='url("img/Character'+this.rightIndex+'.png")';
                //this.rightIndex++;
                //this.rightIndex=this.rightIndex>3?2:this.rightIndex;
            }
        }else if(this.direction=="up"){
            if(this.isObstacle(left,top-50,'wall')===true||this.boxMove(left,top-50)===false){
                this.man.style.top=top+"px";
            }else{
                this.man.style.top=top-50+"px";
                //this.man.style.backgroundImage='url("img/Character'+this.upIndex+'.png")';
                //this.upIndex++;
                //this.upIndex=this.upIndex>9?7:this.upIndex;
            }
        }else if(this.direction=="down"){
            if(this.isObstacle(left,top+50,'wall')===true||this.boxMove(left,top+50)===false){
                this.man.style.top=top+"px";
            }else{
                this.man.style.top=top+50+"px";
                //this.man.style.backgroundImage='url("img/Character'+this.downIndex+'.png")';
                //this.downIndex++;
                //this.downIndex=this.downIndex>6?4:this.downIndex;
            }
        }
    },
    isObstacle:function(left,top,type){
        for(var i= 0,tmp; tmp = this[type][i++];){
            var l=parseInt(tmp.style.left);
            var t=parseInt(tmp.style.top);
            if(left==l&&top==t){
               return true;
            }
        }
        return false;
    },
    boxMove:function(left,top){
        for(var i=0;i<this.box.length;i++){
            var l=parseInt(this.box[i].style.left);
            var t=parseInt(this.box[i].style.top);
            if(left==l&&top==t){
                this.currbox=this.box[i];
                if(this.direction=="left"){
                    if(this.isObstacle(left-50,top,'wall')||this.isObstacle(left-50,top,'box')){
                        return false;
                    }else{
                        this.currbox.style.left=l-50+'px';
                        return true;
                    }
                }else if(this.direction=="right"){
                    if(this.isObstacle(left+50,top,'wall')||this.isObstacle(left+50,top,'box')){
                        return false;
                    }else{
                        this.currbox.style.left=l+50+'px';
                        return true;
                    }
                }else if(this.direction=="up"){
                    if(this.isObstacle(left,top-50,'wall')||this.isObstacle(left,top-50,'box')){
                        return false;
                    }else{
                        this.currbox.style.top=t-50+'px';
                        return true;
                    }
                }else if(this.direction=="down"){
                    if(this.isObstacle(left,top+50,'wall')||this.isObstacle(left,top+50,'box')){
                        return false;
                    }else{
                        this.currbox.style.top=t+50+'px';
                        return true;
                    }
                }
            }else{
                this.currbox=null;
            }
        }
        //this.isOccupy();
    },
    /**
     * 判断目标位置是否全部被占据
     * 判断是否胜利
     */
    isWin: function () {
        if (this.currbox === null) {
            return;
        }
        for (var i = 0; i < this.end.length; i++) {
            if (this.status[i].t !== this.currbox && this.status[i].t !== null) {
                continue;
            }
            var l = parseInt(this.end[i].style.left);
            var t = parseInt(this.end[i].style.top);

            //还原被目标点推出的箱子颜色
            if(this.status[i].t == this.currbox){
                var num=0;
                for(var j=0;j<this.end.length;j++){
                    var el = parseInt(this.end[j].style.left);
                    var et = parseInt(this.end[j].style.top);
                    if (parseInt(this.currbox.style.left) !== el || parseInt(this.currbox.style.top) !== et){
                        num++;
                    }
                }
                if(num===this.end.length){
                    this.currbox.style.backgroundImage='url("img/Crate_Black.png")';
                }
            }

            if (parseInt(this.currbox.style.left) === l && parseInt(this.currbox.style.top) === t) {
                this.status[i].s = true;
                this.status[i].t = this.currbox;
                this.currbox.style.backgroundImage='url("img/Crate_Red.png")';
            } else {
                this.status[i].s = false;
                this.status[i].t = null;
            }
        }

        var tmp = 0;
        for (var i = 0, s; s = this.status[i++];) {
            if (s.s) {
                tmp++;
            }
        }
        //return tmp === this.status.length;
        if(tmp === this.status.length){
            //this与that的转换
            var that=this;
            setTimeout(function(){
                console.log("you win");
                console.log(that.config['wallArr'].length);
                alert("下一关");
                that.nextLevel();
            },100);
        }
    },
    nextLevel:function(){
        if(this.level==this.config['wallArr'].length-1){
            alert("没有更多了");
        }else{
            console.log("第二关");
            this.level++;
            //清除上一关地图
            this.stage.innerHTML='';
            select.selectedIndex=this.level;
            this.init();
        }
    },
}