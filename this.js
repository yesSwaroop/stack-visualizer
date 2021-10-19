//Small Viewport Alert:
var rescnt = 0;
function issuff(){
    setTimeout(()=>{
        var res = window.innerWidth;
        if(res<1100 && rescnt<2){
            alert(":(\nMaximise window / View on Laptop or PC");
            rescnt+=1;
        }
    },100);  
}
window.addEventListener("resize",issuff);
window.addEventListener("load",issuff);

//Stack Height Initialization:
var bactive = false;
var hinc = document.getElementById("hinc");
var hdec = document.getElementById("hdec");
var hv = document.getElementById("hv");
var seth = document.getElementById("seth");
var height = [1,2,3,4,5,6,7,8,9,10]
var currheight = 0;
var MAX_HEIGHT = -1;

hinc.addEventListener("click",()=>{
    if(currheight != 9 && bactive==false){
        bactive = true;
        currheight += 1;
        hv.innerHTML = height[currheight];
        bactive = false;
    }
});

hdec.addEventListener("click",()=>{
    if(currheight!=0 && bactive==false){
        bactive = true;
        currheight -= 1;
        hv.innerHTML = height[currheight];
        bactive = false;
    }
});

seth.addEventListener("click",()=>{
    if(MAX_HEIGHT==-1 && bactive==false){
        bactive = true;
        MAX_HEIGHT = hv.innerHTML;
        buildstack(MAX_HEIGHT);
        bactive = false;
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

function push(){
    bactive = true;
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
        bactive = false;
    },(level-firstEmpty+1)*500);
}
pushb.addEventListener("click",()=>{
    if(firstEmpty>MAX_HEIGHT && !bactive && MAX_HEIGHT!=-1)
        popup("warn","Stack is full!!");
    else if(!bactive && MAX_HEIGHT!=-1)
        push();
});

//Pop:
var popb = document.getElementById("ppm");
function pop(){
    bactive = true;
    firstEmpty-=1;
    let fltr =  document.getElementById("fltr");
    let rec=[];
    let time = 250;
    for(let i=firstEmpty;i<=MAX_HEIGHT;i++){
        rec[i] = document.getElementById(`r${i}`);
    }
    rec[firstEmpty].classList = "empty";
    for(let i=firstEmpty+1;i<=MAX_HEIGHT;i++){
        setTimeout(()=>{rec[i].classList = "full";},time);
        time+=250;
        setTimeout(()=>{rec[i].classList = "empty";},time);
        time+=250;
    }
    setTimeout(()=>{
        fltr.style.visibility = "visible";
        setTimeout(()=>{fltr.style.visibility = "hidden";},300);
        bactive = false;
    },500*(MAX_HEIGHT-firstEmpty)+250); 
    
}
popb.addEventListener("click",()=>{
    if(firstEmpty==1 && !bactive && MAX_HEIGHT!=-1)
        popup("warn","Stack is empty!!");
    else if(!bactive && MAX_HEIGHT!=-1)
        pop();
})

//isEmpty:
var iEb = document.getElementById("iEb");
iEb.addEventListener("click",()=>{
    if(!bactive && MAX_HEIGHT!=-1){
        bactive = true;
        if(firstEmpty == 1)
            popup("msg","isEmpty : true");
        else    
            popup("msg","isEmpty : false");
        bactive = false;
    }
});

//isFull:
var iFb = document.getElementById("iFb");
iFb.addEventListener("click",()=>{
    if(!bactive && MAX_HEIGHT!=-1){
        bactive = true;
        if(firstEmpty > MAX_HEIGHT)
            popup("msg","isFull : true");
        else    
            popup("msg","isFull : false");
        bactive = false;
    }
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




