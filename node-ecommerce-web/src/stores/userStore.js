import create from 'zustand'

const useStore = create((set) => ({
    isLoggedIn: false,
    user: {
        email: '',
        password: '',
    },
    isAdmin: false,
    initAdminUser: async () => {
        set((state) => ({
            ...state,
            isLoggedIn: true,
            user: {
                email: import.meta.env.VITE_SAMPLE_ADMIN_EMAIL,
                password: import.meta.env.VITE_SAMPLE_ADMIN_PASSWORD,
            },
            isAdmin: true,
        }))
    },
}))

export const useUserStore = useStore
