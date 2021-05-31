import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { googleAuthentication } from '@/lib/context/actions'
import { useAppDispatch } from '@/lib/context'

function GooglePage({ query }) {
  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    async function init() {
      await googleAuthentication(dispatch, query.access_token)
      router.push('/')
    }
    init()
  }, [])

  return (
    <div className='d-flex justify-content-center'>
      <p>Authenticating Google Account</p>
    </div>
  )
}

GooglePage.getInitialProps = (ctx) => {
  return { query: ctx.query }
}

export default GooglePage
