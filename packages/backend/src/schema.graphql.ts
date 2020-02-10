import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type MessageEdge = {
   __typename?: 'MessageEdge',
  cursor: Scalars['String'],
  node: Message,
};

export type MessagesConnection = {
   __typename?: 'MessagesConnection',
  pageInfo: PageInfo,
  edges: Array<MessageEdge>,
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

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor: Scalars['String'],
  endCursor: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  threads: ThreadConnection,
  thread: Thread,
  me: User,
};


export type QueryThreadsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};


export type QueryThreadArgs = {
  id: Scalars['Int']
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

export type SignInResult = {
   __typename?: 'SignInResult',
  ok: Scalars['Boolean'],
  requiresTOTP: Scalars['Boolean'],
};

export type Subscription = {
   __typename?: 'Subscription',
  newMessage: MessageEdge,
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
  messages: MessagesConnection,
};


export type ThreadMessagesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};

export type ThreadConnection = {
   __typename?: 'ThreadConnection',
  pageInfo: PageInfo,
  edges: Array<ThreadEdge>,
};

export type ThreadEdge = {
   __typename?: 'ThreadEdge',
  cursor: Scalars['String'],
  node: Thread,
};

export type TotpOnboarding = {
   __typename?: 'TOTPOnboarding',
  secret: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  name: Scalars['String'],
  email: Scalars['String'],
  hasTOTP: Scalars['Boolean'],
  onboardTOTP?: Maybe<TotpOnboarding>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ThreadConnection: ResolverTypeWrapper<ThreadConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ThreadEdge: ResolverTypeWrapper<ThreadEdge>,
  Thread: ResolverTypeWrapper<Thread>,
  Message: ResolverTypeWrapper<Message>,
  Sender: Sender,
  MessagesConnection: ResolverTypeWrapper<MessagesConnection>,
  MessageEdge: ResolverTypeWrapper<MessageEdge>,
  User: ResolverTypeWrapper<User>,
  TOTPOnboarding: ResolverTypeWrapper<TotpOnboarding>,
  Mutation: ResolverTypeWrapper<{}>,
  Result: ResolverTypeWrapper<Result>,
  SignInResult: ResolverTypeWrapper<SignInResult>,
  ResetPassword: ResolverTypeWrapper<ResetPassword>,
  Subscription: ResolverTypeWrapper<{}>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Int: Scalars['Int'],
  String: Scalars['String'],
  ThreadConnection: ThreadConnection,
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  ThreadEdge: ThreadEdge,
  Thread: Thread,
  Message: Message,
  Sender: Sender,
  MessagesConnection: MessagesConnection,
  MessageEdge: MessageEdge,
  User: User,
  TOTPOnboarding: TotpOnboarding,
  Mutation: {},
  Result: Result,
  SignInResult: SignInResult,
  ResetPassword: ResetPassword,
  Subscription: {},
}>;

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sender?: Resolver<ResolversTypes['Sender'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  seen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type MessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageEdge'] = ResolversParentTypes['MessageEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  node?: Resolver<ResolversTypes['Message'], ParentType, ContextType>,
}>;

export type MessagesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesConnection'] = ResolversParentTypes['MessagesConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['MessageEdge']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createThread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<MutationCreateThreadArgs, 'name' | 'to' | 'message'>>,
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'threadID' | 'body'>>,
  signUp?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'name' | 'email' | 'password'>>,
  signIn?: Resolver<ResolversTypes['SignInResult'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>,
  exchangeTOTP?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationExchangeTotpArgs, 'token'>>,
  markMessageAsSeen?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationMarkMessageAsSeenArgs, 'id'>>,
  endThread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<MutationEndThreadArgs, 'id'>>,
  deleteThread?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationDeleteThreadArgs, 'id'>>,
  enableTotp?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationEnableTotpArgs, 'secret' | 'token'>>,
  disableTotp?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationDisableTotpArgs, 'password'>>,
  updateAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateAccountArgs>,
  forgotPassword?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>,
  resetPassword?: Resolver<ResolversTypes['ResetPassword'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'uuid'>>,
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  threads?: Resolver<ResolversTypes['ThreadConnection'], ParentType, ContextType, RequireFields<QueryThreadsArgs, 'first'>>,
  thread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<QueryThreadArgs, 'id'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export type ResetPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPassword'] = ResolversParentTypes['ResetPassword']> = ResolversObject<{
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type SignInResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInResult'] = ResolversParentTypes['SignInResult']> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  requiresTOTP?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  newMessage?: SubscriptionResolver<ResolversTypes['MessageEdge'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'threadID'>>,
}>;

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  messages?: Resolver<ResolversTypes['MessagesConnection'], ParentType, ContextType, RequireFields<ThreadMessagesArgs, 'first'>>,
}>;

export type ThreadConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadConnection'] = ResolversParentTypes['ThreadConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['ThreadEdge']>, ParentType, ContextType>,
}>;

export type ThreadEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadEdge'] = ResolversParentTypes['ThreadEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  node?: Resolver<ResolversTypes['Thread'], ParentType, ContextType>,
}>;

export type TotpOnboardingResolvers<ContextType = any, ParentType extends ResolversParentTypes['TOTPOnboarding'] = ResolversParentTypes['TOTPOnboarding']> = ResolversObject<{
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasTOTP?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  onboardTOTP?: Resolver<Maybe<ResolversTypes['TOTPOnboarding']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Message?: MessageResolvers<ContextType>,
  MessageEdge?: MessageEdgeResolvers<ContextType>,
  MessagesConnection?: MessagesConnectionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  ResetPassword?: ResetPasswordResolvers<ContextType>,
  Result?: ResultResolvers<ContextType>,
  SignInResult?: SignInResultResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Thread?: ThreadResolvers<ContextType>,
  ThreadConnection?: ThreadConnectionResolvers<ContextType>,
  ThreadEdge?: ThreadEdgeResolvers<ContextType>,
  TOTPOnboarding?: TotpOnboardingResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;