<template>
    <tr>
        <td class="editable">
            {{astronaut.fname}}
        </td>
        <td class="editable">
            {{astronaut.lname}}
        </td>
        <td class="editable">
            {{astronaut.birthday | formateBirthday}}
        </td>
        <td class="editable">
            {{astronaut.super}}
        </td>
        <td class="button-inside">
            <button class="button button--no-border" @click.prevent="editData">
                <i class="fas fa-save" v-if="isEditting"></i>
                <i class="fas fa-edit" v-else></i>
            </button>
        </td>
        <td class="button-inside">
            <button class="button button--delete button--no-border" @click.prevent="deleteAstronaut()">
                <i class="fas fa-times"></i>
            </button>
        </td>
    </tr>
</template>
<script>
import queries from '@/queries'
import mutations from '@/mutations'
export default {
  props: [
    'astronaut',
    'index'
  ],
  data () {
    return {
      isEditting: false,
      changed: {
        fname: '',
        lname: '',
        birthday: '',
        super: ''
      }
    }
  },
  filters: {
    formateBirthday (value) {
      const date = new Date(value)
      return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
    }
  },
  methods: {
    deleteAstronaut () {
      const id = this.astronaut._id
      this.$apollo.mutate({
        mutation: mutations.DELETE_ASTRONAUT,
        variables: {
          id
        },
        update: (store) => {
          const data = store.readQuery({ query: queries.ALL_ASTRONAUTS })
          let index = data.astronauts.findIndex(astronaut => astronaut._id === id)
          data.astronauts.splice(index, 1)
          store.writeQuery({
            query: queries.ALL_ASTRONAUTS,
            data
          })
        }
      })
    },
    editData () {
      let tds = document.getElementsByClassName('editable')
      tds = Array.from(tds).splice(this.index * 4, 4)

      if (this.isEditting) {
        this.changed.fname = tds[0].textContent
        this.changed.lname = tds[1].textContent
        this.changed.birthday = tds[2].textContent
        this.changed.super = tds[3].textContent

        console.log(this.changed)

        tds.forEach(el => {
          el.setAttribute('contenteditable', 'false')
        })
        this.isEditting = false
        const variables = {
          id: this.astronaut._id,
          fname: this.changed.fname.trim(),
          lname: this.changed.lname.trim(),
          birthday: this.changed.birthday.trim(),
          super: this.changed.super.trim()
        }
        console.log(variables)
        this.$apollo.mutate({
          mutation: mutations.UPDATE_ASTRONAUT,
          variables: variables,
          update: (store, { data: { updateAstronaut }}) => {
            const data = store.readQuery({query: queries.ALL_ASTRONAUTS })
            let index = data.astronauts.findIndex(astronaut => astronaut._id === this.astronaut._id)
            console.log(index)
            data.astronauts.splice(index, 1, updateAstronaut)
            store.writeQuery({
              query: queries.ALL_ASTRONAUTS,
              data
            })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateAstronaut: {
              __typename: 'Astronaut',
              _id: '123',
              fname: this.changed.fname,
              lname: this.changed.lname,
              birthday: this.changed.birthday,
              super: this.changed.super
            }
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        tds.forEach(el => {
          el.setAttribute('contenteditable', 'true')
        })
        this.isEditting = true
      }
    }
  }
}
</script>
