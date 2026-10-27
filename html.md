<!-- Example of Responsive Image Markup to use on your pages -->
<picture>
  <!-- Small / Mobile Screens -->
  <source media="(max-width: 600px)" srcset="images/banner-mobile.jpg">
  <!-- Medium / Tablet Screens -->
  <source media="(max-width: 992px)" srcset="images/banner-tablet.jpg">
  <!-- Default / Desktop Fallback -->
  <img src="images/banner-desktop.jpg" 
       srcset="images/banner-desktop.jpg 1200w, images/banner-tablet.jpg 800w, images/banner-mobile.jpg 400w"
       sizes="(max-width: 768px) 100vw, 1200px" 
       alt="Website Hero Banner" 
       loading="lazy">
</picture>