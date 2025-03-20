
<template>
  <div class="bg-gradient-to-b from-black via-black to-[#596c53] h-screen w-full flex flex-col items-center p-4 flex-1 ">
    <Header />
    <div v-if="isLoggedIn" class="flex flex-row bg-transparent items-start justify-between h-full w-full">
        <List  class="mx-6 my-2 justify-center w-full"/>
    </div>

    <div v-else class="flex flex-col bg-transparent items-center justify-center w-[400px] h-[500px]">
      <Login class="mx-6 my-2 justify-center w-full" />
    </div>

  </div>
</template>


<script setup lang="ts">

  const isLoggedIn = ref(false)
  const currentUser = ref() 
  const currentUserId = ref()

  provide('currentUserId', currentUserId)

  onMounted(() => {
    currentUser.value = localStorage.getItem('user') 
    if (currentUser.value) {
      isLoggedIn.value = true
      currentUserId.value = localStorage.getItem('id')
    }
  })

</script>

