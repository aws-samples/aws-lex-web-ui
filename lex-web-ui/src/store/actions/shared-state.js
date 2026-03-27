/*
 * Shared mutable state for action modules.
 * These non-state variables may be mutated outside of the Vuex store
 * and are set via initializers at run time.
 */

const sharedState = {
  awsCredentials: undefined,
  refreshCredentials: true,
  pollyClient: undefined,
  lexClient: undefined,
  audio: undefined,
  recorder: undefined,
  liveChatSession: undefined,
  wsClient: undefined,
  identityId: undefined,
  logins: undefined,
};

export default sharedState;
