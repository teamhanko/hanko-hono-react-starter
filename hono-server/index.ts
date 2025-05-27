import { Hono, type Context } from 'hono'
import { getCookie } from 'hono/cookie'
import { cors } from 'hono/cors'

const app = new Hono()

const hankoApiUrl = process.env.HANKO_API_URL

app.use(
    "/*",
    cors({
      origin: "http://localhost:5173", // your frontend URL
      credentials: true,
    })
  );

async function verifyTokenMiddleware(c: Context, next: Function) {
    let token: any = null

    const authHeader = c.req.header('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    } else {
      token = getCookie(c, 'hanko')
    }
  
    if (!token || token.length === 0) {
      console.log('Could not find a token to validate')
      return c.text('Unauthorized', 401)
    }
  
    let authError = false
  
    try {
      const validationOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_token: token }),
      }
  
      const validationResponse = await fetch(
        `${hankoApiUrl}/sessions/validate`,
        validationOptions
      )
  
      if (!validationResponse.ok) {
        authError = true
      } else {
        const validationData : any = await validationResponse.json()
        if (!validationData.is_valid) {
          authError = true
        }
      }
    } catch (error) {
      console.error('Error validating token:', error)
      authError = true
    }
  
    if (authError) {
      console.log('Your token was not valid')
      return c.text('Unauthorized', 401)
    }
  
    console.log('Token validated')
    await next()
}


app.get("/validate", verifyTokenMiddleware, (c) =>
    c.json({ message: "Validation Succesfull" })
);
  


export default {
  port: 5001,
  fetch: app.fetch,
}
