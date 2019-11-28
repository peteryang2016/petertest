class Land{
    constructor(){
        this.h = game.allImg['land'].height;
        this.w = game.allImg['land'].width;
        this.speed = 1
        this.x = 0
    }
    update(){
        this.x-=this.speed
        this.x<=-this.w?this.x=0:null;
    }
    render(){
        game.draw.drawImage(game.allImg['land'],this.x,game.canvas.height-this.h)
        game.draw.drawImage(game.allImg['land'],this.x+this.w,game.canvas.height-this.h)
        game.draw.drawImage(game.allImg['land'],this.x+this.w*2,game.canvas.height-this.h)
    }
}