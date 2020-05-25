const strategy = 'local'
const FALLBACK_INTERVAL = 2 * 60 * 1000 * 0.75 // 900 * 1000 * 0.75

async function refreshTokenF($auth, $axios, token, refreshToken) {
  if (token && refreshToken) {
    try {
      const response = await $axios.post('/auth/refresh', {
        token: refreshToken
      })

      token = response.data.accessToken
      refreshToken = response.data.refreshToken

      // $auth.setToken(strategy, token)
      // $auth.setRefreshToken(strategy, refreshToken)

      $auth.$storage.setCookie(`_token.${strategy}`, token, true)

      $auth.$storage.setCookie(`_refresh_token.${strategy}`, refreshToken, true)

      $axios.setToken(token)
      return decodeToken.call(this, token).exp
    } catch (error) {
      $auth.logout()
      throw new Error('Error while refreshing token')
    }
  }
}

export default async function({ app }) {
  const { $axios, $auth } = app

  // let token = $auth.getToken(strategy)
  let token = $auth.$storage.getCookie(`_token.${strategy}`)
  // eslint-disable-next-line
  console.log(token)

  // let refreshToken = $auth.getRefreshToken(strategy)
  let refreshToken = $auth.$storage.getCookie(`_refresh_token.${strategy}`)
  // eslint-disable-next-line
  console.log(refreshToken)

  let refreshInterval = FALLBACK_INTERVAL
  if (token && refreshToken) {
    $axios.get('/test/user').then((resp) => {
      $auth.setUser(resp.data)
    })
    const tokenParsed = decodeToken.call(this, token)
    refreshInterval = (tokenParsed.exp * 1000 - Date.now()) * 0.75

    if (refreshInterval < 10000 && refreshInterval > 0) {
      refreshInterval = 10000
    }
    if (refreshInterval < 0) {
      refreshInterval =
        ((await refreshTokenF($auth, $axios, token, refreshToken)) * 1000 -
          Date.now()) *
        0.75
      $auth.fetchUserOnce()
    }
  }

  setInterval(async function() {
    token = $auth.$storage.getCookie(`_token.${strategy}`)
    // token = $auth.getToken(strategy)
    refreshToken = $auth.$storage.getCookie(`_refresh_token.${strategy}`)
    // refreshToken = $auth.getRefreshToken(strategy)
    await refreshTokenF($auth, $axios, token, refreshToken)
  }, refreshInterval)
}

function decodeToken(str) {
  str = str.split('.')[1]

  str = str.replace('/-/g', '+')
  str = str.replace('/_/g', '/')
  switch (str.length % 4) {
    case 0:
      break
    case 2:
      str += '=='
      break
    case 3:
      str += '='
      break
    default:
      throw new Error('Invalid token')
  }

  str = (str + '===').slice(0, str.length + (str.length % 4))
  str = str.replace(/-/g, '+').replace(/_/g, '/')

  str = decodeURIComponent(
    escape(Buffer.from(str, 'base64').toString('binary'))
  )

  str = JSON.parse(str)
  return str
}
