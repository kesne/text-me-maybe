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
};


export type QueryThreadArgs = {
  threadID: Scalars['Int']
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

export type Thread = {
   __typename?: 'Thread',
  id: Scalars['Int'],
  name: Scalars['String'],
  phoneNumber: Scalars['String'],
  recipient: Scalars['String'],
  messages: Array<Message>,
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
  Thread: ResolverTypeWrapper<Thread>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Message: ResolverTypeWrapper<Message>,
  Sender: Sender,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  User: ResolverTypeWrapper<User>,
  TotpOnboarding: ResolverTypeWrapper<TotpOnboarding>,
  Mutation: ResolverTypeWrapper<{}>,
  Result: ResolverTypeWrapper<Result>,
  SignInResult: ResolversTypes['Result'] | ResolversTypes['TOTPChallenge'],
  TOTPChallenge: ResolverTypeWrapper<TotpChallenge>,
  ResetPassword: ResolverTypeWrapper<ResetPassword>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Thread: Thread,
  Int: Scalars['Int'],
  String: Scalars['String'],
  Message: Message,
  Sender: Sender,
  Boolean: Scalars['Boolean'],
  User: User,
  TotpOnboarding: TotpOnboarding,
  Mutation: {},
  Result: Result,
  SignInResult: ResolversParentTypes['Result'] | ResolversParentTypes['TOTPChallenge'],
  TOTPChallenge: TotpChallenge,
  ResetPassword: ResetPassword,
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  threads?: Resolver<Array<ResolversTypes['Thread']>, ParentType, ContextType>,
  thread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<QueryThreadArgs, 'threadID'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  onboardTotp?: Resolver<ResolversTypes['TotpOnboarding'], ParentType, ContextType>,
}>;

export type ResetPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPassword'] = ResolversParentTypes['ResetPassword']> = ResolversObject<{
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type SignInResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInResult'] = ResolversParentTypes['SignInResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Result' | 'TOTPChallenge', ParentType, ContextType>
}>;

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type TotpChallengeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TOTPChallenge'] = ResolversParentTypes['TOTPChallenge']> = ResolversObject<{
  totpChallenge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type TotpOnboardingResolvers<ContextType = any, ParentType extends ResolversParentTypes['TotpOnboarding'] = ResolversParentTypes['TotpOnboarding']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasTOTP?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  ResetPassword?: ResetPasswordResolvers<ContextType>,
  Result?: ResultResolvers<ContextType>,
  SignInResult?: SignInResultResolvers,
  Thread?: ThreadResolvers<ContextType>,
  TOTPChallenge?: TotpChallengeResolvers<ContextType>,
  TotpOnboarding?: TotpOnboardingResolvers<ContextType>,
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