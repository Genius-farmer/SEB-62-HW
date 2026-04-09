# How to Write an HTML Boilerplate

---

## Introduction

###### Every HTML page starts with a basic structure called a boilerplate. It ensures your webpage works correctly in browsers and follows standard practices.

---

## Basic Structure

##### Here’s the simplest HTML boilerplate:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

---

## 🔍 Breakdown

#### 1. `HTML<!DOCTYPE htm>l`

###### Tells the browser that this is an HTML5 document.

---

#### 2. `HTML

```html
<html lang="en">
  `
</html>
```

##### The root element of your page.

##### lang="en" helps with accessibility and SEO.

---

#### 3. Head

##### Contains metadata (information about the page).

```html
<meta charset="UTF-8"> // → supports most characters
<meta name="viewport"...> // → makes your page responsive
<title> // → name shown on browser tab
```

---

#### 4. Body

##### This is where all visible content goes.

###### _Example_:

```html
<h1>Hello World!</h1>
<p>This is my first webpage.</p>
```

---

#### 💡 Tip

- Always include the viewport meta tag to ensure your page looks good on mobile devices.
