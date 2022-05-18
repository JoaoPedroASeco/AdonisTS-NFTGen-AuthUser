import { test,  } from '@japa/runner'

// test('Create a user', async ({ client }) => {
//   const response = await client.post('http://127.0.0.1:3333/users-create').form({
//     "username": "vlad",
//     "email": "vlad@hotmail.com",
//     "password": "123123123",
//     "telephone": "4991696690",
//     "wallet": "0xB4D6AA959aA586E49f54D18FEE796CF2E347654B",
//     "user_type": "User",
//     "country_code": "98767456",
//     "street": "Rua Bla Bla",
//     "number": "123",
//     "reference": "LALA"
//   })

//   response.assertStatus(200)
// })

test('Should return error beacause name is empty ou not existent', async ({ client }) => {
  const response = await client.post('http://127.0.0.1:3333/users-create').form({
    "username": "",
    "email": "vitor@hotmail.com",
    "password": "123123123",
    "telephone": "4991696690",
    "wallet": "0xB4D6AA959aA586E49f54D18FEE796CF2E347654B",
    "user_type": "User",
    "country_code": "98767456",
    "street": "Rua Bla Bla",
    "number": "123",
    "reference": "LALA"
  })

  response.assert?.notOk({ message: "User Successfully Created!" })
})
