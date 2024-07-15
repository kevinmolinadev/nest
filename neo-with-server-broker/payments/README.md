# Payment Service
The payment service is responsible for managing payments.

## Development
1. Clone the repository
2. Install dependencies using `pnpm install`
3. Create a `.env` file based on `env.example`
4. Run `pnpm start:dev`

## Stripe Webhook Integration

To integrate a webhook with Stripe and receive notifications for events such as `charge.succeeded`, follow these steps:

### Step 1: Set Up Port Forwarding

During development, your application is usually running on a local server. To allow Stripe to communicate with your local server, you need to expose your port over the internet. Use a port forwarding tool to achieve this.

**Recommended Tools:**

- **[Ngrok](https://ngrok.com/):** Ngrok creates a secure tunnel to your local server and provides a public URL. Install it and use the following command to expose your port (replace `PORT` with the port your application is running on):

  ```bash
  ngrok http PORT
  ```

- **[Hookdeck](https://hookdeck.com/):** Hookdeck provides a platform to manage and forward webhook events to your local server. Sign up on their website and configure the event forwarding to your server.

- **[VS Code Port Forwarding](https://code.visualstudio.com/docs/remote/port-forwarding):** If you're using Visual Studio Code, you can configure port forwarding through its Remote - SSH extension.

- **[LocalTunnel](https://localtunnel.github.io/www/):** Another option to expose your local server via a public URL.

### Step 2: Configure the Webhook in Stripe

Once you have the public URL provided by your port forwarding tool, you need to configure it in the Stripe dashboard:

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers** > **Webhooks**.
3. Click on **+ Add endpoint**.
4. Enter the public URL provided by your port forwarding tool, followed by your application's endpoint, as follows:

   ```
   <forwarded-url>/api/payments/order-payment
   ```

5. Select the events you want to receive. To receive notifications when a charge has been successfully completed, select `charge.succeeded`.
6. Save the configuration.

Make sure to replace `'STRIPE_WEBHOOK_SECRET'` with your Stripe secret key and adapt the event handling to fit your application's needs.

### Additional Note

Remember that in a production environment, you should use a secure (HTTPS) URL for webhooks. The port forwarding tools mentioned above are useful for local development, but for production, you should set up a proper server with HTTPS.