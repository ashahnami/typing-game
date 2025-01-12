<template>
    <div class="layout">
        <slot />
    </div>
</template>

<style scoped>
.layout {
    display: grid;
    height: 100%;
    grid-template-rows: auto 1fr;
    align-items: center;
    padding: 2rem;
}
</style>