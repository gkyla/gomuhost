<template>
  <!-- eslint-disable -->

  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-[350px]">
      <h1 class="raleway text-3xl mb-5 font-bold text-black text-center">hi, welcome!</h1>
      <form @submit.prevent="loginAccount" class="grid gap-5 rounded-lg w-full">
        <div class="grid">
          <label for="username" class="text-md font-semibold text-slate-600 mb-2"
            >Email</label
          >
          <input
            type="text"
            id="username"
            class="border-2 px-4 py-2 rounded-lg raleway"
          />
        </div>
        <div class="grid">
          <label for="password" class="text-md font-semibold text-slate-600 mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="border-2 px-4 py-2 rounded-lg raleway"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-3 font-semibold bg-red-500 rounded-xl text-white"
        >
          Login
        </button>
      </form>
    </div>

    <div
      class="mt-10 raleway text-slate-800 p-2 rounded-xl font-semibold grid place-items-center"
    >
      <p>currently not available for public</p>
      <div class="w-5 bg-black h-1 rounded-full mt-1"></div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const router = useRouter()

function loginAccount () {
  router.push('/')
}
</script>

<style scoped></style>
