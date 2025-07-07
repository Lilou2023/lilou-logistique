# Hostinger Deployment Script

All Hostinger setup and workflow details are now documented in
[`HOSTINGER_GIT_SETUP.md`](../HOSTINGER_GIT_SETUP.md).

This file only explains how to run the deployment helper script.

## Usage

```bash
chmod +x tools/deploy.sh
./tools/deploy.sh
```

The script builds the static output and pushes it to the
`hostinger-deploy` branch which Hostinger pulls automatically.
