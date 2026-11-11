
# STUDENT FORM — HOW TO RUN
=================================

FOLDER STRUCTURE (Very Important!)
---------------------------------
App.jsx looks for pictures using "./assets/...".
This means: The assets folder must be placed right alongside App.jsx.

Your project structure should look like this:

  src/
    App.jsx
    student-form.css
    assets/
      fur-bg.jpg
      student-girl.png
      fox.png
      star.png
      cupcake.png
      flower.png
      book.png
      pencil.png

STEPS
-----
1. Unzip this folder.
2. Copy and paste the "src" folder inside your React project's "src" folder (replace it).
3. App.jsx will import automatically — if your project imports App from `src/main.jsx`, you don't need to do anything extra.
4. Run `npm run dev`.

IF YOU STILL GET "Failed to resolve import"
---------------------------------------------
This means the assets folder is in the wrong place. Check:
- Is `src/App.jsx` there? Then `assets` must also be inside `src/assets/`.
- If App.jsx is inside another folder (e.g., `src/components/`), then the `assets` folder must be placed right inside that same folder.

FORM CONDITIONS
------------------
- Phone: 11 digits, must start with 03 (e.g., 03001234567)
- Roll No: Exactly 3 digits (e.g., 101)
- Name: 3 to 40 letters, text only
- Email: Optional, but if filled, it must be valid
- Date of Birth: Cannot be in the future, age must be between 3 and 100 years
- Address: Optional, up to 120 characters
- Class and Gender selection is mandatory"# tailwind-react" 
