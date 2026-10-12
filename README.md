# Chef's Menu Manager

A first working React Native version of the Chef's Menu Manager assignment.

## Features

- Add menu items with dish name, description, course, and price.
- Required-field validation with clear error messages.
- Success confirmation after an item is added.
- Empty-state message when no items have been added.
- Automatically updates the menu list and item count.
- Consistent styling and responsive scrollable layout.
- Prices are displayed in South African rand (R).

## Run the app

This is a React Native `App.js` component. It does not belong in a native Kotlin/Java-only Android project.

### If you already have a React Native project

1. Open the project folder.
2. Replace the contents of its `App.js` with the supplied `App.js` file.
3. Install the project's dependencies if you have not already done so.
4. Start the project using the command appropriate for its setup. For an Expo project, run `npx expo start`, then open it on an Android emulator or device.

### If you are starting from scratch with Expo

1. Install Node.js and Android Studio.
2. In a terminal, run:

   ```bash
   npx create-expo-app ChefsMenuManager
   cd ChefsMenuManager
   ```

3. Replace the generated `App.js` with the supplied file.
4. Run:

   ```bash
   npx expo start
   ```

5. Start an Android emulator in Android Studio, then press `a` in the Expo terminal to open the app in the emulator.

## GitHub submission

From the project folder, run:

```bash
git init
git add App.js README.md package.json
 git commit -m "Build first version of Chef's Menu Manager"
```

Then create an empty repository on GitHub and follow GitHub's instructions to add the remote and push your project. If your lecturer expects the complete app, submit the full project folder, not only `App.js`.

## Scope note

Menu items are stored in React state, so they remain visible while the app is running but are not saved permanently after the app is closed. Editing, deleting, searching, filtering, and statistics are intentionally not included in this first version, matching the brief.
