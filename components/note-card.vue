<template>

<div class=" border-2 rounded-xl p-2 border-gray-500  w-[60%] h-fit shadow-sm shadow-white hover:border-3 hover:border-blue-500 hover:scale-105
transition-all duration-300 cursor-pointer"
>

    <div class="flex flex-col h-full w-full">

        <div class="border-b border-gray-500 flex flex-row justify-between py-1" >

                <div class="font-bold outline-0 cursor-text w-[95%]" :contenteditable="editnote" @input="handleTitleChange($event)"
                >{{ props.title || "New Note"}} </div>
                
                 <div class="flex flex-row space-x-2">
                    <img v-if="!editnote" :src="modify" alt="update" class="w-6 cursor-pointer" @click="editable">
                    <img v-if="editnote" :src="complete" alt="complete" class="w-6 cursor-pointer" @click="completenote">
                    <img :src="delet" alt="delete" class="w-6 cursor-pointer" @click="trashNote(props.id)">
                </div>

        
        </div>

        <textarea class="border-b border-white/20 text-xl select-none mt-2 outline-0 bg-white/15"
        :readonly="!editnote" @input="handleContentChange($event)" :id="props.id" rows="4"
        >
            {{ props.content }}

        </textarea>

        <div class="flex flex-row text-xs pt-2">
            <div class="flex flex-2/3"></div>
            <div class="flex select-none" v-if="props.updated">
                {{ new Date(parseFloat(props.updated)).toUTCString() }}
            </div>
            <div class="flex select-none" v-else>
            {{  new Date(parseFloat(props.created)).toUTCString()  }}
            </div>
        </div>


    </div>

</div>

</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import modify from '../assets/modify.png'
import delet from '../assets/delete.png'
import complete from '../assets/complete.png'
import { updateNote, createNote, deleteNote, getNoteById } from '~/services/api';
import { select } from '#build/ui';

const props = defineProps<{
    id: Number | null,
    title: String,
    content: String,
    created: String,
    updated: String,
    newnote: Boolean
}>()

const editnote = ref(false)
const emit = defineEmits(['click', 'delete', 'complete'])


const newtitle = ref('')
const newcontent = ref('')
const updated = ref('')
const created = ref('')
const newid = ref()




onMounted(() => {
    if (!props.title)
        editnote.value = true

})

const editable = () => {
    editnote.value = true
}

const completenote = async () => {
    editnote.value = false

    if (props.newnote) {
        console.log("NEW")
        created.value = Date.now().toString()
        console.log(newtitle.value)
        console.log(newcontent.value)
        console.log(created.value)
        const response = await createNote(newtitle.value.toString(), newcontent.value.toString(), created.value.toString())
        console.log("RESPOMNSE: " + response)
        newid.value = response.id
        emit('complete')
        console.log("FINISH")

    } else {
        updated.value = Date.now().toString()
        const response = await updateNote(props.id, newtitle.value.toString() || props.title,  newcontent.value.toString(), updated.value.toString())
        emit('complete')
    }

}

const handleTitleChange = (event: Event) => {
   newtitle.value = event.target.textContent
}

const handleContentChange = (event: Event) => {
   newcontent.value = event.target.value
}

const trashNote = async (id: number) => {
    const response = await deleteNote(id)
    emit('delete')   
}




</script>