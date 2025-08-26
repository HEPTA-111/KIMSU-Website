# KIMSU Specialist Centre — Static Website

## What is included
- Static site built with HTML/CSS/JS
- Pages: index, about, services, doctors, appointments, contact, privacy
- Responsive layout, dark-mode toggle, subtle animations, appointment modal

## How to use
1. Place images in `assets/images/` (logo-kimsu.svg, hero-kimsu.jpg, doctor images).
2. Replace Formspree placeholders (`https://formspree.io/f/your-id`) with your own form endpoints or backend.
3. Update phone, email, and Google Maps coordinates in `contact.html` if needed.
4. Host on GitHub Pages, Netlify, or any static host.

## Deploy (GitHub Pages)
- Create a repo, push this folder as the root.
- In repo settings, enable Pages from `main` branch → `/ (root)`.
- Wait a minute — site will be available at `https://<username>.github.io/<repo>/`

## Notes
- For appointment handling you can use Formspree, or integrate with Calendly, or a backend to store data securely.
- For medical privacy, avoid collecting sensitive health information through contact forms. Advise patients to call for urgent matters.
