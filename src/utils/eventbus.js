import Vue from "vue"

// Vue的原型上有$bus方法
const EventBus = new Vue();
Object.defineProperties(Vue.prototype,{
    $bus:{
        get:function(){
            return EventBus
        }
    }
})
