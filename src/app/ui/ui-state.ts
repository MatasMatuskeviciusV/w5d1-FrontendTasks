export type UiState<T> = 
    | {status: 'idle'}
    | {status: 'loading'}
    | {status: 'ready'; data: T}
    | {status: 'error'; message: string};