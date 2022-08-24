import { client } from 'app/api/baseApi'
import { api as generatedApi } from 'generated/graphql'

// const auth = createApi({
//   reducerPath: 'authApi',
//   baseQuery: createBaseQuery('/auth'),
//   endpoints: builder => ({
//     login: builder.mutation<LoginResponse, LoginPayload>({
//       query: body => ({ method: 'POST', url: '/login', body }),
//       transformResponse: (response: LoginResponse) => {
//         storageManager.setAuthToken(response.token)
//         return response
//       },
//     }),
//     getCurrentUser: builder.query<
//       GetCurrentUserResponse,
//       GetCurrentUserPayload
//     >({ query: () => '/current-user' }),
//   }),
// })

const auth = generatedApi.enhanceEndpoints({
  endpoints: {
    Login: {
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled
        client.setHeader('Authorization', `Bearer ${data.login}`)
        console.log('Kurwaaaa')
        console.log(client)
      },
    },
  },
})

export default auth

export const { useLoginMutation, useGetGroupsQuery } = auth
