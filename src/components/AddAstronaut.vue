<template>
    <div class="card">
        <h2 class="card__heading">
            Přidat nového
        </h2>
        <form class="form">
            <div class="form__group">
                <label for="nameInput" class="label">
                    Jméno:
                </label>
                <input name="name" v-model="fname"
                       v-validate="{ required: true, alpha: true }"
                       class="input"
                       type="text"
                       id="nameInput"
                       placeholder="Astronautovo jméno..." />
            </div>
            <div class="form__group">
                <label for="surnameInput" class="label">
                    Přijmení:
                </label>
                <input name="surname"
                       v-model="lname"
                       v-validate="{ required: true, alpha: true }"
                       class="input"
                       type="text"
                       id="surnameInput"
                       placeholder="Astronautovo přijmení..." />
            </div>
            <div class="form__group">
                <label for="birthdayInput" class="label">
                    Datum narození:
                </label>
                <div id="birthdayInput">
                    <input v-model="birthday.day"
                           name="bday"
                           class="input"
                           type="number"
                           placeholder="1" />
                    <input v-model="birthday.month"
                           name="bmonth"
                           class="input"
                           type="number"
                           placeholder="1" />
                    <input name="byear"
                           v-model="birthday.year"
                           class="input"
                           type="number"
                           placeholder="1970" />
                </div>
            </div>
            <div class="form__group">
                <label for="superInput" class="label">
                    Superschopnost:
                </label>
                <input v-model="superab"
                       maxlenght="50"
                       class="input"
                       type="text"
                       id="superInput"
                       placeholder="Astronautova superschopnost..." />
            </div>
            <button class="button add-new" @click.prevent="addNew">
                Přidat
            </button>
        </form>
        <div class="error" v-show="showErrors" v-for="(error) in errors.items" :key="error.id">
            {{error.msg}}
        </div>
    </div>
</template>
<script>
import mutations from '@/mutations'
import queries from '@/queries'
export default {
  data () {
    return {
      fname: '',
      lname: '',
      birthday: {
        day: '',
        month: '',
        year: ''
      },
      superab: '',
      showErrors: false
    }
  },
  methods: {
    prefactorBirthday () {
      const d = ('0' + this.birthday.day).slice(0, 2)
      const m = ('0' + this.birthday.month).slice(0, 2)
      return `${this.birthday.year}-${d}-${m}`
    },
    setupVariables () {
      const fname = this.fname
      const lname = this.lname
      const birthday = this.prefactorBirthday()
      const superab = this.superab

      this.fname = ''
      this.lname = ''
      this.birthday = ''
      this.superab = ''

      const variables = {
        fname,
        lname,
        birthday,
        super: superab
      }

      return variables
    },
    restoreVariables (variables) {
      this.fname = variables.fname
      this.lname = variables.lname
      this.birthday = {
        day: new Date(variables.birthday).getDate(),
        month: new Date(variables.birthday).getMonth() + 1,
        year: new Date(variables.birthday).getFullYear()
      }
      this.superab = variables.super
    },
    addNew () {
      const variables = this.setupVariables()
      console.log(variables.fname)
      if (this.errors.items.length === 0) {
        this.$apollo.mutate({
          mutation: mutations.CREATE_ASTRONAUT,
          variables: variables,
          update: (store, { data: { createAstronaut } } ) => {
            const data = store.readQuery({ query: queries.ALL_ASTRONAUTS })
            data.astronauts.push(createAstronaut)
            store.writeQuery({
              query: queries.ALL_ASTRONAUTS,
              data
            })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createAstronaut: {
              __typename: 'Astronaut',
              _id: '123',
              fname: variables.fname,
              lname: variables.lname,
              birthday: variables.birthday,
              super: variables.super
            }
          }
        }).catch(err => {
          console.log(err)
          this.restoreVariables(variables)
        })
        this.showErrors = false
      } else {
        this.restoreVariables(variables)
        this.showErrors = true
      }
    }
  }
}
</script>
<style lang="less">
    .add-new{
        margin-left: 1rem;
    }
    .error {
        margin-left: 1rem;
    }
</style>
