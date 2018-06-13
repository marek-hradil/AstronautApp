import gql from 'graphql-tag'
const ALL_ASTRONAUTS = gql`
  query allAstronauts{
    astronauts {
      _id
      fname
      lname
      birthday
      super
    }
  }
`
const all = {
  ALL_ASTRONAUTS
}
export default all
