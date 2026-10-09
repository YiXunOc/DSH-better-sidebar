import type { Context } from '../context-types.ts'

export interface MainSessionBinding {
  readonly props?: { readonly sessionId?: string }
}

export interface SessionSource<T> {
  getSnapshot(): T
  subscribe(listener: () => void): () => void
}

export const EMPTY_MAIN_SESSION: MainSessionBinding = Object.freeze({ props: Object.freeze({}) })
export const EMPTY_SESSION_SUBSCRIBE = (): (() => void) => () => {}

export function mainSessionSource(ctx: Context): SessionSource<MainSessionBinding> | undefined {
  try {
    return ctx.get('uiSession')?.adapter.current as SessionSource<MainSessionBinding> | undefined
  } catch {
    return undefined
  }
}

export function activeSessionId(ctx: Context): string | undefined {
  const binding = mainSessionSource(ctx)?.getSnapshot()
  return binding?.props?.sessionId ?? ctx.sessions.list.getSnapshot().current
}