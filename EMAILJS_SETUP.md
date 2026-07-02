# EmailJS Setup Guide for Pradeepan Rakavi's Portfolio

This guide walks you through setting up EmailJS to enable the contact form on your portfolio website.

## What is EmailJS?

EmailJS allows you to send emails directly from your browser without needing a backend server. It's free for up to 200 emails per month, making it perfect for portfolio sites.

## Step-by-Step Setup

### 1. Create an EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/sign-up)
2. Sign up with your email or GitHub/Google account
3. Verify your email address

### 2. Add Email Service

1. In the dashboard, click **"Add New Service"**
2. Select **Gmail** (or your preferred email provider)
3. Click **"Connect Account"** and authorize EmailJS to use your Gmail
   - You may need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
4. Name the service (e.g., "Gmail") and click **"Add Service"**
5. Copy your **Service ID** (looks like: `service_xxxxx`)

### 3. Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Name it something like "Contact Form Template"
4. Set the **To Email** to `pradeeprakavi@gmail.com`
5. Use this template:

```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}
Reply-To: {{reply_to}}

---

{{message}}

---

Best regards,
{{from_name}}
```

6. Copy your **Template ID** (looks like: `template_xxxxx`)

### 4. Get Your Public Key

1. Go to **Account** settings in the top-right
2. Find your **Public Key** under "API Keys"
3. Copy it (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### 5. Update Environment Variables

1. Open the `.env` file in your project root
2. Fill in your credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Save the file

### 6. Restart Your Dev Server

After updating `.env`, restart your Vite dev server:

```bash
npm run dev
```

## Testing the Contact Form

1. Visit your portfolio (http://localhost:5174 or your deployment URL)
2. Click the floating email button in the bottom-right corner
3. Fill out the contact form and click "Send Message"
4. You should receive an email at `pradeeprakavi@gmail.com`

## Testing Emails (Free Plan)

EmailJS provides:
- **Free Plan**: 200 emails/month (perfect for a portfolio site)
- **Upgrade anytime** if you need more emails

## Troubleshooting

### "Failed to send message" Error

1. **Check Environment Variables**: Make sure all three credentials are correctly copied in the `.env` file
2. **Restart Dev Server**: Always restart after changing `.env`
3. **Email Limit**: If you've exceeded your monthly limit, upgrade your plan
4. **Gmail Settings**: Ensure Gmail is properly connected in EmailJS dashboard

### Email Not Received

1. **Check Spam Folder**: The email might be in spam
2. **Gmail Less Secure Apps**: If using Gmail, enable "Less Secure Apps" in Gmail settings
3. **Template Variables**: Make sure all template variables (`{{from_name}}`, etc.) match the template you created

## Privacy & Security

- Email addresses are sent to EmailJS servers (read their [Privacy Policy](https://www.emailjs.com/docs/privacy/))
- Your backend never stores form data
- Emails are only sent to `pradeeprakavi@gmail.com`

## Next Steps

Once your contact form is working:

1. Monitor incoming emails at `pradeeprakavi@gmail.com`
2. Update your reply-to address as needed
3. Consider setting up email notifications or forwarding

---

**Need Help?**
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/contact)
