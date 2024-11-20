// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},

    runtimeConfig: {
        oauth: {
            google: {
                clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
                redirectURL: process.env.NUXT_OAUTH_GOOGLE_REDIRECT_URL || 'http://localhost:3000/api/auth/google',
            },
        },
        oauthSecret: {
            google: {
                clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
            },
        },
    },


    nitro: {
        experimental: {
            database: true
        }
    },
    modules: ['nuxt-auth-utils'],

})