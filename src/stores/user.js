import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('userStore', {
  state: () => ({
    user: undefined
  }),

  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      this.user = user
    },

    async signUp({ email, password }) {
      const {
        data: { user },
        error
      } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      if (user) this.user = user
    },

    async signIn({ email, password }) {
      const {
        data: { user },
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      if (user) this.user = user
    },

    async signInWithGoogle() {
      const {
        data: { user },
        error
      } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
      if (error) throw error
      if (user) this.user = user
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
    },

    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
})
