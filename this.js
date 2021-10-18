//Small Viewport Alert:
var rescnt = 0;
function issuff(){
    setTimeout(()=>{
        var res = window.innerWidth;
        if(res<1100 && rescnt<2){
            alert(":(\nMaximise window / View on Laptop or PC")
            rescnt+=1;
        }
    },100);  
}
window.addEventListener("resize",issuff);
window.addEventListener("load",issuff);

//Stack Height Initialization:
var hinc = document.getElementById("hinc");
var hdec = document.getElementById("hdec");
var hv = document.getElementById("hv");
var seth = document.getElementById("seth");
var height = [1,2,3,4,5,6,7,8,9,10]
var currheight = 0;
var MAX_HEIGHT = -1;

hinc.addEventListener("click",()=>{
    if(currheight != 9){
        currheight += 1;
        hv.innerHTML = height[currheight];
    }
});

hdec.addEventListener("click",()=>{
    if(currheight!=0){
        currheight -= 1;
        hv.innerHTML = height[currheight];
    }
});

seth.addEventListener("click",()=>{
    if(MAX_HEIGHT==-1){
        MAX_HEIGHT = hv.innerHTML;
        buildstack(MAX_HEIGHT);
    }
})

//Create empty stack:
var out = document.getElementById("out");
var bottom = 15;

function buildstack(height){
    for(let i=1;i<=height;i++){
        let currl = document.getElementById(`l${i}`);
        currl.style.bottom = `${bottom}px`;
        bottom += 31;
        currl.style.visibility = "visible";
    }
    currl = document.getElementById("fltr");
    bottom += 5;
    currl.style.bottom = `${bottom}px`;
    
}

//Push:
var pushb = document.getElementById("pushb");
var firstEmpty = 1;
var pushing = false;

function push(){
    pushing = true;
    let level = MAX_HEIGHT;
    let fltr =  document.getElementById("fltr");
    let rec=[];
    let time = 500;
    fltr.style.visibility = "visible";
    setTimeout(()=>{fltr.style.visibility = "hidden";},300);
    for(let i = level;i>=firstEmpty;i--){
        rec[i] = document.getElementById(`r${i}`);
    }
    for(let j = level;j>firstEmpty;j--){
        setTimeout(()=>{rec[j].classList = "full";},time);
        time+=250;
        setTimeout(()=>{rec[j].classList = "empty";},time);
        time+=250;
    }
    setTimeout(()=>{
        rec[firstEmpty].classList = "full";
        firstEmpty+=1;
        pushing = false;
    },(level-firstEmpty+1)*500);
}
pushb.addEventListener("click",()=>{
    if(firstEmpty>MAX_HEIGHT)
        popup("warn","Stack is full!!");
    else if(!pushing)
        push();
});

//Popup:
function popup(cls,data){
    let pop = document.getElementById("pop");
    pop.innerHTML = data;
    pop.classList = cls;
    pop.style.visibility = "visible";
    setTimeout(()=>{pop.style.visibility = "hidden";},800);
}

//Reset:
var rb = document.getElementById("rb");
rb.addEventListener("click",()=>{
    location.reload();
})




