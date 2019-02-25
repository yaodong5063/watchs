function watchs(cb){
    this.cb=cb;
};
watchs.prototype={
    obj(){
        let _this=this;
        return new Proxy({}, {
            get(target, key, receiver) {
                //console.log(target, key, receiver,2);
                if(Array.isArray(target[key]) || Object.prototype.toString.call(target[key])=="[object Object]"){
                    _this.cb[key](target[key]);
                }
                return target[key];
                //return Reflect.get(target, key, receiver);
            },
            set(target, key, value, receiver) {
                //console.log(target, key, value, receiver,1);
                
                
                //console.log(_this.watch)
                target[key]=value;
                if(Reflect.has(_this.cb, key)){
                    
                    _this.cb[key](value);
                }
                return target[key];
                //return Reflect.set(target, key, value, receiver);
                
            }
        });
    },
    
};

let obj=new watchs({
    b(val){
        console.log(val);
    },
    c(val){
        console.log(val);
    },
    d(val){
       console.log(val);
    }
});
let c={a:1,b:2,c:[1,2,3]};
let a=Object.assign(obj.obj(),c);
// a.b=1;

a.d=4
//a.b=3;
// a.d={a:1,b:2};
// a.d.b=3;
// setTimeout(()=>{
//     a.d.c=2;
// },1000);
// a.d.c=3;

