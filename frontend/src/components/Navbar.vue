<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, logout } = useAuth0();

function signOut () {
    logout({ logoutParams: { returnTo: window.location.origin } });
}

</script>

<template>
    <nav>
        <RouterLink to="/" class="link">Home</RouterLink>
        <RouterLink to="/login" class="link" v-if="!isAuthenticated">Login</RouterLink>

        <div class="profile" v-if="isAuthenticated">
            <div @click="signOut">Log out</div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    gap: 1em;
    align-items: center;
}

nav .link {
    font-size: 1.2rem;
    color: lightgrey;
    text-decoration: none;
    padding: 2px;
}

nav .link:hover {
    color: white;
}
</style>