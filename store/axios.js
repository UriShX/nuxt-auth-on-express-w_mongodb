const url = require('url')

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
      const q =
        typeof process.env.BASE_URL === 'string'
          ? url.parse(process.env.BASE_URL, true)
          : null
      commit('setEnv', {
        BASE_URL:
          q !== null
            ? `${q.protocol}//${q.host}:${process.env.PORT}/api`
            : 'http://localhost:3000/api'
      })
    }
  }
}
