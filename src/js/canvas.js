var canvas=document.querySelector('canvas');

import platform from '../img/platform.png';
import hills from '../img/hills.png';
import background from '../img/background.png';
import platformSmallTall from '../img/platformSmallTall.png';




const c=canvas.getContext("2d");

const gravity=0.5;

canvas.width=1024;
canvas.height=576;

class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.velocity={
            x:0,
            y:1
        }
        this.width=30
        this.height=30
    }
    draw(){
        c.fillStyle='red';
        c.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
    update(){
        
        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x
        if(this.position.y+this.height+this.velocity.y <=canvas.height)
            this.velocity.y+=gravity

        this.draw()


    }
}

class PlatForm{

    constructor({x,y,image}){

        this.position={
            x,
            y
        }
        this.image=image
        this.width=image.width,
        this.height=image.height
        


    }
    draw(){
      c.drawImage(this.image,this.position.x,this.position.y)
        // c.fillStyle='blue';
        // c.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
}

class GenericObjects{

  constructor({x,y,image}){

      this.position={
          x,
          y
      }
      this.image=image
      this.width=image.width,
      this.height=image.height
      


  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y)
      // c.fillStyle='blue';
      // c.fillRect(this.position.x,this.position.y,this.width,this.height);

  }
}

function createImage(imageScr){

  const image=new Image();
  image.src=imageScr;
  return image
}

//const image=createImage(platform);
// image.src=platform;
let image=createImage(platform);




let player =new Player();
let platforms=[
   
];

let genericObjects = [

]

let keys={
    right: {
        pressed:false
    },
    left:{
        pressed:false
    }
    
}

initGame();

player.update();

let scrollOffSet=0

function initGame(){
   image=createImage(platform);




  player =new Player();
  platforms=[
       new PlatForm({x:image.width*4+300-2,y:300,image:createImage(platformSmallTall)}),
      new PlatForm({x:0,y:500,image}),
      new PlatForm({x:image.width-2,y:500,image}),
      new PlatForm({x:image.width*2+100,y:500,image}),
      new PlatForm({x:image.width*3+300,y:500,image}),
      new PlatForm({x:image.width*4+300-2,y:500,image}),
      new PlatForm({x:image.width*5+600,y:500,image})
      
      
    
    ];

  genericObjects = [
    new GenericObjects(
    { x:0,
      y:-1,
      image:createImage(background)}

    ),
    new GenericObjects(
      { x:-1,
      y:0,
      image:createImage(hills)}
  
    )
  ]


  player.update();

  scrollOffSet=0

}


function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white';
    c.fillRect(0,0,canvas.width,canvas.height)

    genericObjects.forEach((genericObject) => {
      genericObject.draw()
    })
    

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update();
    
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x=5
    }else if((keys.left.pressed && player.position.x >100) ||(keys.left.pressed && scrollOffSet==0 && player.position.x>0) ){
        player.velocity.x=-5

    }else 
        player.velocity.x=0
        if(keys.right.pressed){
            scrollOffSet+=5
            platforms.forEach((platform) => {
                platform.position.x-=5
                
            })
            genericObjects.forEach((genericObject) => {
              genericObject.position.x-=5
              
            })
            

        }else if (keys.left.pressed && scrollOffSet >0){
            scrollOffSet-=5
            platforms.forEach((platform) => {
                platform.position.x+=5
                
            })
            genericObjects.forEach((genericObject) => {
              genericObject.position.x+=5
              
            })
            
            
        }
      

    platforms.forEach((platform) => {
        if(player.position.y+player.height <= platform.position.y && player.position.y+player.height+player.velocity.y >=platform.position.y && player.position.x+player.width>=platform.position.x && player.position.x<= platform.position.x+platform.width){
            player.velocity.y=0 
         }
    })


    if(scrollOffSet >2000){
        console.log("you win");
    }

    if(player.position.y>canvas.height){

      initGame()
      
      
      
    }



    
        
    
    
}

animate();

addEventListener('keydown',({ keyCode }) =>{
    
    switch (keyCode){
        case 87:

            console.log("üp")
            player.velocity.y-=3
            break;
        case 65:
            keys.left.pressed=true
            break;
        case 83:
            console.log("down")
            break;
        case 68:
            keys.right.pressed=true
            break;
    }
    console.log(keys.right.pressed);
})

addEventListener('keyup',({ keyCode }) =>{
    
    switch (keyCode){
        case 87:

            console.log("üp")
            player.velocity.y-=20
            break;
        case 65:
            keys.left.pressed=false
            break;
        case 83:
            console.log("down")
            break;
        case 68:
            keys.right.pressed=false
            break;
    }
    console.log(keys.right.pressed);
})
