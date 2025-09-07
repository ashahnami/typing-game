<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";

const name = ref<string>('');
const isLoggedIn = ref<boolean>(false);

function logout() {
  axios.post('api/auth/logout', {}, {withCredentials: true})
    .then(response => {
      console.log('Logged out successfully:', response);
      isLoggedIn.value = false;
      window.location.href = '/'; // Redirect to home or login page after logout
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
}

onMounted(() => {
    axios.get('/api/auth/status', {withCredentials: true})
      .then(response => {
        name.value = response.data.name['givenName']
        isLoggedIn.value = true;
      })
      .catch(error => {
        console.error('Error fetching auth status:', error);
      });
})

</script>

<template>
    <nav>
      <div class="nav-layout">
        <RouterLink to="/" class="link">Home</RouterLink>

        <div class="profile" v-if="isLoggedIn">
          {{ name }}
          <div class="button" @click="logout">Log out</div>
        </div>

        <a class="button" href="/api/auth/login" v-if="!isLoggedIn">Login</a>
      </div>
    </nav>
</template>

<style scoped>
nav {
  width: 100%;
  background-color: #7300ff;
}

.nav-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
    align-items: center;
    max-width: 1200px;
    margin: auto;
}

nav .link {
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    padding: 2px;
}

nav .link:hover {
  text-decoration: underline;
}

nav .button {
  background-color: #8CFF00;
  border-radius: 4px;
  padding: 6px;
  text-decoration: none;
}

nav .button:hover {
  background-color: #7ee600;
  cursor: pointer;
}
</style>
