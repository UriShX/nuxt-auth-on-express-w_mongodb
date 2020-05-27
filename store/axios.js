// const url = require('url')

export const state = () => ({
  env: {}
})

export const mutations = {
  setEnv(state, env) {
    state.env = env
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    if (process.server) {
      let q =
        typeof process.env.BASE_URL === 'string'
          ? new URL(process.env.BASE_URL)
          : null

      if (q !== null) {
        q.pathname = '/api'
        q.port = process.env.PORT
      }

      commit('setEnv', {
        BASE_URL: q.href || 'http://localhost:3000/api'
      })
    }
  }
}
