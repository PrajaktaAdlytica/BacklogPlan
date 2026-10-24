# Hostinger PHP/HTML hosting — BacklogPlan

This is a React frontend compiled to static HTML, CSS, JavaScript, fonts and video. It does not need PHP code, a Node.js server, a database, or a Node.js web-app slot. Use an ordinary PHP/HTML website on a web/cloud hosting plan. You still need an available regular website slot: domain registration alone is not hosting.

## Branches

- `main`: editable source, build configuration and GitHub Actions workflow. Do not deploy this branch directly to public_html.
- `hostinger`: compiled files at the branch root, including index.html, assets/, intro/ and .htaccess. Select this branch in Hostinger.

Every push to main triggers the Build Hostinger site workflow. It installs dependencies, builds and checks the website, then updates hostinger. Hostinger's generic Git integration serves repository files as-is; it does not run npm builds. No Hostinger credentials are required by this workflow.

## Connect the site

1. In hPanel, open Websites and choose Create website → Custom PHP/HTML website → Start with an empty website under your web/cloud hosting plan. Do not choose Node.js or Website Builder. Choose the domain you already own. If you already have an empty PHP/HTML website for this domain, use it.
2. Open that website's Dashboard → Advanced → Git → Connect with GitHub.
3. Authorize Hostinger for the PrajaktaAdlytica/BacklogPlan repository.
4. Select repository BacklogPlan, branch `hostinger`, and deployment/root directory `public_html`.
5. Back up any existing website before replacing it. For an empty new site, remove only its default placeholder if required by the deployment UI; the legacy Git flow requires an empty target.
6. Deploy. Keep automatic deployments enabled. Future changes go to main, then GitHub Actions updates hostinger, then Hostinger pulls the compiled files.
7. Confirm the domain is attached to this hosting website. If hPanel says it is not connected, follow its Connect domain prompts and use the DNS targets shown for this hosting plan. Do not guess an IP address or change mail records.
8. Confirm SSL is active and enable/verify HTTPS. Test the root page, `/products/work-review`, `/demo/planner`, then refresh those deep links. Check the intro video and mobile menu.

The first files inside public_html must be index.html and .htaccess, not an extra dist/client directory. No build/start command or PHP index file is required. The included .htaccess handles React Router deep links on Apache/LiteSpeed.

## If Git is unavailable: ZIP upload

Use the supplied BacklogPlan-Hostinger.zip, or download the BacklogPlan-Hostinger artifact from a successful GitHub Actions run. In hPanel → Files → File Manager → public_html, upload and extract the ZIP directly into public_html, including the hidden .htaccess. Back up the old site first. Do not upload node_modules, src, or the raw main-branch GitHub source ZIP. ZIP uploads are manual; repeat after later builds.

## If only the legacy Git screen is available

Use https://github.com/PrajaktaAdlytica/BacklogPlan.git and branch hostinger. Leave the install-path field empty if that screen says empty means public_html. For a private repository, follow hPanel's deploy-key instructions. The legacy Auto Deployment button supplies a webhook URL to add in GitHub repository settings.

## Limits of this website

The public frontend and synthetic demo work on static hosting. Contact/pilot forms validate locally but do not deliver leads; sign-in has no connected authentication backend. Hosting does not enable these features. No production records or CMMS connections are included.

## Official references

- https://docs.hostinger.com/websites/git
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/

- https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/
- https://www.hostinger.com/support/1863967-how-to-point-a-domain-to-hostinger/
- https://www.hostinger.com/support/1583258-how-to-install-lifetime-ssl-at-hostinger/
