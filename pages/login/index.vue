<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-[350px]">
      <h1 class="raleway text-3xl mb-5 font-bold">Welcome</h1>
      <form class="grid gap-5 rounded-lg w-full">
        <div class="grid">
          <label for="username" class="text-md font-semibold text-slate-500 mb-2"
            >Email</label
          >
          <input type="text" id="username" class="border px-4 py-2 rounded-lg" />
        </div>
        <div class="grid">
          <label for="password" class="text-md font-semibold text-slate-500 mb-2"
            >Password</label
          >
          <input type="password" id="username" class="border px-4 py-2 rounded-lg" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
