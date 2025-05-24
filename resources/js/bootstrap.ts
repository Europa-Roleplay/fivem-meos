import axios from 'axios'

// Stuur altijd cookies (zoals XSRF-token / session) mee
axios.defaults.withCredentials = true

// Voeg standaard headers toe
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Gebruik de token die in de <meta> tag zit óf window.csrfToken
const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrfToken
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken