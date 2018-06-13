<template>
    <div class="card">
        <h2 class="card__heading">List</h2>
        <table class="table">
            <thead>
                <tr>
                    <th id="fnameSort" @click="sortAstronautsBy('fname')">
                        First Name
                    </th>
                    <th id="lnameSort" @click="sortAstronautsBy('lname')">
                        Last Name
                    </th>
                    <th id="birthdaySort" @click="sortAstronautsBy('birthday')">
                        Birthday
                    </th>
                    <th id="superSort" @click="sortAstronautsBy('super')">
                        Super Abilities
                    </th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <Astronaut v-for="(astronaut, index) in astronauts" :key="index" :astronaut="astronaut" :index="index"></Astronaut>
            </tbody>
        </table>
    </div>
</template>
<style lang="less">
    @import '../assets/css/breakpoints.less';
    @media (max-width: @lg) {
    }
    th:not(&:last-child){
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
    th.sort::after{
        font-family: FontAwesome;
        content: '\f078';
    }
</style>
<script>
import queries from '@/queries'

import Astronaut from '@/components/Astronaut.vue'

export default {
  components: {
    Astronaut
  },
  data () {
    return {
      astronauts: []
    }
  },
  apollo: {
    astronauts: {
      query: queries.ALL_ASTRONAUTS
    }
  },
  mounted () {
    this.sortAstronautsBy('fname')
  },
  methods: {
    manageDOM (sort) {
      let arrowToggled = document.getElementsByClassName('sort')[0]
      if (arrowToggled) {
        arrowToggled.classList.remove('sort')
      }
      document.getElementById(sort + 'Sort').classList.add('sort')
    },
    sortAstronautsBy (arg) {
      let astronauts = [...this.astronauts]
      switch (arg) {
        case 'fname':
          this.astronauts = astronauts.sort((a, b) => {
            if (a.fname < b.fname) return -1
            if (a.fname > b.fname) return 1
            return 0
          })
          break
        case 'lname':
          this.astronauts = astronauts.sort((a, b) => {
            if (a.lname < b.lname) return -1
            if (a.lname > b.lname) return 1
            return 0
          })
          break
        case 'birthday':
          this.astronauts = astronauts.sort((a, b) => {
            if (new Date(a.birthday) < new Date(b.birthday)) return -1
            if (new Date(a.birthday) > new Date(b.birthday)) return 1
            return 0
          })
          break
        case 'super':
          this.astronauts = astronauts.sort((a, b) => {
            if (a.super < b.super) return -1
            if (a.super > b.super) return 1
            return 0
          })
          break;
        default:
          break;
      }
      this.manageDOM(arg)
    }
  }
}
</script>
