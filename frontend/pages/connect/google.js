import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { googleAuthentication } from '@/lib/context/actions'
import { useAppDispatch } from '@/lib/context'

function Google({ query }) {
  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    async function init() {
      await googleAuthentication(dispatch, query.access_token)
      router.push('/')
    }
    init()
  }, [])

  return <div>Authenticating Google Account</div>
}

Google.getInitialProps = (ctx) => {
  return { query: ctx.query }
}

export default Google
