const { VITE_PROJECT_URL, VITE_API_KEY } = import.meta.env

export default {
    supabase: {
        url: VITE_PROJECT_URL,
        key: VITE_API_KEY
    }
}