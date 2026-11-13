import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEST_API_URL;

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const pathString = resolvedParams.path.join('/');
  const searchParams = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/${pathString}${searchParams}`;

  // 1. Gather headers from the incoming browser request (especially Cookies)
  const headers = new Headers();
  const cookie = req.headers.get('cookie');
  if (cookie) headers.set('cookie', cookie);

  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  // 2. Extract body for methods that support it
  let body: BodyInit | undefined = undefined;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    body = await req.arrayBuffer(); // Handles JSON, FormData, or raw binary safely
  }

  try {
    // 3. Forward request to your NestJS backend on Render
    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      // @ts-expect-error - duplex is required in Node fetch for streaming body
      duplex: 'half',
    });

    const responseBody = await backendRes.arrayBuffer();
    const responseHeaders = new Headers();

    // 4. Forward important headers back (Crucial for Set-Cookie / HttpOnly cookies)
    const setCookie = backendRes.headers.get('set-cookie');
    if (setCookie) {
      responseHeaders.set('set-cookie', setCookie);
    }

    const resContentType = backendRes.headers.get('content-type');
    if (resContentType) {
      responseHeaders.set('content-type', resContentType);
    }

    return new NextResponse(responseBody, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Proxy failed to reach backend server' },
      { status: 502 }
    );
  }
}

// Export handlers for all HTTP methods
export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PUT,
  handleProxy as PATCH,
  handleProxy as DELETE,
};