<template>
    <div class="login-page">
        <div class="container demo-2">
            <div class="content">
                <div id="large-header" class="large-header">
                    <canvas id="demo-canvas"></canvas>
                    <div class="login-div flexC">
                        <div class="logo flexC">
                            <img src="../../assets/main/logo-dark.png" alt="">
                            <span>{{ title }}</span>
                        </div>
                        <Form v-if="isLogin" ref="formValidate1" class="login-from" :model="loginJson" :rules="loginCheck">
                            <FormItem prop="username">
                                <Input prefix="ios-person-outline" type="text" v-model="loginJson.username" autofocus
                                    clearable placeholder="请输入用户名" />
                            </FormItem>
                            <FormItem prop="password">
                                <Input prefix="ios-lock-outline" type="password" v-model="loginJson.password" clearable
                                    placeholder="请输入密码" />
                            </FormItem>
                            <FormItem prop="isSave" class="isSave flexR">
                                <Checkbox v-model="loginJson.isSave">自动登录</Checkbox>
                                <span class="blueText">忘记密码</span>
                            </FormItem>
                            <FormItem prop="isSave" class="isSave other-Login flexR">
                                <span>
                                    <span>其它登录方式</span>
                                    <img src="../../assets/login/weixin.svg" alt="">
                                    <img src="../../assets/login/qq.svg" alt="">
                                    <img src="../../assets/login/weibo.svg" alt="">
                                </span>
                                <span class="blueText" @click="isLogin = false">注册账户</span>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" long :loading="loading" @click="login">
                                    <span v-if="!loading">登录</span>
                                    <span v-else>请稍后...</span>
                                </Button>
                            </FormItem>
                        </Form>
                        <Form v-else ref="formValidate2" class="login-from" :model="registerJson" :rules="registerCheck">
                            <FormItem prop="mail">
                                <Input prefix="ios-mail-outline" type="text" v-model="registerJson.mail" autofocus clearable
                                    placeholder="请输入邮箱" />
                            </FormItem>
                            <FormItem prop="userName">
                                <Input prefix="ios-person-outline" type="text" v-model="registerJson.userName" clearable
                                    placeholder="请输入用户名" />
                            </FormItem>
                            <FormItem prop="passWord">
                                <Input prefix="ios-lock-outline" type="password" v-model="registerJson.passWord" clearable
                                    placeholder="至少6位密码，区分大小写" />
                            </FormItem>
                            <FormItem prop="passWord1">
                                <Input prefix="ios-lock-outline" type="password" v-model="registerJson.passWord1" clearable
                                    placeholder="请再次输入密码" />
                            </FormItem>
                            <!-- <FormItem prop="isSave" class="isSave flexR">
                                <Checkbox v-model="registerJson.isSave">自动登录</Checkbox>
                                <span class="blueText">忘记密码</span>
                            </FormItem>-->

                            <FormItem>
                                <Button type="primary" long :loading="loading" @click="login">
                                    <span v-if="!loading">注册</span>
                                    <span v-else>请稍后...</span>
                                </Button>
                            </FormItem>
                            <FormItem prop="isSave" class="flexR">
                                <span class="blueText" @click="isLogin = true">使用已有账户登录</span>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { siteTitle, indexPage } from "@/config/config"
import { ref, reactive, onMounted, getCurrentInstance } from "vue"
import { useStore } from 'vuex'
import { useRoute, useRouter } from "vue-router"
const store = useStore()
const router = useRouter()
const title = ref(siteTitle)
const loading = ref(false)
const isLogin = ref(true)
const loginJson = reactive({
    username: '',
    password: '',
    isSave: true
})
const registerJson = reactive({
    username: '',
    password: '',
    isSave: true
})
const loginCheck = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
const registerCheck = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
onMounted(() => {
    bgInit()
})

const formValidate1 = ref(null)
// 登陆
const login = () => {
    formValidate1.value.validate((valid) => {
        const that = getCurrentInstance()
        if (valid) {
            loading.value = true
            store.dispatch('user/login', loginJson).then(() => {
                loading.value = false
                that.$Message.success('正常登录成功')
                router.push({
                    name: indexPage
                })
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 背景canvas动画
const bgInit = () => {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
    // sta
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
    // end

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: 0, y: height };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
            // console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fill();
        };
    }
}
</script>


<style lang="less">
.login-page {
    /* Header */

    .large-header {
        position: relative;
        width: 100%;
        background: #333;
        overflow: hidden;
        background-size: cover;
        background-position: center center;
        z-index: 1;
    }

    .demo-2 .large-header {
        background-image: url('../../assets/login/login-bg-3.jpg');
        background-position: center bottom;
    }

    .login-div {
        position: absolute;
        margin-top: -220px;
        padding: 30px;
        text-align: center;
        top: 50%;
        left: 60%;
        background-color: white;
        border-radius: 5px;
        width: 410px;

        &>.logo {
            img {
                height: 90px;
            }

            span {
                font-size: 14px;
                margin-bottom: 20px;
            }
        }

        &>.login-from {
            .isSave {
                width: 100%;

                .ivu-form-item-content {
                    width: 100%;
                    display: inline-flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
            }

            .other-Login {
                .ivu-form-item-content {
                    &>span {
                        img {
                            width: 24px;
                            margin-left: 16px;
                            cursor: pointer;
                            vertical-align: middle;
                            opacity: .7;
                            transition: all .2s ease-in-out;
                        }
                    }

                }
            }
        }
    }

    /*.demo-2 ::before {
            content: '';
            width: 20vw;
            height: 20vw;
            min-width: 3.5em;
            min-height: 3.5em;
            background: url(../../assets/login/deco.svg) no-repeat center center;
            background-size: cover;
            position: absolute;
            top: 50%;
            left: 20%;
            border-radius: 50%;
            z-index: -1;
            -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
        }*/
}
</style>
