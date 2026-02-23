export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);

    // 1. Handle Login POST Request
    if (request.method === 'POST' && url.pathname === '/prelaunch-login') {
        const formData = await request.formData();
        const password = formData.get('password');

        if (password === env.PREVIEW_PASSWORD) {
            // Correct password -> set Session Cookie and redirect to root
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/',
                    'Set-Cookie': 'elya_prelaunch_session=granted; HttpOnly; Secure; SameSite=Strict; Path=/'
                }
            });
        } else {
            // Wrong password -> redirect back with error param
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/?error=1'
                }
            });
        }
    }

    // 2. Check for Session Cookie
    const cookieHeader = request.headers.get('Cookie') || '';
    const hasAccess = cookieHeader.includes('elya_prelaunch_session=granted');

    // If accessed granted, serve the normal site
    if (hasAccess) {
        return next();
    }

    // 3. Otherwise, serve the Pre-Launch Gate HTML
    const isError = url.searchParams.has('error');

    const gateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ELYA – Launching soon</title>
    <style>
        :root {
            --bg: #000000;
            --text: #ffffff;
            --border: #333333;
            --font: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html {
            height: 100%; background-color: var(--bg); color: var(--text);
            font-family: var(--font); display: flex;
            justify-content: center; align-items: center;
        }
        .gate-container {
            text-align: center; max-width: 400px; padding: 2rem; width: 100%;
        }
        h1 {
            font-weight: 300; letter-spacing: 0.15em; font-size: 28px; margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        p {
            font-size: 13px; color: #888; letter-spacing: 0.05em; margin-bottom: 2.5rem; text-transform: uppercase;
        }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input[type="password"] {
            padding: 14px; background: transparent; border: 1px solid var(--border);
            color: var(--text); font-size: 14px; text-align: center;
            outline: none; transition: border-color 0.3s ease; letter-spacing: 0.05em;
        }
        input[type="password"]::placeholder { color: #555; }
        input[type="password"]:focus { border-color: var(--text); }
        button {
            padding: 14px; background: var(--text); color: var(--bg);
            border: none; text-transform: uppercase; letter-spacing: 0.1em;
            font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.3s ease;
        }
        button:hover { opacity: 0.8; }
        .error {
            color: #ff4a4a; font-size: 12px; margin-bottom: 1.5rem;
            letter-spacing: 0.05em;
        }
    </style>
</head>
<body>
    <div class="gate-container">
        <h1>Elya</h1>
        <p>Private Access</p>
        ${isError ? '<div class="error">Incorrect password.</div>' : ''}
        <form action="/prelaunch-login" method="POST">
            <input type="password" name="password" placeholder="Enter Password" required>
            <button type="submit">Enter</button>
        </form>
    </div>
</body>
</html>
  `;

    return new Response(gateHTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
}
