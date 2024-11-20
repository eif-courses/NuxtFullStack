<template>
  <div v-if="!loggedIn">
    <main >
      <a href="/api/auth/google" type="button">
        Sign in with Google
      </a>
    </main>
  </div>
</template>
<script setup lang="ts">

const { loggedIn } = useUserSession()

if (loggedIn.value) {
  navigateTo('/')
}
</script>