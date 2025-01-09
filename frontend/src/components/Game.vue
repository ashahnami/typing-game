<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const quote = ref([]);
const correct = ref([]);
const index = ref(0);

function handleKeyPress(event) {
    console.log(event.key);

    if (event.key === quote[index]) {
        correct.value[index] = true;
    } else {
        correct.value[index] = false;
    }
    index.value++;
}

onMounted(async () => {
    try {
        const response = await axios.get('/api/quote');
        quote.value = response.data.split('');
        correct.value = new Array(quote.value.length).fill(false);

        window.addEventListener('keydown', handleKeyPress)
    } catch (error) {
        console.log('Error fetching quote');
    }
})
</script>

<template>
    <span :class="{ 'correct': correct[index], 'incorrect': !correct[index] }"
        v-for="(c, index) in quote">
      {{ c }}
    </span>
</template>

<style scoped>
.correct {
    color: green;
}

.incorrect {
    color: red;
}
</style>