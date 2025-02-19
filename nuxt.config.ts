import path from "path";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@vee-validate/nuxt", "nuxt-quasar-ui", "@nuxt/eslint"],
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
    devStorage: {
      db: {
        driver: "fs",
        base: "./data/db",
      },
    },
  },

  runtimeConfig: {
    dbStorage: "data:database",
    serverAssets: "assets:server",
    public: {
      apiBase: "/api",
      maxFileSize: 2 * 1024 * 1024,
    },
  },

  compatibilityDate: "2024-07-26",
});