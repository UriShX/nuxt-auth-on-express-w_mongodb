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
      const q =
        typeof process.env.BASE_URL === 'string'
          ? new URL(process.env.BASE_URL)
          : null

      const parsedURL =
        q !== null ? `${q.protocol}//${q.host}:${process.env.PORT}/api` : null
      commit('setEnv', {
        BASE_URL: parsedURL || 'http://localhost:3000/api'
      })
    }
  }
}
