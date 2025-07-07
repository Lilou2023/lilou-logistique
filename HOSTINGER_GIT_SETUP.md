# 🚀 Hostinger Deployment Guide

This unified guide explains how to connect GitHub with Hostinger and deploy the static build of **lilou-logistique**.

## 1. Add the Hostinger SSH key to GitHub

1. Copy the SSH key provided by Hostinger.
2. On GitHub, open `Settings → Deploy keys` in your repository.
3. Click **Add deploy key**, name it `Hostinger - lilou-logistique.com`, paste the key and check **Allow write access**.

## 2. Prepare your repository

```bash
# From your local machine if the repo does not exist yet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Lilou2023/lilou-logistique.git
git push -u origin main
```

## 3. Configure Git deployment in Hostinger

Fill in the Git deployment form in Hostinger with:

- **Repository**: `git@github.com:Lilou2023/lilou-logistique.git`
- **Branch**: `hostinger-deploy`
- **Directory**: _(leave empty)_

Hostinger will pull the branch whenever it changes.

## 4. Automatic workflow

A GitHub Actions workflow builds the project and updates `hostinger-deploy` every time you push to `main`:

1. Build the static site with `next export`.
2. Commit the result to `hostinger-deploy`.
3. Hostinger detects the new commit and deploys.

## 5. Manual commands

First deployment may require creating the branch:

```bash
git checkout -b hostinger-deploy
git push origin hostinger-deploy
git checkout main
```

To force a rebuild:

```bash
git commit --allow-empty -m "Force rebuild"
git push origin main
```

## 6. Advanced usage

The workflow file `.github/workflows/deploy-hostinger.yml` can be customised to pass environment variables or additional build steps. Only `NEXT_PUBLIC_*` variables are available on shared hosting.

---

Your site is now deployed automatically on `https://lilou-logistique.com` whenever you push to `main`.
