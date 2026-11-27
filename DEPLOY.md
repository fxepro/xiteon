# Deploying xiteon.com on Netlify

The site deploys from the `main` branch of `github.com/fxepro/xiteon`.
Build settings live in `netlify.toml`, so Netlify needs almost no manual configuration.

## 1. Create the site (one time)

1. Sign in at app.netlify.com and choose **Add new project → Import an existing project → GitHub**.
2. Authorize Netlify for GitHub and pick the **fxepro/xiteon** repository.
3. Confirm the settings Netlify reads from `netlify.toml`:

   | Setting | Value |
   |---|---|
   | Branch to deploy | `main` |
   | Base directory | *(leave empty: the repo root is the site)* |
   | Build command | `npm run build` |
   | Publish directory | `.next` |

4. Click **Deploy**. The first build takes 2–4 minutes and gives you a `*.netlify.app` URL.
5. Under **Project configuration → General → Project details**, rename the site (for example `xiteon`) to get a cleaner preview URL.

No environment variables are needed for this version.

## 2. Turn on forms (one time, before the first real submission)

The **Talk to Us** form (`lead`) and the **Join as Expert** form (`apply`) use Netlify Forms.

1. Go to **Forms** in the Netlify dashboard and click **Enable form detection**.
2. Trigger a new deploy (**Deploys → Trigger deploy → Deploy project**). Netlify only registers forms during a deploy that happens after detection is on.
3. Check that **Forms** now lists `lead` and `apply`.
4. Add email alerts under **Forms → Form notifications → Add notification → Email notification**:
   - `lead`: send to the sales or founder inbox.
   - `apply`: send to the recruiting inbox.
5. Submit one test entry on each form from the live site and confirm it appears under **Forms** and arrives by email. Delete the test entries afterwards.

How it works:
- `public/__forms.html` is a hidden static file that tells Netlify which forms and fields exist.
- `src/components/Forms.tsx` posts to `/__forms.html` with the matching form name.
- **If you add or rename a form field, update both files**, or Netlify silently drops the field.
- Spam: a hidden `website` field acts as a honeypot, and Netlify's spam filter is on by default.
- Locally (`npm run dev`), submissions are only logged to the browser console and not sent anywhere.
- Netlify's free plan includes a monthly submission limit. Check the current limit under **Forms → Usage**.

## 3. Connect the domain xiteon.com

1. In Netlify: **Domain management → Add a domain → `xiteon.com`**.
2. Point DNS at Netlify. Choose one:
   - **Netlify DNS (simplest):** change the nameservers at your domain registrar to the four Netlify nameservers shown in the dashboard. Netlify then manages all records.
   - **Keep your current DNS provider:** add the records Netlify shows. Usually that's an `A` record (or `ALIAS`/`ANAME`) for `xiteon.com` pointing to Netlify's load balancer, and a `CNAME` for `www` pointing to `<your-site>.netlify.app`. Use the exact values from the dashboard.
   - **If you have email on this domain** (MX records, for example Google Workspace), recreate the MX, SPF and DKIM records in Netlify DNS before switching nameservers, or keep your current DNS provider.
3. Set `xiteon.com` as the **primary domain**. `netlify.toml` already redirects `www.xiteon.com` to `xiteon.com`.
4. HTTPS: Netlify issues a free Let's Encrypt certificate automatically once DNS resolves. This can take up to 24 hours after a DNS change, but is usually under an hour. Check under **Domain management → HTTPS**.

## 4. Day-to-day publishing

- **Publish a change:** push or merge to `main`. Netlify builds and deploys automatically.
- **Preview a change first:** push to another branch and open a pull request. Netlify posts a Deploy Preview link on the PR.
- **Undo a bad deploy:** **Deploys** → pick the last good deploy → **Publish deploy**. This is instant and needs no code change.
- **Failed builds:** open the deploy in **Deploys** and read the build log. Run `npm run build` locally to reproduce.

## 5. Launch checklist

- [ ] Forms enabled, both forms registered, email notifications set, test submissions received.
- [ ] Domain connected, HTTPS active, `www` redirects to the apex domain.
- [ ] Orange placeholder chips replaced or removed. Search the code for `className="ph"`: pay ranges, stats, case study, team, office, certifications, booking link.
- [ ] `/privacy` reviewed by a lawyer (DPDP Act 2023), with retention period, contact email and grievance officer filled in.
- [ ] Data processing terms with Netlify confirmed, since form data contains personal information.
- [ ] `https://xiteon.com/sitemap.xml` and `/robots.txt` load. Submit the sitemap in Google Search Console.
- [ ] Spot-check every page on a phone.

## Files involved

| File | Purpose |
|---|---|
| `netlify.toml` | Build command, Node version, security headers, `www` redirect |
| `public/__forms.html` | Netlify Forms field definitions |
| `src/components/Forms.tsx` | The two forms and their submit logic |
| `src/app/sitemap.ts`, `src/app/robots.ts` | Search engine files |
