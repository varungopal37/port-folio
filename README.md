# Varun Gopal — Portfolio

Personal portfolio for **Varun Gopal**, Python Backend Engineer (Django / Django REST Framework / MySQL).

**Live site:** https://varun-gopal-portfolio.netlify.app/

This repository is a plain static site — no build step required. `index.html` is self-contained (CSS and JavaScript are inlined), so it renders correctly when opened directly or served by any static host.

## Structure

```
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── favicon.svg
│   └── resume/Varun_Gopal_Resume.pdf
├── netlify.toml
└── README.md
```

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on Netlify

- **Build command:** *(none)*
- **Publish directory:** `.` (repo root)
- Or drag-and-drop the folder in the Netlify UI / connect this GitHub repo.

`netlify.toml` already sets the publish directory and basic security/cache headers.

## Design

API-documentation theme (Postman/Swagger-inspired): each section is presented as an endpoint
(`GET /profile`, `GET /skills`, `GET /experience`, `POST /contact`), reflecting backend work.

Content is sourced directly from Varun's résumé — no inflated claims or invented metrics.
