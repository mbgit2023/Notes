<template>

    <div class="flex flex-row w-full">
        <div class="flex flex-row w-[5%]">logo</div>
        <div class="w-[90%] bg-transparent text-green-600 border-b border-[#596c53] text-center rounded-lg p-2 m-2 text-4xl max-md:text-md">My Notes</div>
        <div class="w-[10%] flex flex-col items-center justify-center border-2 border-white/15 rounded-4xl" v-if="currentUser">
            <img :src="userprofile" alt="" class="w-6 cursor-pointer max-md:w-4" @click="clicked = !clicked">
            <span class="text-white text-xs max-md:hidden" :ref="currentUser" :value="currentUser">{{  currentUser }}</span>
            <span value="Logout" class="text-blue-500 text-xs cursor-pointer font-bold" @click="logoutUser">Logout</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import userprofile from '../assets/user.png'

const currentUser = ref()
const clicked = ref(false)


onMounted(() => {
    currentUser.value = localStorage.getItem('user')
})

const logoutUser = () => {
    localStorage.removeItem('user')
    window.location.reload()
}

</script>