const env = {
  apiUrl: (import.meta.env.VITE_API_URL || '') as string,
}

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing ${key} env variable.`)
  }
})

export default env
