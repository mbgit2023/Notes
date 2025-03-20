<template>

<div class="flex flex-col border-2 border-white/20 rounded-2xl shadow-3xl items-center mt-12
bg-gradient-to-b from-black to-green-900 w-[500px] h-[600px] max-md:mt-6 max-md:w-[300px] max-md:h-[450px]" >

<span class="text-blue-500 text-xl font-bold m-6 max-md:text-sm" v-if="isLogginIn">Login to keep your notes</span>
<span class="text-blue-500 text-xl font-bold m-6 max-md:text-sm" v-if="isRegistering">Register and keep your notes</span>


    <form class=" text-white flex flex-col  justify-center space-y-4" @submit.prevent="loginUser">
        <label for="email" class="font-bold max-md:text-sm">Email</label>
        <input type="email" v-model="email" @input="handleEmailInput" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">
        <label for="password" class="font-bold max-md:text-sm">Password</label>
        <input type="password" v-model="password" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">
        <label for="confirm" class="font-bold max-md:text-sm" v-if="isRegistering">Confirm password</label>
        <input type="password" v-model="confirmpassword" @input="handlePasswordMatch" v-if="isRegistering" class="w-[200px] border-2 border-white/20 rounded-lg" autocomplete="true">

        <span class="text-red-500 text-sm " :ref="noMatch" v-if="noMatch">Password don't match</span>
        <span class="text-red-500 font-bold rounded-2xl text-center max-md:text-xs" :ref="userNotFound" v-if="userNotFound && isLogginIn">User not found</span>
        <span class="text-blue-500 font-bold rounded-2xl text-sm p-2 text-center max-md:text-xs" v-if="alreadyRegistered && isRegistering">User already registered, <br> please login</span>
        <span class="text-red-500 font-bold rounded-2xl text-center max-md:text-xs" :ref="allField" v-if="allField && isRegistering">Please fill all the fields</span>


        <input type="submit" name="" id="" value="Login" v-if="isLogginIn"
            class="bg-gradient-to-r from-green-700 to-green-400 border-2 border-white/30 rounded-lg px-4 mt-6 
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-700 cursor-pointer w-[200px] max-md:text-sm max-md:mt-2" >
        
        <input type="submit" name="" id="" value="Register" v-if="isRegistering"
            class="bg-gradient-to-r from-green-700 to-green-400 border-2 border-white/30 rounded-lg px-4 mt-6
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-700 cursor-pointer w-[200px] max-md:text-sm max-md:mt-2">
        


    </form>

    <span class="text-white/30 mt-6 mb-2 hover:text-white cursor-pointer max-md:text-sm" v-if="isLogginIn" @click="isRegistering=true; isLogginIn=false">Register to access your notes</span>
    <span class="text-white/30 mt-6 mb-2 hover:text-white cursor-pointer max-md:text-sm" v-if="isRegistering" @click="isRegistering=false; isLogginIn=true">Switch to Login</span>


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
const allField = ref(false)



const loginUser = async () => {
    if (isLogginIn.value) {
        if (email.value && password.value) {
            const response = await login(email.value, password.value)
            if (response.user) {
                localStorage.setItem('user',email.value)
                localStorage.setItem('id', response.id)
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
                localStorage.setItem('id', response.id)
                window.location.reload()
            }
            else if (response.error === 'User already registered')
                alreadyRegistered.value = true
        } else {
            allField.value = true
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