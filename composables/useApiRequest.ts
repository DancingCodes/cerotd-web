import type { ApiResponse } from '#shared/api'

export async function apiFetch<T>(request: string, options: Record<string, unknown> = {}) {
  const response = await $fetch<ApiResponse<T>>(request, {
    ...options,
    baseURL: import.meta.dev ? undefined : useRuntimeConfig().public.adminApiOrigin
  })
  if (response.code !== 200) throw response
  return response.data
}

export function useApiFetch<T>(request: any, options: Record<string, any> = {}) {
  return useFetch<T>(request, {
    ...options,
    baseURL: import.meta.server ? useRuntimeConfig().adminApiOrigin : undefined,
    transform: (response: ApiResponse<T>) => {
      if (response.code !== 200) {
        if (import.meta.client) {
          useToast().add({ title: response.msg, color: 'error' })
        }
        throw response
      }
      return response.data
    }
  } as any)
}
