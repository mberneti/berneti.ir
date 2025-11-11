# Domain Redirect Options for berneti.ir → www.berneti.ir

## Comparison of Approaches

| Approach | Pros | Cons | Efficiency | Recommended |
|----------|------|------|------------|-------------|
| **1. Platform Load Balancer** | ✅ No code changes<br>✅ Managed SSL<br>✅ Best performance<br>✅ Simplest | ❌ Platform-dependent | ⭐⭐⭐⭐⭐ | **YES** |
| **2. Cloudflare Page Rules** | ✅ Free<br>✅ CDN benefits<br>✅ DDoS protection<br>✅ No server changes | ❌ Requires Cloudflare | ⭐⭐⭐⭐⭐ | **YES** |
| **3. Nginx Sidecar Container** | ✅ Follows Docker best practices<br>✅ Flexible | ❌ More complex setup<br>❌ Need orchestration | ⭐⭐⭐⭐ | Maybe |
| **4. Nginx in Same Container** | ✅ Simple Dockerfile | ❌ Against Docker principles<br>❌ Larger image<br>❌ Harder to debug | ⭐⭐ | NO |
| **5. Application-level Redirect** | ✅ No infrastructure changes<br>✅ Portable | ❌ Wasted app resources<br>❌ Extra latency | ⭐⭐⭐ | Maybe |

## Option 1: Platform Load Balancer (Hamravesh/Darkube)

**BEST OPTION** - Check if Darkube provides:
- Domain/subdomain redirects in their dashboard
- Load balancer rules
- Ingress controller configuration

### Steps:
1. Log into Hamravesh/Darkube dashboard
2. Configure domain aliases
3. Add redirect rule: `berneti.ir` → `www.berneti.ir`
4. Keep your app simple (just Dockerfile, no nginx)

**Benefit**: Your app just serves content on port 3030, platform handles routing.

---

## Option 2: Cloudflare Page Rules (FREE)

**HIGHLY RECOMMENDED** - Best if you use Cloudflare DNS

### Setup:

1. **Point DNS to Cloudflare** (if not already):
   - Change nameservers to Cloudflare
   - Add A records for both `berneti.ir` and `www.berneti.ir`

2. **Create Page Rule** (Free plan includes 3 rules):
   ```
   Rule: http://berneti.ir/*
   Setting: Forwarding URL (301 - Permanent Redirect)
   Destination: https://www.berneti.ir/$1
   ```

   ```
   Rule: https://berneti.ir/*
   Setting: Forwarding URL (301 - Permanent Redirect)
   Destination: https://www.berneti.ir/$1
   ```

3. **Benefits**:
   - ✅ Free SSL/TLS
   - ✅ CDN caching
   - ✅ DDoS protection
   - ✅ Web Application Firewall (WAF)
   - ✅ Analytics
   - ✅ No server-side changes needed

---

## Option 3: Nginx Sidecar Container (Docker Best Practice)

If platform doesn't support redirects, use separate containers:

### Structure:
```
┌─────────────────┐
│  Nginx          │  Port 80/443
│  (Proxy/Redir)  │
└────────┬────────┘
         │
         ↓
┌────────┴────────┐
│  Your App       │  Port 3030
│  (React Router) │
└─────────────────┘
```

### Files needed:
- Keep your original `Dockerfile` (just the app)
- Create separate nginx container
- Use Docker networking

**Not recommended for Darkube** unless they support multi-container deployments.

---

## Option 4: Application-Level Redirect

Add redirect logic to your React Router app:

### Implementation:

1. Create middleware file: `src/middleware/redirect.ts`
```typescript
export function redirectMiddleware(request: Request): Response | null {
  const url = new URL(request.url);

  // Redirect root domain to www
  if (url.hostname === 'berneti.ir') {
    const newUrl = new URL(request.url);
    newUrl.hostname = 'www.berneti.ir';
    return Response.redirect(newUrl.toString(), 301);
  }

  return null;
}
```

2. Update `src/entry.server.tsx`:
```typescript
import { redirectMiddleware } from './middleware/redirect';

export default async function handleRequest(
  request: Request,
  // ... other params
) {
  // Check for redirect first
  const redirectResponse = redirectMiddleware(request);
  if (redirectResponse) return redirectResponse;

  // ... rest of your handler
}
```

**Pros**:
- ✅ Works everywhere
- ✅ No infrastructure changes
- ✅ Portable

**Cons**:
- ❌ App handles redirect (wastes resources)
- ❌ Extra latency
- ❌ Less efficient than platform/CDN redirect

---

## Option 5: Arvan Cloud / Other Iranian CDN

If Cloudflare is slow in Iran, consider:

- **Arvan Cloud** - Iranian CDN with similar features
- **Derak** - Another Iranian option
- Both support redirect rules similar to Cloudflare

---

## My Recommendation for Your Setup:

### 1st Choice: **Cloudflare or Arvan Cloud**
```
✅ No code changes
✅ Keep simple Dockerfile
✅ Free SSL + CDN
✅ Redirect at edge (fastest)
```

### 2nd Choice: **Check Darkube Dashboard**
```
✅ Platform-native solution
✅ Managed by hosting provider
✅ No additional cost
```

### 3rd Choice: **Application-Level Redirect**
```
✅ Quick to implement
✅ Works anywhere
⚠️ Less efficient but acceptable
```

### ❌ AVOID: Nginx-in-Container (current approach)
```
❌ Overcomplicated
❌ Against Docker best practices
❌ Harder to maintain
```

---

## Implementation Guide

### Quick Win: Application-Level Redirect

I can implement this for you right now - it's portable and works everywhere.

### Best Solution: Cloudflare/Arvan

1. Point DNS to Cloudflare/Arvan
2. Configure page rules
3. Keep using your original `Dockerfile`
4. Remove `Dockerfile.nginx` and `nginx.conf`

Which option works best for your infrastructure?
