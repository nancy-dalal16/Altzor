import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const draft = await draftMode()
  draft.disable()
  
  const url = new URL(request.url)
  const returnTo = url.searchParams.get('returnTo') || '/'
  
  redirect(returnTo)
}
