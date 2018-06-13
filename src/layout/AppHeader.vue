<template>
    <nav class="navbar">
        <h2 class="navbar__brand">
            Astronauti
        </h2>
    </nav>
</template>
<style lang="less" scoped>
    .navbar {
        grid-area: navbar;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        background: var(--primary);
        &__brand{
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05rem;
            color: var(--white);
        }
    }
</style>
