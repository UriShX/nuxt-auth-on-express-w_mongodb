export default ({ store, $axios }) => {
  $axios.defaults.host = store.state.axios.env.HOST
  $axios.defaults.port = store.state.axios.env.PORT
}
