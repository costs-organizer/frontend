import { api } from '../app/api/baseApi'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type AddNewUsersInput = {
  groupId: Scalars['Int']
  userIds: Array<Scalars['Int']>
}

export type Cost = {
  __typename?: 'Cost'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  createdById: Scalars['Float']
  deletedAt?: Maybe<Scalars['DateTime']>
  description: Scalars['String']
  group: Array<Group>
  groupId: Scalars['Float']
  id: Scalars['Int']
  isCompleted: Scalars['Boolean']
  moneyAmount: Scalars['Float']
  name: Scalars['String']
  participants: Array<User>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type CreateCostInput = {
  description: Scalars['String']
  groupId: Scalars['Int']
  moneyAmount: Scalars['Int']
  name: Scalars['String']
  participantsIds: Array<Scalars['Int']>
}

export type CreateGroupInput = {
  name: Scalars['String']
  userIds: Array<Scalars['Int']>
}

export type FindAllCostsInput = {
  filterByName?: InputMaybe<Scalars['Boolean']>
  groupId: Scalars['Int']
}

export type FindAllGroupsInput = {
  search?: InputMaybe<Scalars['String']>
}

export type FindAllTransactionsInput = {
  filterByUser?: InputMaybe<Scalars['Boolean']>
  groupId: Scalars['Int']
}

export type FindAllUsersInput = {
  groupId?: InputMaybe<Scalars['Float']>
  search?: InputMaybe<Scalars['String']>
}

export type Group = {
  __typename?: 'Group'
  costs: Array<Cost>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  createdById: User
  deletedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['Int']
  members: Array<User>
  name: Scalars['String']
  notifications: Array<Notification>
  transactions: Array<Transaction>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type LoginInput = {
  name: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addNewUsers: Array<Scalars['Int']>
  completeTransaction: Scalars['Int']
  createCost: Scalars['Int']
  createGroup: Scalars['Int']
  joinCost: Scalars['Int']
  login: Scalars['String']
  logout: Scalars['String']
  register: User
  removeCost: Scalars['Int']
  removeUser: User
  removeUserFromGroup: Scalars['Int']
}

export type MutationAddNewUsersArgs = {
  addNewUsersInput: AddNewUsersInput
}

export type MutationCompleteTransactionArgs = {
  transactionId: Scalars['Int']
}

export type MutationCreateCostArgs = {
  createCostInput: CreateCostInput
}

export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput
}

export type MutationJoinCostArgs = {
  costId: Scalars['Int']
}

export type MutationLoginArgs = {
  loginInput: LoginInput
}

export type MutationRegisterArgs = {
  registerInput: RegisterInput
}

export type MutationRemoveCostArgs = {
  costId: Scalars['Int']
}

export type MutationRemoveUserArgs = {
  id: Scalars['Int']
}

export type MutationRemoveUserFromGroupArgs = {
  removeUserFromGroupInput: RemoveUserFromGroupInput
}

export type Notification = {
  __typename?: 'Notification'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  createdById: Scalars['Int']
  decription: Scalars['String']
  deletedAt?: Maybe<Scalars['DateTime']>
  group: Group
  groupId: Scalars['Int']
  id: Scalars['Int']
  isCompleted: Scalars['Boolean']
  receivers: Array<User>
  type: NotificationType
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum NotificationType {
  GroupSettled = 'GROUP_SETTLED',
  Reminder = 'REMINDER',
  TransactionReceived = 'TRANSACTION_RECEIVED',
}

export type Query = {
  __typename?: 'Query'
  cost: Cost
  costs: Array<Cost>
  group: Group
  groups: Array<Group>
  me: User
  transaction: Transaction
  transactions: Array<Transaction>
  user: User
  users: Array<User>
}

export type QueryCostArgs = {
  id: Scalars['Int']
}

export type QueryCostsArgs = {
  findAllInput: FindAllCostsInput
}

export type QueryGroupArgs = {
  id: Scalars['Int']
}

export type QueryGroupsArgs = {
  findAllInput: FindAllGroupsInput
}

export type QueryTransactionArgs = {
  transactionId: Scalars['Int']
}

export type QueryTransactionsArgs = {
  findAllInput: FindAllTransactionsInput
}

export type QueryUserArgs = {
  id: Scalars['Int']
}

export type QueryUsersArgs = {
  findAllInput: FindAllUsersInput
}

export type RegisterInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
}

export type RemoveUserFromGroupInput = {
  groupId: Scalars['Int']
  userId: Scalars['Int']
}

export type Transaction = {
  __typename?: 'Transaction'
  createdAt?: Maybe<Scalars['DateTime']>
  deletedAt?: Maybe<Scalars['DateTime']>
  group: Group
  groupId: Scalars['Float']
  id: Scalars['Int']
  moneyAmount: Scalars['Float']
  payer: User
  payerId: Scalars['Float']
  receiver: User
  receiverId: Scalars['Float']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type User = {
  __typename?: 'User'
  createdAt?: Maybe<Scalars['DateTime']>
  createdCosts: Array<Cost>
  createdGroups: Array<Group>
  createdNotifications: Array<Notification>
  deletedAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  id: Scalars['Int']
  joinedGroups: Array<Group>
  paidTransactions: Array<Transaction>
  participatedCosts: Array<Cost>
  passwordHash: Scalars['String']
  passwordSalt: Scalars['String']
  receivedNotifications: Array<Notification>
  receivedTransactions: Array<Transaction>
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
}

export type LoginMutationVariables = Exact<{
  inp: LoginInput
}>

export type LoginMutation = { __typename?: 'Mutation'; login: string }

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: string }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: { __typename?: 'User'; id: number; username: string }
}

export type RegisterMutationVariables = Exact<{
  inp: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: { __typename?: 'User'; id: number }
}

export type CreateCostMutationVariables = Exact<{
  inp: CreateCostInput
}>

export type CreateCostMutation = { __typename?: 'Mutation'; createCost: number }

export type GetCostQueryVariables = Exact<{
  inp: Scalars['Int']
}>

export type GetCostQuery = {
  __typename?: 'Query'
  cost: {
    __typename?: 'Cost'
    id: number
    name: string
    description: string
    moneyAmount: number
    participants: Array<{ __typename?: 'User'; id: number; username: string }>
    createdBy: { __typename?: 'User'; id: number; username: string }
  }
}

export type GetCostsQueryVariables = Exact<{
  inp: FindAllCostsInput
}>

export type GetCostsQuery = {
  __typename?: 'Query'
  costs: Array<{
    __typename?: 'Cost'
    id: number
    name: string
    description: string
    moneyAmount: number
    participants: Array<{ __typename?: 'User'; id: number; username: string }>
    createdBy: { __typename?: 'User'; id: number; username: string }
  }>
}

export type JoinCostMutationVariables = Exact<{
  inp: Scalars['Int']
}>

export type JoinCostMutation = { __typename?: 'Mutation'; joinCost: number }

export type RemoveCostMutationVariables = Exact<{
  inp: Scalars['Int']
}>

export type RemoveCostMutation = { __typename?: 'Mutation'; removeCost: number }

export type AddUserToGroupMutationVariables = Exact<{
  inp: AddNewUsersInput
}>

export type AddUserToGroupMutation = {
  __typename?: 'Mutation'
  addNewUsers: Array<number>
}

export type CreateGroupMutationVariables = Exact<{
  inp: CreateGroupInput
}>

export type CreateGroupMutation = {
  __typename?: 'Mutation'
  createGroup: number
}

export type GetGroupsQueryVariables = Exact<{
  inp: FindAllGroupsInput
}>

export type GetGroupsQuery = {
  __typename?: 'Query'
  groups: Array<{
    __typename?: 'Group'
    id: number
    createdAt?: any | null
    name: string
    createdBy: { __typename?: 'User'; id: number; username: string }
    members: Array<{ __typename?: 'User'; id: number }>
    notifications: Array<{
      __typename?: 'Notification'
      id: number
      decription: string
      type: NotificationType
    }>
  }>
}

export type GetGroupQueryVariables = Exact<{
  inp: Scalars['Int']
}>

export type GetGroupQuery = {
  __typename?: 'Query'
  group: {
    __typename?: 'Group'
    id: number
    createdAt?: any | null
    name: string
    createdBy: { __typename?: 'User'; id: number; username: string }
    members: Array<{ __typename?: 'User'; id: number; username: string }>
    costs: Array<{
      __typename?: 'Cost'
      id: number
      createdAt?: any | null
      updatedAt?: any | null
      name: string
      moneyAmount: number
      description: string
      createdBy: { __typename?: 'User'; id: number; username: string }
      participants: Array<{ __typename?: 'User'; id: number; username: string }>
    }>
  }
}

export type RemoveUserFromGroupMutationVariables = Exact<{
  inp: RemoveUserFromGroupInput
}>

export type RemoveUserFromGroupMutation = {
  __typename?: 'Mutation'
  removeUserFromGroup: number
}

export type CompleteTransactionMutationVariables = Exact<{
  inp: Scalars['Int']
}>

export type CompleteTransactionMutation = {
  __typename?: 'Mutation'
  completeTransaction: number
}

export type GetSingleTransactionQueryVariables = Exact<{
  inp: Scalars['Int']
}>

export type GetSingleTransactionQuery = {
  __typename?: 'Query'
  transaction: {
    __typename?: 'Transaction'
    id: number
    moneyAmount: number
    receiver: { __typename?: 'User'; id: number; username: string }
    payer: { __typename?: 'User'; id: number; username: string }
  }
}

export type GetTransactionsQueryVariables = Exact<{
  inp: FindAllTransactionsInput
}>

export type GetTransactionsQuery = {
  __typename?: 'Query'
  transactions: Array<{
    __typename?: 'Transaction'
    id: number
    moneyAmount: number
    receiver: { __typename?: 'User'; id: number; username: string }
    payer: { __typename?: 'User'; id: number; username: string }
  }>
}

export type GetUsersQueryVariables = Exact<{
  inp: FindAllUsersInput
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: number
    username: string
    email: string
  }>
}

export const LoginDocument = `
    mutation Login($inp: LoginInput!) {
  login(loginInput: $inp)
}
    `
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `
export const MeDocument = `
    query Me {
  me {
    id
    username
  }
}
    `
export const RegisterDocument = `
    mutation Register($inp: RegisterInput!) {
  register(registerInput: $inp) {
    id
  }
}
    `
export const CreateCostDocument = `
    mutation CreateCost($inp: CreateCostInput!) {
  createCost(createCostInput: $inp)
}
    `
export const GetCostDocument = `
    query GetCost($inp: Int!) {
  cost(id: $inp) {
    id
    name
    description
    moneyAmount
    participants {
      id
      username
    }
    createdBy {
      id
      username
    }
  }
}
    `
export const GetCostsDocument = `
    query GetCosts($inp: FindAllCostsInput!) {
  costs(findAllInput: $inp) {
    id
    name
    description
    moneyAmount
    participants {
      id
      username
    }
    createdBy {
      id
      username
    }
  }
}
    `
export const JoinCostDocument = `
    mutation JoinCost($inp: Int!) {
  joinCost(costId: $inp)
}
    `
export const RemoveCostDocument = `
    mutation RemoveCost($inp: Int!) {
  removeCost(costId: $inp)
}
    `
export const AddUserToGroupDocument = `
    mutation AddUserToGroup($inp: AddNewUsersInput!) {
  addNewUsers(addNewUsersInput: $inp)
}
    `
export const CreateGroupDocument = `
    mutation CreateGroup($inp: CreateGroupInput!) {
  createGroup(createGroupInput: $inp)
}
    `
export const GetGroupsDocument = `
    query GetGroups($inp: FindAllGroupsInput!) {
  groups(findAllInput: $inp) {
    id
    createdAt
    createdBy {
      id
      username
    }
    name
    members {
      id
    }
    notifications {
      id
      decription
      type
    }
  }
}
    `
export const GetGroupDocument = `
    query GetGroup($inp: Int!) {
  group(id: $inp) {
    id
    createdAt
    name
    createdBy {
      id
      username
    }
    members {
      id
      username
    }
    costs {
      id
      createdAt
      updatedAt
      name
      moneyAmount
      description
      createdBy {
        id
        username
      }
      participants {
        id
        username
      }
    }
  }
}
    `
export const RemoveUserFromGroupDocument = `
    mutation RemoveUserFromGroup($inp: RemoveUserFromGroupInput!) {
  removeUserFromGroup(removeUserFromGroupInput: $inp)
}
    `
export const CompleteTransactionDocument = `
    mutation CompleteTransaction($inp: Int!) {
  completeTransaction(transactionId: $inp)
}
    `
export const GetSingleTransactionDocument = `
    query GetSingleTransaction($inp: Int!) {
  transaction(transactionId: $inp) {
    id
    moneyAmount
    receiver {
      id
      username
    }
    payer {
      id
      username
    }
  }
}
    `
export const GetTransactionsDocument = `
    query GetTransactions($inp: FindAllTransactionsInput!) {
  transactions(findAllInput: $inp) {
    id
    moneyAmount
    receiver {
      id
      username
    }
    payer {
      id
      username
    }
  }
}
    `
export const GetUsersDocument = `
    query GetUsers($inp: FindAllUsersInput!) {
  users(findAllInput: $inp) {
    id
    username
    email
  }
}
    `

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    Login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: variables => ({ document: LoginDocument, variables }),
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: variables => ({ document: LogoutDocument, variables }),
    }),
    Me: build.query<MeQuery, MeQueryVariables | void>({
      query: variables => ({ document: MeDocument, variables }),
    }),
    Register: build.mutation<RegisterMutation, RegisterMutationVariables>({
      query: variables => ({ document: RegisterDocument, variables }),
    }),
    CreateCost: build.mutation<CreateCostMutation, CreateCostMutationVariables>(
      {
        query: variables => ({ document: CreateCostDocument, variables }),
      }
    ),
    GetCost: build.query<GetCostQuery, GetCostQueryVariables>({
      query: variables => ({ document: GetCostDocument, variables }),
    }),
    GetCosts: build.query<GetCostsQuery, GetCostsQueryVariables>({
      query: variables => ({ document: GetCostsDocument, variables }),
    }),
    JoinCost: build.mutation<JoinCostMutation, JoinCostMutationVariables>({
      query: variables => ({ document: JoinCostDocument, variables }),
    }),
    RemoveCost: build.mutation<RemoveCostMutation, RemoveCostMutationVariables>(
      {
        query: variables => ({ document: RemoveCostDocument, variables }),
      }
    ),
    AddUserToGroup: build.mutation<
      AddUserToGroupMutation,
      AddUserToGroupMutationVariables
    >({
      query: variables => ({ document: AddUserToGroupDocument, variables }),
    }),
    CreateGroup: build.mutation<
      CreateGroupMutation,
      CreateGroupMutationVariables
    >({
      query: variables => ({ document: CreateGroupDocument, variables }),
    }),
    GetGroups: build.query<GetGroupsQuery, GetGroupsQueryVariables>({
      query: variables => ({ document: GetGroupsDocument, variables }),
    }),
    GetGroup: build.query<GetGroupQuery, GetGroupQueryVariables>({
      query: variables => ({ document: GetGroupDocument, variables }),
    }),
    RemoveUserFromGroup: build.mutation<
      RemoveUserFromGroupMutation,
      RemoveUserFromGroupMutationVariables
    >({
      query: variables => ({
        document: RemoveUserFromGroupDocument,
        variables,
      }),
    }),
    CompleteTransaction: build.mutation<
      CompleteTransactionMutation,
      CompleteTransactionMutationVariables
    >({
      query: variables => ({
        document: CompleteTransactionDocument,
        variables,
      }),
    }),
    GetSingleTransaction: build.query<
      GetSingleTransactionQuery,
      GetSingleTransactionQueryVariables
    >({
      query: variables => ({
        document: GetSingleTransactionDocument,
        variables,
      }),
    }),
    GetTransactions: build.query<
      GetTransactionsQuery,
      GetTransactionsQueryVariables
    >({
      query: variables => ({ document: GetTransactionsDocument, variables }),
    }),
    GetUsers: build.query<GetUsersQuery, GetUsersQueryVariables>({
      query: variables => ({ document: GetUsersDocument, variables }),
    }),
  }),
})

export { injectedRtkApi as api }
export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useLazyMeQuery,
  useRegisterMutation,
  useCreateCostMutation,
  useGetCostQuery,
  useLazyGetCostQuery,
  useGetCostsQuery,
  useLazyGetCostsQuery,
  useJoinCostMutation,
  useRemoveCostMutation,
  useAddUserToGroupMutation,
  useCreateGroupMutation,
  useGetGroupsQuery,
  useLazyGetGroupsQuery,
  useGetGroupQuery,
  useLazyGetGroupQuery,
  useRemoveUserFromGroupMutation,
  useCompleteTransactionMutation,
  useGetSingleTransactionQuery,
  useLazyGetSingleTransactionQuery,
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = injectedRtkApi
