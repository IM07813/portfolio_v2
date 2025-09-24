# Waqar Ahmed - Portfolio Website (Django Version)

A 3D carousel portfolio website built with Django, featuring a modern design and interactive navigation.

## Features

- **3D Carousel Navigation**: Smooth rotating panels showcasing different sections
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Sections**: Home, Skills, Projects, Certifications, and Contact
- **Contact Form**: Functional contact form with Django backend
- **Modern UI**: Beautiful gradient effects and animations
- **Social Media Integration**: Direct links to GitHub, LinkedIn, Stack Overflow, and Upwork

## Technology Stack

- **Backend**: Django 4.2.24
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with 3D transforms and animations
- **Icons**: Font Awesome 6.4.0

## Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd /home/waqar/my_django_project
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/Mac
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations** (optional - only needed for Django admin):
   ```bash
   python manage.py migrate
   ```

5. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

6. **Open your browser** and navigate to `http://127.0.0.1:8000`

## Project Structure

```
my_django_project/
├── my_django_project/          # Project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── portfolio/                  # Main portfolio app
│   ├── templates/portfolio/
│   │   └── index.html         # Main template
│   ├── views.py               # Django views
│   └── urls.py                # App URLs
├── static/                    # Static files
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── script.js          # 3D carousel functionality
│   └── images/
│       └── new_image-removebg-preview.png
├── manage.py
├── requirements.txt
└── README.md
```

## Key Features Explained

### 3D Carousel Navigation
The portfolio uses CSS 3D transforms to create a rotating carousel effect with five main sections:
- **Home**: Introduction and profile
- **Skills**: Technical skills and tools
- **Projects**: Featured projects and achievements
- **Certifications**: Professional credentials
- **Contact**: Contact form for inquiries

### Interactivity Safety
Following the guidelines from `INTERACTIVITY_SAFETY.md`, the project carefully avoids common pitfalls:
- No `overflow-y: auto` on 3D-transformed panels
- Safe blur effects using pseudo-elements
- Proper pointer events handling at all rotation angles

### Contact Form
The contact form is fully functional with Django backend:
- Handles POST requests
- CSRF protection enabled
- Form data processing (currently prints to console)
- Success message display

## Navigation Controls

- **Arrow Keys**: Left/Right arrow keys for navigation
- **Click Controls**: Arrow buttons at the bottom
- **Dot Navigation**: Click dots to jump to specific sections
- **Touch/Swipe**: Mobile swipe gestures supported
- **Mouse Drag**: Click and drag to rotate (avoiding front panel)

## Customization

### Updating Content
Edit `/portfolio/templates/portfolio/index.html` to update:
- Personal information
- Skills and technologies
- Project descriptions
- Contact information

### Styling Changes
Modify `/static/css/style.css` to customize:
- Colors and gradients
- Animations and transitions
- Layout and spacing
- Responsive breakpoints

### Adding Functionality
Extend `/portfolio/views.py` to add:
- Database integration for contact form
- Email sending functionality
- Dynamic content loading
- User authentication

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- Optimized 3D transforms for smooth animations
- Efficient CSS transitions
- Minimal JavaScript footprint
- Compressed image assets

## Original Version

This Django version maintains 100% design and functionality parity with the original vanilla HTML/CSS/JS version located at `/home/waqar/vanilla_portfolio_v4/`.

## License

Personal portfolio project - All rights reserved.

---

**Developer**: Waqar Ahmed  
**Contact**: Available through the portfolio contact form  
**Version**: Django 1.0
