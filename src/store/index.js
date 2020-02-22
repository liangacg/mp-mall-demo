import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({  
    state: {
        navarr: [
            {title:'首页',icon:'locked',url:'../index/index'},
            {title:'分类',icon:'checkbox',url:'../class/class'},
            {title:'购物车',icon:'camera',url:'../cart/cart'},
            {title:'我',icon:'camera',url:'../my/my'}],
        tabGood:[],
        refresh: false,
        userData:{}
    },

    getters:{
        systemInfo:()=>{
            let d 
            uni.getSystemInfo({
                success(res){
                    d = res
                },
                fail(){
                    d = '获取失败'
                }
            })
            return d
        }
    },
    mutations: {
        getData(state){
            console.log('开始获取商品列表')
            wx.cloud.init()
            state.tabGood = []
            let table = wx.cloud.database().collection('mall-good')
            table.where({type:'A'}).get().then(res=>{
                state.tabGood.push(
                    {
                        title:'全部',
                        introduce:'猜你喜欢',
                        type:1,
                        good:res.data
                    }
                )
            })
            table.where({type:'B'}).get().then(res=>{
                state.tabGood.push(
                    {
                        title:'直播',
                        introduce:'万象初始',
                        type:2,
                        good:res.data
                    }
                )
            })
            table.where({type:'C'}).get().then(res=>{
                state.tabGood.push(
                    {
                        title:'便宜好货',
                        introduce:'宅家抢购',
                        type:3,
                        good:res.data
                    }
                )
            })
            table.where({type:'D'}).get().then(res=>{
                state.tabGood.push(
                    {
                        title:'洋淘',
                        introduce:'买家秀',
                        type:4,
                        good:res.data
                    }
                )
            })
            console.log('获取商品列表成功')
        },
        addData(state){
            wx.cloud.init()
            let db = wx.cloud.database()
            for(var i=1;i<10;i++){
                db.collection('mall-good').add({
                    data:{
                        name: '商品名字0'+ i + 'C',
                        img:'../static/logo.png',
                        price: Math.floor(Math.random()*100*i),
                        num: Math.ceil(Math.random()*10*i),
                        type: 'D'
                    }
                }).then(res=>{
                    console.log('商品添加成功')
                })
            }
        },
        login(state){
            wx.cloud.init()
            let list = wx.cloud.database().collection('mall-users')
            uni.login({
                success(res){
                    uni.getUserInfo({
                        success(res){
                            console.log('获取用户信息')
                            let userInfo = res.userInfo
                            list.where({_openid:userInfo.openid}).get({
                                success(res){
                                    if(res.data[0]){
                                        state.userData = res.data[0]
                                        console.log(state.userData)
                                    }else{
                                        console.log('失败')
                                        list.add({
                                            data:{
                                                name: userInfo.nickName,
                                                gender: userInfo.gender,
                                                avatarUrl: userInfo.avatarUrl,
                                            }
                                        })
                                        uni.reLaunch({url:'my'})
                                    }
                                }
                            })
                        }
                    })
                }
            })
        },
        toRefresh(state){
            state.refresh = false
        }
    }  
})

export default store