/// <reference types="@cloudflare/workers-types" />

declare module 'h3' {
  interface H3EventContext {
    cloudflare?: {
      env: {
        DB: D1Database
        ADMIN_API_TOKEN?: string
      }
    }
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NUXT_PUBLIC_SITE_URL?: string
  }
}

export {}
