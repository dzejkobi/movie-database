import { backendUrl, movieApiUrl } from '@/common/configVars'

export default {
  backend: backendUrl,
  movieApi: movieApiUrl,
  obtainJWT: backendUrl + 'auth/token/obtain/',
  refreshJWT: backendUrl + 'auth/token/refresh/',
  googleSignIn: backendUrl + 'rest-auth/login/google/',
  signUp: backendUrl + 'users/',
  currUserData: backendUrl + 'users/me/',
  favourites: backendUrl + 'movies/favourites/'
}
