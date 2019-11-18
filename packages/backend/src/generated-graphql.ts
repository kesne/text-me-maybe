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


export type Jwt = {
   __typename?: 'JWT',
  token: Scalars['String'],
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
  signUp: Jwt,
  signIn: Jwt,
  markMessageAsSeen: Message,
  endThread: Thread,
  deleteThread: Result,
  enableTotp: Result,
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

export type Result = {
   __typename?: 'Result',
  ok: Scalars['Boolean'],
};

export enum Sender {
  Self = 'SELF',
  Other = 'OTHER'
}

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
};



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
export type ResolversTypes = {
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
  JWT: ResolverTypeWrapper<Jwt>,
  Result: ResolverTypeWrapper<Result>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
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
  JWT: Jwt,
  Result: Result,
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type JwtResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWT'] = ResolversParentTypes['JWT']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sender?: Resolver<ResolversTypes['Sender'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  seen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createThread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<MutationCreateThreadArgs, 'name' | 'to' | 'message'>>,
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'threadID' | 'body'>>,
  signUp?: Resolver<ResolversTypes['JWT'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'name' | 'email' | 'password'>>,
  signIn?: Resolver<ResolversTypes['JWT'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>,
  markMessageAsSeen?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationMarkMessageAsSeenArgs, 'id'>>,
  endThread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<MutationEndThreadArgs, 'id'>>,
  deleteThread?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationDeleteThreadArgs, 'id'>>,
  enableTotp?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationEnableTotpArgs, 'secret' | 'token'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  threads?: Resolver<Array<ResolversTypes['Thread']>, ParentType, ContextType>,
  thread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType, RequireFields<QueryThreadArgs, 'threadID'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  onboardTotp?: Resolver<ResolversTypes['TotpOnboarding'], ParentType, ContextType>,
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type TotpOnboardingResolvers<ContextType = any, ParentType extends ResolversParentTypes['TotpOnboarding'] = ResolversParentTypes['TotpOnboarding']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  JWT?: JwtResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Result?: ResultResolvers<ContextType>,
  Thread?: ThreadResolvers<ContextType>,
  TotpOnboarding?: TotpOnboardingResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;