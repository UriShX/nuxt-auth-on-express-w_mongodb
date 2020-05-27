export default ({ store, $axios }) => {
  $axios.defaults.baseURL = store.state.axios.env.BASE_URL
}
