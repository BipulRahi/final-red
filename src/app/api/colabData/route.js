// app/api/colabData/route.js

import { NextResponse } from 'next/server';

let storedNgrokUrl = null;

export async function POST(req) {
  try {
    const { ngrokUrl } = await req.json();

    if (ngrokUrl) {
      console.log('Received ngrok URL from Colab:', ngrokUrl);
      storedNgrokUrl = ngrokUrl;

      return NextResponse.json({ message: 'ngrok URL received successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'ngrokUrl is missing in the request body' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req) {
  const action = req.nextUrl.searchParams.get('action');

  if (action === 'shutdown') {
    // Handle shutdown request
    if (storedNgrokUrl) {
      try {
        const response = await fetch(`${storedNgrokUrl}/shutdown`);
        if (response.ok) {
          return NextResponse.json({ message: 'Shutdown request sent to Colab' }, { status: 200 });
        } else {
          return NextResponse.json({ error: 'Failed to send shutdown request to Colab' }, { status: response.status });
        }
      } catch (error) {
        console.error('Error sending shutdown request:', error);
        return NextResponse.json({ error: 'Error sending shutdown request' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'ngrok URL not set' }, { status: 404 });
    }
  } else if (action === 'health') {
    // Handle health check request
    if (storedNgrokUrl) {
      try {
        const response = await fetch(`${storedNgrokUrl}/health`);
        if (response.ok) {
          const healthData = await response.json();
          return NextResponse.json(healthData, { status: 200 });
        } else {
          return NextResponse.json({ error: 'Colab health check failed' }, { status: response.status });
        }
      } catch (error) {
        console.error('Error checking Colab health:', error);
        return NextResponse.json({ error: 'Error checking Colab health' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'ngrok URL not set' }, { status: 404 });
    }
  } else {
    // Handle regular GET request (get storedNgrokUrl)
    if (storedNgrokUrl) {
      return NextResponse.json({ ngrokUrl: storedNgrokUrl }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'ngrok URL not found' }, { status: 404 });
    }
  }
}