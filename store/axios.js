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
      commit('setEnv', {
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || '3000'
      })
    }
  }
}
