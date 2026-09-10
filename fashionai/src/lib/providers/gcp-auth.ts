import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  project_id?: string;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

function loadServiceAccountKey(): ServiceAccountKey | null {
  // 1. Direct JSON string from env
  if (process.env.GCP_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY);
    } catch {
      // ignore
    }
  }

  // 2. File path from env or default gcp-key.json
  const candidatePaths = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.join(process.cwd(), 'gcp-key.json'),
    path.join(process.cwd(), 'fashionai', 'gcp-key.json'),
  ].filter(Boolean) as string[];

  for (const p of candidatePaths) {
    const fullPath = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
    if (fs.existsSync(fullPath)) {
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse GCP key file at:', fullPath, err);
      }
    }
  }

  return null;
}

/**
 * Returns a valid OAuth 2.0 access token for Google Cloud APIs using the Service Account JSON key.
 */
export async function getGcpAccessToken(): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.token;
  }

  const keyData = loadServiceAccountKey();
  if (!keyData || !keyData.client_email || !keyData.private_key) {
    return null;
  }

  const iat = now;
  const exp = iat + 3600;

  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: exp,
    iat: iat,
  };

  function base64Url(obj: Record<string, unknown>): string {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const sign = crypto.createSign('RSA-SHA256');
  const unsignedToken = `${base64Url(header)}.${base64Url(claimSet)}`;
  sign.update(unsignedToken);
  const signature = sign
    .sign(keyData.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const jwt = `${unsignedToken}.${signature}`;

  const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: postData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to obtain GCP access token: ${errText}`);
  }

  const data = await res.json();
  const token = data.access_token;
  cachedToken = {
    token,
    expiresAt: now + (data.expires_in || 3600),
  };

  return token;
}
