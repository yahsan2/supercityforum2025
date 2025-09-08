export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    const basicAuth = authHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');
    
    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return;
    }
  }
  
  return new Response('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}