#!/bin/bash
# Deploy Softball Dynasty Hub to Ubuntu server
# Run this from WSL

set -e

REMOTE_USER="bobby"
REMOTE_HOST="192.168.1.154"
REMOTE_PATH="/var/www/softball.softballdynasty.com"
LOCAL_PATH="/mnt/c/softball"

echo "=== Softball Dynasty Hub Deployment ==="
echo ""

# Step 1: Create directory on remote if it doesn't exist
echo "[1/6] Creating remote directory..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "sudo mkdir -p ${REMOTE_PATH} && sudo chown ${REMOTE_USER}:${REMOTE_USER} ${REMOTE_PATH}"

# Step 2: Copy app files
echo "[2/6] Copying app files..."
scp -r ${LOCAL_PATH}/app.py ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/
scp -r ${LOCAL_PATH}/requirements.txt ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/
scp -r ${LOCAL_PATH}/templates ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/
scp -r ${LOCAL_PATH}/static ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

# Step 3: Create directories on remote
echo "[3/6] Creating directories..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}/logs"

# Step 4: Setup Python venv and install deps
echo "[4/6] Setting up Python environment..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"

# Step 5: Copy systemd service
echo "[5/6] Installing systemd service..."
scp ${LOCAL_PATH}/deploy/softball.service ${REMOTE_USER}@${REMOTE_HOST}:/tmp/
ssh ${REMOTE_USER}@${REMOTE_HOST} "sudo mv /tmp/softball.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable softball"

# Step 6: Copy nginx config
echo "[6/6] Installing nginx configuration..."
scp ${LOCAL_PATH}/deploy/softball.softballdynasty.com.nginx ${REMOTE_USER}@${REMOTE_HOST}:/tmp/
ssh ${REMOTE_USER}@${REMOTE_HOST} "sudo mv /tmp/softball.softballdynasty.com.nginx /etc/nginx/sites-available/softball.softballdynasty.com && sudo ln -sf /etc/nginx/sites-available/softball.softballdynasty.com /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx"

echo ""
echo "=== Deployment complete! ==="
echo ""
echo "Next steps:"
echo "1. Start the service: ssh ${REMOTE_USER}@${REMOTE_HOST} 'sudo systemctl start softball'"
echo "2. Check status: ssh ${REMOTE_USER}@${REMOTE_HOST} 'sudo systemctl status softball'"
echo "3. Add DNS CNAME: softball -> minecraft-holla.duckdns.org"
echo "4. Setup SSL: ssh ${REMOTE_USER}@${REMOTE_HOST} 'sudo certbot --nginx -d softball.softballdynasty.com'"
echo ""
echo "App URL: https://softball.softballdynasty.com"
