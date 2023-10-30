import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { response } from './response.slice';
import { theme } from './theme.slice';
import { modal } from './modal.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    response: response,
    theme: theme,
    modal: modal
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch