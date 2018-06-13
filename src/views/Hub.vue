<template>
    <main class="hub-grid" role="main">
        <section role="region" class="astronaut-table">
            <AstronautTable></AstronautTable>
        </section>
        <section role="region" class="add-astronaut-section">
            <button class="add-button" @click="toggleAddAstronaut">
                +
            </button>
            <AddAstronaut id="add-astronaut"></AddAstronaut>
        </section>
    </main>
</template>
<script>
import AstronautTable from '@/components/AstronautTable.vue'
import AddAstronaut from '@/components/AddAstronaut.vue'
export default {
  components: {
    AstronautTable,
    AddAstronaut
  },
  methods: {
    toggleAddAstronaut () {
      document.getElementById('add-astronaut').classList.toggle('active')
    }
  }
}
</script>
<style lang="less" scoped>
    @import '../assets/css/breakpoints.less';
    @media (max-width: @xl) {
        section.add-astronaut-section{
            position: fixed;
            top: 10vh;
            right: 0;
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
        }
        main.hub-grid{
            grid-template-columns: 1fr;
            grid-template-areas: " astronaut-table ";
        }
        button.add-button{
            display: flex;
        }
        #add-astronaut{
            display: none;
            &.active{
                display: block;
            }
        }

    }
    @media (max-width: @md) {
        main.hub-grid{
            padding: 0;
        }
    }
    .hub-grid{
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto;
        grid-gap: 1rem 1rem;
        padding: 1rem 3%;
        grid-template-areas: " astronaut-table add-astronaut ";
    }
    .astronaut-table{
        grid-area: astronaut-table;
    }
    .add-astronaut-section{
        grid-area: add-astronaut;
    }
    .add-button {
        height: 4rem;
        width: 4rem;
        display: none;
        justify-content: center;
        align-content: center;
        border: 0;
        font-size: 2rem;
        color: var(--white);
        background: var(--primary);
        cursor: pointer;
    }
</style>
