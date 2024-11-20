<template>

<!-- TODO READ MORE ABOUT AUTH UTILS  https://nuxt.com/modules/auth-utils-->
<!--  https://eventuallymaking.io/2024/03/oauth-nuxt-->
  <div v-if="loggedIn">
    <h1>Welcome {{ user.login }}!</h1>
    <p>{{user}}</p>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>


</template>
<script setup lang="ts">

const { loggedIn, user, session, fetch, clear } = useUserSession()

// this page is protected
definePageMeta({
      middleware: 'auth',
    }
)

</script>