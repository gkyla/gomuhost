<template>
  <div id="wrapper" class="flex flex-col min-h-screen">
    <header class="text-white bg-[#E7F6F2] bg-opacity-50 backdrop-blur min-h-[40px]">
      <div class="container max-w-screen-xl mx-auto flex items-center p-3">
        <div id="logo">
          <span class="text-slate-900 text-2xl gomuhost-font">Gomuhost</span>
        </div>
        <nav class="ml-auto flex items-center">
          <NuxtLink to="#" class="text-slate-900 font-semibold block">Login</NuxtLink>
        </nav>
      </div>
    </header>

    <div id="hero-wrapper" class="bg-[#395B64]">
      <div class="container max-w-screen-xl mx-auto">
        <div id="hero" class="flex justify-center">
          <div id="hero-title-wrapper" class="my-40 text-center">
            <h1 class="text-8xl gomuhost-font text-white">Gomuhost</h1>
            <h2 class="gomuhost-font text-lg text-white">
              Play music from one host with a lot of commands
            </h2>
            <NuxtLink
              to="/login"
              class="inline-block px-5 py-2 rounded-full bg-[#2C3333] text-white mt-5 font-semibold"
              >Login</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>

    <div id="why-gomu" class="flex-1">
      <div
        id="why-gomu-wrapper"
        class="container mx-auto max-w-screen-xl grid grid-cols-3 gap-10 mt-10 raleway"
      >
        <div class="rounded-xl bg-[#2C3333] p-5 shadow-md">
          <h1 class="font-bold text-xl mb-2 text-white">Easy to use</h1>
          <p class="text-slate-300">
            want to play a music ? easy just type
            <span class="font-bold text-slate-200">!play &lt;link-of-music&gt;</span>,
            want to see what music is playing now? easy just type
            <span class="font-bold text-slate-200">!nowplaying</span>. Gomuhost commands
            are design to be to the point and easy to use
          </p>
        </div>
        <div class="rounded-xl bg-[#2C3333] p-5 shadow-md">
          <h1 class="font-bold text-xl mb-2 text-white">Just Like Chatting</h1>
          <p class="text-slate-300">
            Not just came to play music, but you can also chat with others in one room
            chat 🚀 might you have to tell your friend the music is kinda bad 😅 anyway,
            you can skip the music by using
            <span class="font-bold text-slate-200">!skip</span>
            command
          </p>
        </div>
        <div class="rounded-xl bg-[#2C3333] p-5 shadow-md">
          <h1 class="font-bold text-xl mb-2 text-white">And Many More</h1>
          <p class="text-slate-300">
            Your boss sudenly come and almost caught you listening to a music 😱? easy
            just use <span class="font-bold text-slate-200">!mute</span> command and
            <span class="font-bold text-slate-200">!unmute</span> after the boss go away
            😬
          </p>
        </div>
      </div>
    </div>

    <footer class="p-3 bg-[#2C3333]">
      <div
        class="container mx-auto max-w-screen-xl flex justify-between text-white raleway"
      >
        <span>Gomuhost 2023 &copy;</span>
        <a href="https://github.com/gkyla/gomuhost">Github</a>
      </div>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped></style>
