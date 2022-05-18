export default class AuthController {

  public async login ({ request, auth }) {
    const { uid, password } = request.only(['uid', 'password'])

    try {
      return await auth.attempt( uid, password )
    } catch(error) {
      return error
    }
  }

  public async logout ({ response, auth }) {
    await auth.logout()

    return response
  }
}
