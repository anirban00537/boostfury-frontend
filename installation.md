# Complete Server Setup Guide for BuildSocialPost

## Initial Setup and Nginx Installation

1. Update the system and install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

2. Verify the installation:

```bash
nginx -v
```

3. Start Nginx and enable it to start on boot:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

4. Check Nginx status:

```bash
sudo systemctl status nginx
```

5. Configure firewall to allow Nginx traffic:

```bash
sudo ufw allow 'Nginx Full'
```

6. Verify firewall status:

```bash
sudo ufw status
```

7. Create Nginx server blocks for backend and frontend:

For backend (api.buildsocialpost.com):

```bash
sudo nano /etc/nginx/sites-available/api.buildsocialpost.com
```

Add the following content:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.buildsocialpost.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.buildsocialpost.com;

    ssl_certificate /etc/letsencrypt/live/api.buildsocialpost.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.buildsocialpost.com/privkey.pem;

    root /var/www/api.buildsocialpost.com;
    index index.html;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
```

For frontend (buildsocialpost.com):

```bash
sudo nano /etc/nginx/sites-available/buildsocialpost.com
```

Add the following content:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name buildsocialpost.com www.buildsocialpost.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name buildsocialpost.com www.buildsocialpost.com;

    ssl_certificate /etc/letsencrypt/live/buildsocialpost.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/buildsocialpost.com/privkey.pem;

    root /var/www/buildsocialpost.com;
    index index.html;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
```

8. Create symbolic links to enable the sites:

```bash
sudo ln -s /etc/nginx/sites-available/api.buildsocialpost.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/buildsocialpost.com /etc/nginx/sites-enabled/
```

9. Remove the default Nginx configuration:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

10. Create necessary directories:

```bash
sudo mkdir -p /var/www/buildsocialpost.com
sudo mkdir -p /var/www/api.buildsocialpost.com
sudo mkdir -p /var/www/html/.well-known/acme-challenge
```

11. Set proper permissions:

```bash
sudo chown -R www-data:www-data /var/www/buildsocialpost.com
sudo chown -R www-data:www-data /var/www/api.buildsocialpost.com
sudo chown -R www-data:www-data /var/www/html
```

12. Test Nginx configuration:

```bash
sudo nginx -t
```

13. If the test is successful, reload Nginx:

```bash
sudo systemctl reload nginx
```

14. Install Certbot:

```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

15. Obtain SSL certificates:

```bash
sudo certbot --nginx -d buildsocialpost.com -d www.buildsocialpost.com -d api.buildsocialpost.com
```

Follow the prompts to complete the SSL certificate installation.

16. Verify the final Nginx configurations:

```bash
sudo cat /etc/nginx/sites-available/buildsocialpost.com
sudo cat /etc/nginx/sites-available/api.buildsocialpost.com
```

17. Reload Nginx one final time:

```bash
sudo systemctl reload nginx
```

18. Set up automatic renewal for SSL certificates:

```bash
sudo systemctl status certbot.timer
```

This should show that the Certbot timer is active and set to run daily.

19. Test the automatic renewal process:

```bash
sudo certbot renew --dry-run
```

If successful, your SSL certificates will automatically renew when needed.

20. Test your websites by accessing them via HTTPS in a web browser:
    - https://buildsocialpost.com
    - https://www.buildsocialpost.com
    - https://api.buildsocialpost.com

This completes the Nginx installation and configuration process, including SSL setup for both domains.

## PostgreSQL Installation

1. Install PostgreSQL:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. Check PostgreSQL version:

```
psql --version
```

3. Start PostgreSQL service:

```
sudo systemctl start postgresql.service
sudo systemctl status postgresql.service
```

4. Access PostgreSQL and create database:

```
sudo -u postgres psql
CREATE DATABASE buildsocialpost;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE buildsocialpost TO myuser;
\q
```

## Node.js and Yarn Installation

1. Install Node.js version 22.3.0 using nvm (Node Version Manager):

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js 22.3.0
nvm install 22.3.0

# Set the installed version as default
nvm use 22.3.0

# Verify the installed version
node --version
```

2. Install Yarn:

```bash
npm install -g yarn
```

3. Verify installations:

```bash
node --version
npm --version
yarn --version
```

## tmux Installation

tmux is a terminal multiplexer that allows you to run multiple terminal sessions within a single window. It's useful for managing long-running processes on a remote server.

1. Install tmux:

```bash
sudo apt update
sudo apt install tmux
```

2. Verify the installation:

```bash
tmux -V
```

3. Basic tmux usage:

- Create a new session:
  ```bash
  tmux new -s session_name
  ```

- Detach from a session:
  Press `Ctrl+B`, then `D`

- List all sessions:
  ```bash
  tmux ls
  ```

- Attach to a session:
  ```bash
  tmux attach -t session_name
  ```

- Kill a session:
  ```bash
  tmux kill-session -t session_name
  ```

## Nginx Installation and Configuration

1. Install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

2. Verify the installation:

```bash
nginx -v
```

3. Start Nginx and enable it to start on boot:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

4. Check Nginx status:

```bash
sudo systemctl status nginx
```

5. Configure firewall to allow Nginx traffic:

```bash
sudo ufw allow 'Nginx Full'
```

6. Verify firewall status:

```bash
sudo ufw status
```

7. Create Nginx server blocks for backend and frontend:

For backend (api.buildsocialpost.com):

```bash
sudo nano /etc/nginx/sites-available/api.buildsocialpost.com
```

Add the following content:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.buildsocialpost.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.buildsocialpost.com;

    ssl_certificate /etc/letsencrypt/live/api.buildsocialpost.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.buildsocialpost.com/privkey.pem;

    root /var/www/api.buildsocialpost.com;
    index index.html;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
```

For frontend (buildsocialpost.com):

```bash
sudo nano /etc/nginx/sites-available/buildsocialpost.com
```

Add the following content:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name buildsocialpost.com www.buildsocialpost.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name buildsocialpost.com www.buildsocialpost.com;

    ssl_certificate /etc/letsencrypt/live/buildsocialpost.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/buildsocialpost.com/privkey.pem;

    root /var/www/buildsocialpost.com;
    index index.html;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
```

8. Create symbolic links to enable the sites:

```bash
sudo ln -s /etc/nginx/sites-available/api.buildsocialpost.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/buildsocialpost.com /etc/nginx/sites-enabled/
```

9. Test Nginx configuration:

```bash
sudo nginx -t
```

10. If the test is successful, reload Nginx:

```bash
sudo systemctl reload nginx
```

11. Set up SSL certificates using Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d buildsocialpost.com -d api.buildsocialpost.com
```

Follow the prompts to complete the SSL certificate installation.

12. After SSL installation, your Nginx configurations will be automatically updated. Verify the changes:

```bash
sudo cat /etc/nginx/sites-available/buildsocialpost.com
sudo cat /etc/nginx/sites-available/api.buildsocialpost.com
```

Both files should now include SSL configuration and redirects from HTTP to HTTPS.

13. Test Nginx configuration again and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

14. Set up automatic renewal for SSL certificates:

```bash
sudo systemctl status certbot.timer
```

This should show that the Certbot timer is active and set to run daily.

15. Test the automatic renewal process:

```bash
sudo certbot renew --dry-run
```

If successful, your SSL certificates will automatically renew when needed.

With these steps completed, Nginx should be properly installed, configured, and set up with SSL certificates for both your backend and frontend applications.

## Backend Setup

1. Prepare the directory for cloning:

```bash
cd /var/www/
mkdir api.buildsocialpost.com && cd api.buildsocialpost.com
```

2. Clone the backend repository:

```bash
git clone git@github.com:anirban00537/buildsocialpost-nestjs.git .
```

   If you encounter an error about the destination path already existing, you may need to clear the directory first:

```bash
rm -rf * .*
git clone git@github.com:anirban00537/buildsocialpost-nestjs.git .
```

   Note: Be careful with the rm command as it will delete all files in the current directory.

3. Set up environment variables:

```bash
cp .env.example .env
nano .env
```

4. Update the `.env` file with the following content:

```
ACCESS_TOKEN_EXPIRY=90d
ACCESS_TOKEN_SECRET=nestjsjwtAccessSecret
API_SECRET=XPIkKM5C6JgyAWCfNfjPIkKM5C6JgyAWZifz3Gj1GRM9toJ87zpsF
APP_PORT=3000
BACKEND_URL=https://api.buildsocialpost.com
CORS_ORIGIN=https://buildsocialpost.com,https://api.buildsocialpost.com
DATABASE_URL=postgresql://postgres:asdkajs800isdofijsdfo4654@localhost:5432/buildsocialpost
DB_HOST=localhost
DB_NAME=buildsocialpost
DB_PASSWORD=asdkajs800isdofijsdfo4654
DB_PORT=5432
DB_SCHEMA=public
DB_USERNAME=postgres
FRONTEND_URL=https://buildsocialpost.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SIGNATURE=theSuperSecretKey
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
LEMONSQUEEZY_STORE_ID=123869
LEMONSQUEEZY_WEBHOOK_SIGNATURE=your_lemonsqueezy_webhook_signature
MAIL_ENCRYPTION=tls
MAIL_FROM_NAME=BuildSocialPost
MAIL_HOST=smtp.example.com
MAIL_MAILER=smtp
MAIL_PASSWORD=your_mail_password
MAIL_PORT=587
MAIL_USERNAME=your_mail_username
MAX_FILES_UPLOAD_COUNT=10
MONTHLY_PRODUCT_ID=527124
NODE_VERSION=20.3.0
OPENAI_API_KEY=your_openai_api_key
REDIS_DATABASE=0
REDIS_HOST=localhost
REDIS_PASSWORD=
REDIS_PORT=6379
REDIS_USERNAME=
REFRESH_TOKEN_EXPIRY=90d
REFRESH_TOKEN_SECRET=nestjsjwtRefreshSecret
REQUEST_LIMIT_PER_MINUTE=60
UPLOAD_DIR='./uploads'
YEARLY_PRODUCT_ID=527139
MAIL_FROM_ADDRESS=noreply@buildsocialpost.com
```

5. Install dependencies and set up database:

```
yarn install
yarn prisma:migrate
yarn prisma:seed
yarn build
```

6. Start the backend using tmux:

```bash
# Create a new tmux session for the backend
tmux new-session -s buildsocialpostAPI

# Once inside the tmux session, navigate to the backend directory and start the server
cd /var/www/api.buildsocialpost.com
yarn start:prod

# To detach from the session, press Ctrl+B, then D
```

7. Check if the backend is running:

```bash
curl localhost:3000
```

## Frontend Setup

1. Prepare the directory for cloning:

```bash
cd /var/www/
mkdir buildsocialpost.com && cd buildsocialpost.com
```

2. Ensure you have SSH keys set up on your server and added to your GitHub account. If not, generate and add SSH keys:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
cat ~/.ssh/id_rsa.pub
```

   Copy the output and add it to your GitHub account under Settings > SSH and GPG keys.

3. Clone the frontend repository using SSH:

```bash
git clone git@github.com:anirban00537/buildsocialpost.git .
```

   If you encounter an error about the destination path already existing, you may need to clear the directory first:

```bash
rm -rf * .*
git clone git@github.com:anirban00537/buildsocialpost.git .
```

   Note: Be careful with the rm command as it will delete all files in the current directory.

4. Set up environment variables:

```bash
cp .env.example .env
nano .env
```

5. Update the `.env` file with the following content:

```
NEXT_PUBLIC_LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=123869
NEXT_PUBLIC_LEMONSQUEEZY_WEBHOOK_SIGNATURE=your_lemonsqueezy_webhook_signature
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_MONTHLY_PRODUCT_ID=527124
NEXT_PUBLIC_YEARLY_PRODUCT_ID=527139
DATABASE_URL=postgresql://your_db_user:your_db_password@localhost:5432/buildsocialpost
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXT_PUBLIC_API_URL=http://api.buildsocialpost.com/api
NEXT_PUBLIC_API_SECRET=your_api_secret
```

   Replace the placeholder values (like `your_lemonsqueezy_api_key`, `your_openai_api_key`, etc.) with your actual secret values. Make sure to keep these values confidential and never commit them to version control.

   Note: For production, you should use `https://api.buildsocialpost.com/api` as the `NEXT_PUBLIC_API_URL`.

6. Install dependencies and build:

```bash
yarn install
yarn build
```

7. Start the frontend using tmux:

```bash
# Create a new tmux session for the frontend
tmux new-session -s buildsocialpostFrontend

# Once inside the tmux session, navigate to the frontend directory and start the server
cd /var/www/buildsocialpost.com
yarn start

# To detach from the session, press Ctrl+B, then D
```

8. Check if the frontend is running:

```bash
curl localhost:3001
```

9. Configure Nginx for the frontend:

```
sudo nano /etc/nginx/sites-available/buildsocialpost.com
```

10. Add the following content:

```nginx
server {
    listen 80;
    server_name buildsocialpost.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

11. Enable the new site:

```
sudo ln -s /etc/nginx/sites-available/buildsocialpost.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate Installation

1. Install Certbot:

```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

2. Obtain and install SSL certificates:

```
sudo certbot --nginx
```

3. Test automatic renewal:

```
sudo certbot renew --dry-run
```

## Additional tmux Commands

Here are some useful tmux commands for managing your sessions:

- List all tmux sessions:
  ```bash
  tmux ls
  ```

- Attach to a specific session:
  ```bash
  tmux attach-session -t buildsocialpostAPI
  tmux attach-session -t buildsocialpostFrontend
  ```

- Detach from a session (when attached):
  Press `Ctrl+B`, then `D`

- Kill a specific session:
  ```bash
  tmux kill-session -t buildsocialpostAPI
  tmux kill-session -t buildsocialpostFrontend
  ```

- View tmux session logs:
  ```bash
  tmux capture-pane -t buildsocialpostAPI -S - -E - -p > backend_log.txt
  tmux capture-pane -t buildsocialpostFrontend -S - -E - -p > frontend_log.txt
  ```

Remember to set up these tmux sessions to start automatically on system boot for production environments.

## Database User Setup

After setting up PostgreSQL, you need to create a superuser for your application:

1. Connect to PostgreSQL as the postgres superuser:

   ```bash
   sudo -u postgres psql
   ```

2. Generate a strong, random password (do not share or store this insecurely):

   ```bash
   openssl rand -base64 20
   ```

   Save this password securely; you'll need it for the next steps and your `.env` file.

3. Create a new superuser named 'anirban' (replace 'your_generated_password' with the actual password):

   ```sql
   CREATE USER anirban WITH PASSWORD 'your_generated_password';
   ALTER USER anirban WITH SUPERUSER;
   ```

4. Grant all privileges on the 'buildsocialpost' database to 'anirban':

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE buildsocialpost TO anirban;
   ```

5. Verify the new user has been created:

   ```sql
   \du
   ```

   You should see 'anirban' listed with superuser privileges.

6. Exit the PostgreSQL prompt:

   ```sql
   \q
   ```

7. Update your `.env` file with the new credentials:

   ```bash
   nano .env
   ```

   Update the following lines (replace 'your_generated_password' with the actual password):

   ```
   DB_USERNAME=anirban
   DB_PASSWORD=your_generated_password
   DATABASE_URL=postgresql://anirban:your_generated_password@localhost:5432/buildsocialpost
   ```

8. Save and close the `.env` file.

After completing these steps, you can proceed with running your Prisma migrations and starting your application.

## Updating and Redeploying

To update your application with the latest changes from the repository, follow these steps for both the backend and frontend:

### Backend Update

1. Attach to the backend tmux session:

   ```bash
   tmux attach-session -t buildsocialpostAPI
   ```

2. Once attached, stop the current process by pressing `Ctrl+C`.

3. Pull the latest changes, install dependencies, rebuild, and restart:

   ```bash
   git pull origin main
   yarn install
   yarn prisma:migrate
   yarn build
   yarn start:prod
   ```

4. Detach from the tmux session by pressing `Ctrl+B`, then `D`.

### Frontend Update

1. Attach to the frontend tmux session:

   ```bash
   tmux attach-session -t buildsocialpostFrontend
   ```

2. Once attached, stop the current process by pressing `Ctrl+C`.

3. Pull the latest changes, install dependencies, rebuild, and restart:

   ```bash
   git pull origin main
   yarn install
   yarn build
   yarn start
   ```

4. Detach from the tmux session by pressing `Ctrl+B`, then `D`.

### Quick Update Script

For convenience, you can create a script to automate this process. Create a file named `update_app.sh` in your home directory:

```bash
nano ~/update_app.sh
```

Add the following content:

```bash
#!/bin/bash

# Update Backend
tmux send-keys -t buildsocialpostAPI C-c
tmux send-keys -t buildsocialpostAPI "cd /var/www/api.buildsocialpost.com && git pull origin main && yarn install && yarn prisma:migrate && yarn build && yarn start:prod" C-m

# Update Frontend
tmux send-keys -t buildsocialpostFrontend C-c
tmux send-keys -t buildsocialpostFrontend "cd /var/www/buildsocialpost.com && git pull origin main && yarn install && yarn build && yarn start" C-m

echo "Update process initiated for both backend and frontend."
```

Make the script executable:

```bash
chmod +x ~/update_app.sh
```

To update both backend and frontend, simply run:

```bash
~/update_app.sh
```

This script will automatically stop the current processes, pull updates, rebuild, and restart both the backend and frontend applications.

Remember to check the tmux sessions after running the script to ensure everything started correctly:

```bash
tmux attach-session -t buildsocialpostAPI
tmux attach-session -t buildsocialpostFrontend
```

You can detach from each session using `Ctrl+B`, then `D`.
