import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type Message = {
   __typename?: 'Message',
  id: Scalars['Int'],
  body: Scalars['String'],
  sender: Sender,
  createdAt: Scalars['String'],
  updatedAt?: Maybe<Scalars['String']>,
  seen: Scalars['Boolean'],
};

export type MessagesCursor = {
   __typename?: 'MessagesCursor',
  cursor: Scalars['String'],
  messages: Array<Message>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createThread: Thread,
  sendMessage: Message,
  signUp: Result,
  signIn: SignInResult,
  exchangeTOTP: Result,
  markMessageAsSeen: Message,
  endThread: Thread,
  deleteThread: Result,
  enableTotp: Result,
  disableTotp: Result,
  updateAccount: User,
  /** Password Resets: */
  forgotPassword: Result,
  resetPassword: ResetPassword,
};


export type MutationCreateThreadArgs = {
  name: Scalars['String'],
  to: Scalars['String'],
  message: Scalars['String']
};


export type MutationSendMessageArgs = {
  threadID: Scalars['Int'],
  body: Scalars['String']
};


export type MutationSignUpArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignInArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationExchangeTotpArgs = {
  token: Scalars['String']
};


export type MutationMarkMessageAsSeenArgs = {
  id: Scalars['Int']
};


export type MutationEndThreadArgs = {
  id: Scalars['Int']
};


export type MutationDeleteThreadArgs = {
  id: Scalars['Int']
};


export type MutationEnableTotpArgs = {
  secret: Scalars['String'],
  token: Scalars['String']
};


export type MutationDisableTotpArgs = {
  password: Scalars['String']
};


export type MutationUpdateAccountArgs = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  uuid: Scalars['String'],
  password?: Maybe<Scalars['String']>
};

export type Query = {
   __typename?: 'Query',
  threads: Array<Thread>,
  thread: Thread,
  me: User,
  onboardTotp: TotpOnboarding,
  moreMessages: MessagesCursor,
};


export type QueryThreadArgs = {
  threadID: Scalars['Int']
};


export type QueryMoreMessagesArgs = {
  threadID: Scalars['Int'],
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};

export type ResetPassword = {
   __typename?: 'ResetPassword',
  complete: Scalars['Boolean'],
};

export type Result = {
   __typename?: 'Result',
  ok: Scalars['Boolean'],
};

export enum Sender {
  Self = 'SELF',
  Other = 'OTHER'
}

export type SignInResult = Result | TotpChallenge;

export type Subscription = {
   __typename?: 'Subscription',
  newMessage: Message,
};


export type SubscriptionNewMessageArgs = {
  threadID: Scalars['Int']
};

export type Thread = {
   __typename?: 'Thread',
  id: Scalars['Int'],
  name: Scalars['String'],
  number: Scalars['String'],
  recipient: Scalars['String'],
  lastMessage?: Maybe<Message>,
  createdAt: Scalars['String'],
  updatedAt?: Maybe<Scalars['String']>,
  ended: Scalars['Boolean'],
};

export type TotpChallenge = {
   __typename?: 'TOTPChallenge',
  totpChallenge: Scalars['Boolean'],
};

export type TotpOnboarding = {
   __typename?: 'TotpOnboarding',
  name: Scalars['String'],
  secret: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  name: Scalars['String'],
  email: Scalars['String'],
  hasTOTP: Scalars['Boolean'],
};

export type CreateThreadMutationVariables = {
  name: Scalars['String'],
  phoneNumber: Scalars['String'],
  message: Scalars['String']
};


export type CreateThreadMutation = (
  { __typename?: 'Mutation' }
  & { createThread: (
    { __typename?: 'Thread' }
    & Pick<Thread, 'id'>
  ) }
);

export type DeleteThreadMutationVariables = {
  id: Scalars['Int']
};


export type DeleteThreadMutation = (
  { __typename?: 'Mutation' }
  & { deleteThread: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type DisableTotpMutationVariables = {
  password: Scalars['String']
};


export type DisableTotpMutation = (
  { __typename?: 'Mutation' }
  & { disableTotp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type EnableTotpMutationVariables = {
  secret: Scalars['String'],
  token: Scalars['String']
};


export type EnableTotpMutation = (
  { __typename?: 'Mutation' }
  & { enableTotp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type EndThreadMutationVariables = {
  id: Scalars['Int']
};


export type EndThreadMutation = (
  { __typename?: 'Mutation' }
  & { endThread: (
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'ended'>
  ) }
);

export type ExchangeTotpMutationVariables = {
  token: Scalars['String']
};


export type ExchangeTotpMutation = (
  { __typename?: 'Mutation' }
  & { exchangeTOTP: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type MarkMessageSeenMutationVariables = {
  id: Scalars['Int']
};


export type MarkMessageSeenMutation = (
  { __typename?: 'Mutation' }
  & { markMessageAsSeen: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'seen'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & MeFragmentFragment
  ) }
);

export type MeFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'hasTOTP'>
);

export type MessageFragmentFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'body' | 'sender' | 'createdAt' | 'updatedAt' | 'seen'>
);

export type MoreMessagesQueryVariables = {
  threadID: Scalars['Int'],
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};


export type MoreMessagesQuery = (
  { __typename?: 'Query' }
  & { moreMessages: (
    { __typename?: 'MessagesCursor' }
    & Pick<MessagesCursor, 'cursor'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
  ) }
);

export type NewMessageSubscriptionVariables = {
  threadID: Scalars['Int']
};


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & MessageFragmentFragment
  ) }
);

export type OnboardTotpQueryVariables = {};


export type OnboardTotpQuery = (
  { __typename?: 'Query' }
  & { onboardTotp: (
    { __typename?: 'TotpOnboarding' }
    & Pick<TotpOnboarding, 'name' | 'secret'>
  ) }
);

export type ResetPasswordMutationVariables = {
  uuid: Scalars['String'],
  password?: Maybe<Scalars['String']>
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'ResetPassword' }
    & Pick<ResetPassword, 'complete'>
  ) }
);

export type SendMessageMutationVariables = {
  threadID: Scalars['Int'],
  message: Scalars['String']
};


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'body'>
  ) }
);

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) | (
    { __typename?: 'TOTPChallenge' }
    & Pick<TotpChallenge, 'totpChallenge'>
  ) }
);

export type SignUpMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type ThreadQueryVariables = {
  threadID: Scalars['Int']
};


export type ThreadQuery = (
  { __typename?: 'Query' }
  & { thread: (
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'name' | 'recipient' | 'number' | 'createdAt' | 'ended'>
  ) }
);

export type ThreadsQueryVariables = {};


export type ThreadsQuery = (
  { __typename?: 'Query' }
  & { threads: Array<(
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'name' | 'recipient' | 'number' | 'updatedAt' | 'ended'>
    & { lastMessage: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'body' | 'seen'>
    )> }
  )> }
);

export type UpdateAccountMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String']
};


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'User' }
    & MeFragmentFragment
  ) }
);

export const MeFragmentFragmentDoc = gql`
    fragment MeFragment on User {
  id
  name
  email
  hasTOTP
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on Message {
  id
  body
  sender
  createdAt
  updatedAt
  seen
}
    `;
export const CreateThreadDocument = gql`
    mutation CreateThread($name: String!, $phoneNumber: String!, $message: String!) {
  createThread(name: $name, to: $phoneNumber, message: $message) {
    id
  }
}
    `;

export function useCreateThreadMutation() {
  return Urql.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument);
};
export const DeleteThreadDocument = gql`
    mutation DeleteThread($id: Int!) {
  deleteThread(id: $id) {
    ok
  }
}
    `;

export function useDeleteThreadMutation() {
  return Urql.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument);
};
export const DisableTotpDocument = gql`
    mutation DisableTOTP($password: String!) {
  disableTotp(password: $password) {
    ok
  }
}
    `;

export function useDisableTotpMutation() {
  return Urql.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument);
};
export const EnableTotpDocument = gql`
    mutation EnableTotp($secret: String!, $token: String!) {
  enableTotp(secret: $secret, token: $token) {
    ok
  }
}
    `;

export function useEnableTotpMutation() {
  return Urql.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument);
};
export const EndThreadDocument = gql`
    mutation EndThread($id: Int!) {
  endThread(id: $id) {
    id
    ended
  }
}
    `;

export function useEndThreadMutation() {
  return Urql.useMutation<EndThreadMutation, EndThreadMutationVariables>(EndThreadDocument);
};
export const ExchangeTotpDocument = gql`
    mutation ExchangeTOTP($token: String!) {
  exchangeTOTP(token: $token) {
    ok
  }
}
    `;

export function useExchangeTotpMutation() {
  return Urql.useMutation<ExchangeTotpMutation, ExchangeTotpMutationVariables>(ExchangeTotpDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const MarkMessageSeenDocument = gql`
    mutation MarkMessageSeen($id: Int!) {
  markMessageAsSeen(id: $id) {
    id
    seen
  }
}
    `;

export function useMarkMessageSeenMutation() {
  return Urql.useMutation<MarkMessageSeenMutation, MarkMessageSeenMutationVariables>(MarkMessageSeenDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...MeFragment
  }
}
    ${MeFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MoreMessagesDocument = gql`
    query MoreMessages($threadID: Int!, $first: Int!, $after: String) {
  moreMessages(threadID: $threadID, first: $first, after: $after) {
    cursor
    messages {
      ...MessageFragment
    }
  }
}
    ${MessageFragmentFragmentDoc}`;

export function useMoreMessagesQuery(options: Omit<Urql.UseQueryArgs<MoreMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MoreMessagesQuery>({ query: MoreMessagesDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage($threadID: Int!) {
  newMessage(threadID: $threadID) {
    ...MessageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;

export function useNewMessageSubscription<TData = any>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};
export const OnboardTotpDocument = gql`
    query OnboardTotp {
  onboardTotp {
    name
    secret
  }
}
    `;

export function useOnboardTotpQuery(options: Omit<Urql.UseQueryArgs<OnboardTotpQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OnboardTotpQuery>({ query: OnboardTotpDocument, ...options });
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($uuid: String!, $password: String) {
  resetPassword(uuid: $uuid, password: $password) {
    complete
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($threadID: Int!, $message: String!) {
  sendMessage(threadID: $threadID, body: $message) {
    id
    body
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    ... on Result {
      ok
    }
    ... on TOTPChallenge {
      totpChallenge
    }
  }
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    ok
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const ThreadDocument = gql`
    query Thread($threadID: Int!) {
  thread(threadID: $threadID) {
    id
    name
    recipient
    number
    createdAt
    ended
  }
}
    `;

export function useThreadQuery(options: Omit<Urql.UseQueryArgs<ThreadQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ThreadQuery>({ query: ThreadDocument, ...options });
};
export const ThreadsDocument = gql`
    query Threads {
  threads {
    id
    name
    recipient
    number
    updatedAt
    ended
    lastMessage {
      id
      body
      seen
    }
  }
}
    `;

export function useThreadsQuery(options: Omit<Urql.UseQueryArgs<ThreadsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ThreadsQuery>({ query: ThreadsDocument, ...options });
};
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($name: String!, $email: String!) {
  updateAccount(name: $name, email: $email) {
    ...MeFragment
  }
}
    ${MeFragmentFragmentDoc}`;

export function useUpdateAccountMutation() {
  return Urql.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument);
};