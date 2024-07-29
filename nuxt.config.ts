import path from "path";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-quasar-ui",
    "@hebilicious/vue-query-nuxt"
  ],
  devtools: { enabled: true },

  app: {
    head: {
      title: "Candidates CRM",
      titleTemplate: "%s | Candidates CRM",
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  quasar: {
    plugins: ["Notify"],
  },

  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        port: 6379,
        host: "127.0.0.1",
        username: "",
        password: "",
        db: 0,
        tls: {}
      }
    },
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db'
      }
    },
  },

  runtimeConfig: {
    dbStorage: 'data:database',
    public: {
      apiBase: "/api",
      maxFileSize: 2 * 1024 * 1024,
    },
  },

  compatibilityDate: "2024-07-26",
});
