<template>

    <div class="flex flex-col text-2xl text-green-600 h-screen justify-start items-center pt-6 space-y-4 overflow-auto " >

        <div class="rounded-2xl h-12 flex flex-row space-x-2 justify-between  w-[60%] ">

            <div class="flex flex-row  space-x-4" >
                <img :src="addnote" alt="add note" class="w-12 border border-white/45 rounded-lg cursor-pointer p-2 hover:bg-green-900 hover:scale-125" 
                @click="newNote" >
                <img :src="sortup" alt="sort note" class="w-12 border border-white/45 rounded-lg cursor-pointer hover:bg-green-900 hover:scale-125" @click="sortnotes" 
                    :class="desc ? 'rotate-180' : ''"
                >
            </div>

            <div class="flex flex-row ">
                <input type="text" @input="handleInput($event)" v-model="searchdata" placeholder="search.." 
                class="outline-0 border-2 border-white/25 rounded-3xl w-[400px] px-3">
            </div>

            <div class="flex flex-row">
            
            </div>

        </div>

        <noteCard v-if="newnot" :title="newtitle" content="" :created="newdate" updated="" :newnote="true" @complete="updateList"></noteCard>


        <div v-if="!searchdata || searchdata === '' || searchdata === null || searchdata === undefined" class="w-full items-center justify-center flex flex-col space-y-4">
            <div v-for="note in notes" class="w-full items-center justify-center flex flex-row" @click="newNoteSelected(note)">
                <noteCard :id="note.id"  :title="note.title" :content="note.content" :created="note.createdAt" :updated="note.updatedAt"
                @delete="updateList" @complete="updateList" >
                </noteCard>
            </div>
        </div>

        <div v-else class="w-full items-center justify-center flex flex-col space-y-4">
            <div v-for="note in notes.filter((not) => not.title.toLowerCase().includes(searchdata.toLowerCase()) || not.content?.includes(searchdata))" 
                class="w-full items-center justify-center flex flex-row"  @click="newNoteSelected(note)"   >
                <noteCard :id="note.id"  :title="note.title" :content="note.content" :created="note.createdAt" :updated="note.updatedAt"
                @delete="updateList" @complete="updateList" ></noteCard>
            
            </div>
        </div>


    </div>



</template>


<script setup lang="ts">

import { onMounted } from 'vue';
import { getNotes } from '~/services/api';
import type { Note } from '~/models/note';
import noteCard from './note-card.vue';
import addnote from '../assets/addnote.png'
import sortup from '../assets/sortup.png'
import { getNoteById } from '~/services/api';


const notes = ref<Note[]>([])
const newnot = ref(false)
const newtitle = ref('')
const newdate = ref()

const noteSelected = ref()

const searchdata = ref('')
const desc = ref(false)
    

onMounted(() => {
    getNotesList()
})

const newNote = async () => {
  newnot.value = true
  const datenow = Date.now()
  newdate.value = datenow
}

 const updateList = async () => {
    newnot.value = false
    await getNotesList()
 }

 const getNotesList = async () => {
    const data = await getNotes()
    notes.value = data

 }

 const handleInput = () => {
    console.log(searchdata.value)
 }

 const sortnotes = () => {
    desc.value = !desc.value
    notes.value = notes.value.sort((a, b) => { return new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1 } )
 }

 const newNoteSelected = async (note: Note) => {
    
    console.log("NOTE: " + note)
   const data = await getNoteById(note.id)
    noteSelected.value = data[0]
    console.log(noteSelected)
}






</script>