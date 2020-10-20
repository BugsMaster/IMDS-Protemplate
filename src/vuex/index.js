import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {      
    chartColor:['#9fd0f5','#ef9379', '#fad665', '#4c8bf5', '#47e1ac', '#e0abf9', '#afb3f9', '#ffafbe', '#59caf8','#e83c3d','#d800ff','#545c64'],
    userTypeMenu:[],
    rolePermission:[],
    XRayStateData:[],
    eqpType:{},
    XRayCommStat:{value:0},
    XRayErrorData:[],
    isLogin:false,
    userData:{},
    systemData:{},
    deviceMessageCount:[],
    deviceBagageCount:{},
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})


