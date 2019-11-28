class Pipe{
    constructor(){
        this.w = game.allImg['pipe_down'].width
        this.h = game.allImg['pipe_down'].height
        this.h1 = Math.round(Math.random()*200+100)//管子的高度100-300之间
        this.space = 140 //两个管子中间的空
        this.h2 = game.canvas.height-game.allImg["land"].height-this.h1-this.space //这个屏幕的高度-大地的高度-h1管子的高度-空隙
        this.x = game.canvas.width;
        this.speed=1;
        //每new一个管子放进数组中
        game.pipeArr.push(this)
        
    }
    update(){
        this.x-=this.speed

        //销毁没用的管子（走出画布）
        for(let i=0;i<game.pipeArr.length;i++){
            if(game.pipeArr[i].x<=-this.w){
                game.pipeArr.splice(i,1);
                i--
            }
        }
    };
    render(){
        game.draw.drawImage(game.allImg['pipe_down'],0,this.h-this.h1,this.w,this.h1,this.x,0,this.w,this.h1)
        game.draw.drawImage(game.allImg['pipe_up'],0,0,this.w,this.h2,this.x,this.h1+this.space,this.w,this.h2)
    }
}