class Bird{
    constructor(){
        this.w = game.allImg['bird0_0'].width;
        this.x = game.canvas.width/2-this.w/2;//小鸟在画布位置
        this.y = 200//小鸟在画布位置
        this.wing=0
        this.status='drop'//小鸟状态 drop:下落 up：上升
        this.changeY=0;//变化量
        this.rotate = 0;//旋转
    }
    update(){
        if(this.status=='drop'){
            this.changeY+=0.5
            this.y+=this.changeY;
            this.rotate+=0.08;
        }else if(this.status=='up'){

        }
        if(this.y>=game.canvas.height-game.allImg['land'].height){
            this.y = game.canvas.height-game.allImg['land'].height

        }
    }
    render(){
        //game.draw.save()
        //game.draw.translate(this.x,this.y)
        game.draw.drawImage(game.allImg['bird0_'+this.wing],this.x,this.y)
        //game.draw.restore();
    }
}