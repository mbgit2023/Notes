<template>

<div class="flex flex-col border-2 border-white/20 rounded-2xl shadow-3xl items-center mt-12
bg-gradient-to-b from-black to-green-900 w-[500px] h-[600px]" >

<span class="text-blue-500 text-xl font-bold m-6" v-if="isLogginIn">Login to keep your notes</span>
<span class="text-blue-500 text-xl font-bold m-6" v-if="isRegistering">Register and keep your notes</span>


    <form class=" text-white flex flex-col  justify-center space-y-4" @submit.prevent="loginUser">
        <label for="email" class="font-bold">Email</label>
        <input type="email" v-model="email" @input="handleEmailInput" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">
        <label for="password" class="font-bold">Password</label>
        <input type="password" v-model="password" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">
        <label for="confirm" class="font-bold" v-if="isRegistering">Confirm password</label>
        <input type="password" v-model="confirmpassword" @input="handlePasswordMatch" v-if="isRegistering" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">

        <span class="text-red-500 text-sm " :ref="noMatch" v-if="noMatch">Password don't match</span>
        <span class="text-red-500 font-bold border-2 border-red-800 rounded-2xl text-center" :ref="userNotFound" v-if="userNotFound && isLogginIn">User not found</span>
        <span class="text-blue-500 font-bold border-2 border-blue-500 rounded-2xl text-sm p-2 text-center" v-if="alreadyRegistered && isRegistering">User already registered, <br> please login</span>

        <input type="submit" name="" id="" value="Login" v-if="isLogginIn"
            class="bg-gradient-to-r from-green-700 to-green-400 border-2 border-white/30 rounded-lg px-4 mt-6
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-700 cursor-pointer w-[200px]">
        
        <input type="submit" name="" id="" value="Register" v-if="isRegistering"
            class="bg-gradient-to-r from-green-700 to-green-400 border-2 border-white/30 rounded-lg px-4 mt-6
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-700 cursor-pointer w-[200px]">
        


    </form>

    <span class="text-white/30 mt-6 mb-2 hover:text-white cursor-pointer" v-if="isLogginIn" @click="isRegistering=true; isLogginIn=false">Register to access your notes</span>
    <span class="text-white/30 mt-6 mb-2 hover:text-white cursor-pointer" v-if="isRegistering" @click="isRegistering=false; isLogginIn=true">Switch to Login</span>


</div>

</template>

<script setup lang="ts"> 

import { login, register } from '~/services/api'

const email = ref()
const password = ref()
const confirmpassword = ref()
const noMatch = ref(false)
const userNotFound = ref()
const alreadyRegistered = ref()
const isLogginIn = ref(true)
const isRegistering = ref()



const loginUser = async () => {
    if (isLogginIn.value) {
        if (email.value && password.value) {
            const response = await login(email.value, password.value)
            if (response.user) {
                localStorage.setItem('user',email.value)
                window.location.reload()
            }
            else if (response.error === 'User not found')
                userNotFound.value = true
        }
    } else if (isRegistering.value) {
        if (email.value && password.value && confirmpassword.value){
        const response = await register(email.value, password.value)
        if (response.user) {
            localStorage.setItem('user', email.value)
            window.location.reload()
        }
        else if (response.error === 'User already registered')
            alreadyRegistered.value = true
        }
    }
}

const handlePasswordMatch = () => {
    if (confirmpassword.value !== '')
        if (password.value !== confirmpassword.value)
            noMatch.value = true
        else
            noMatch.value = false
}


</script>