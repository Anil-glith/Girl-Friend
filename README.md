# Girl-Friend on Firebase Studio

This is a NextJS starter in Firebase Studio. To get started, take a look at `src/app/page.tsx`.

## Pushing to GitHub

To push your code to your GitHub repository, run the following commands in your terminal from the project's root directory.

```bash
# 1. Initialize Git (if you haven't already)
git init

# 2. Add all your project files to the staging area
git add .

# 3. Commit your files with a message
git commit -m "Initial commit"

# 4. Add your GitHub repository as the remote origin
git remote add origin https://github.com/Anil-glith/Girl-Friend.git

# 5. Push your code to GitHub
git push -u origin main
```

**Note:** If you receive an error that says `fatal: remote origin already exists.`, you can update the remote URL with the following command, and then try pushing again:

```bash
git remote set-url origin https://github.com/Anil-glith/Girl-Friend.git
```