import gql from 'graphql-tag'
const CREATE_ASTRONAUT = gql`
    mutation createAstronaut (
        $fname: String!,
        $lname: String!,
        $birthday: String!,
        $super: String!
    ) {
        createAstronaut (
            fname: $fname,
            lname: $lname,
            birthday: $birthday,
            super: $super
        ) {
            _id
            fname
            lname
            birthday
            super
        }
    }
`
const DELETE_ASTRONAUT = gql`
    mutation deleteAstronaut (
        $id: ID!
    ) {
        deleteAstronaut (
            _id: $id
        )
    }
`
const UPDATE_ASTRONAUT = gql`
    mutation updateAstronaut (
        $id: ID!,
        $fname: String!,
        $lname: String!,
        $birthday: String!,
        $super: String!
    ) {
        updateAstronaut (
            _id: $id,
            fname: $fname,
            lname: $lname,
            birthday: $birthday,
            super: $super
        ) {
            _id
            fname
            lname
            birthday
            super
        }
    }
`
const all = {
  CREATE_ASTRONAUT,
  DELETE_ASTRONAUT,
  UPDATE_ASTRONAUT
}
export default all
