# Git & GitHub Quick Reference (VS Code Edition)

> For the Mini Weather App (Node + Express + React). Focused on daily workflow: branches, commits, pushing, and pull requests — all friendly for VS Code.

---

## 🪄 Prerequisites

- Clone the repo (or open your existing one):
  ```bash
  git clone https://github.com/yourusername/weather-app.git
  cd weather-app
  ```
- Open in VS Code:
  ```bash
  code .
  ```
- Configure Git (one time):
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```

---

## 🧱 Everyday Git Workflow

### 1) Check status & branch

```bash
git status
git branch
```

### 2) Create and switch to a new branch

Use a clear, conventional name:

```bash
git checkout -b feat/add-search-bar
# other prefixes: fix/, chore/, docs/, refactor/, test/, style/
```

### 3) Make changes in VS Code

- Edit files, use the **Source Control** tab (Ctrl+Shift+G).
- Stage with the **+** button next to each file.

### 4) Commit your work (Conventional Commits)

From VS Code (✓ Commit) or terminal:

```bash
git add .
git commit -m "feat: add search bar on home page"
```

**Conventional commit types:**

- `feat:` new feature
- `fix:` bug fix
- `chore:` tooling/config/cleanup
- `docs:` docs only
- `refactor:` code restructure (no new features)
- `style:` formatting only (no code changes)
- `test:` add/modify tests

Keep messages short and clear (≈ 50 chars).

---

## ☁️ Push to GitHub & Open a Pull Request

### 1) Push your branch

```bash
git push -u origin feat/add-search-bar
```

(`-u` sets upstream so next time you can just `git push`.)

### 2) Open a PR on GitHub

- Visit your repo; click **Compare & pull request**.
- PR title example: `feat: add search bar to home page`
- PR description: what changed, why, any notes for reviewers.
- Click **Create pull request**.

### 3) Review & merge

- Wait for review/approval.
- Click **Merge pull request** → **Confirm**.
- Optionally delete branch on GitHub after merge.

### 4) Update your local main

```bash
git checkout main
git pull origin main
```

---

## 🔄 Keep Your Branch Up to Date

If `main` changed while you worked:

```bash
git checkout main
git pull origin main
git checkout feat/add-search-bar
git merge main
# resolve conflicts in VS Code → save →
git add .
git commit
git push
```

---

## 🧹 Cleanup Old Branches

After merge:

```bash
git branch -d feat/add-search-bar
```

---

## ⚡ Quick Commands Table

| Task                   | Command                          |
| ---------------------- | -------------------------------- |
| Check branch           | `git branch`                     |
| Check status           | `git status`                     |
| New branch             | `git checkout -b feat/new-thing` |
| Stage all              | `git add .`                      |
| Commit                 | `git commit -m "feat: message"`  |
| Push new branch        | `git push -u origin branch-name` |
| Pull latest main       | `git pull origin main`           |
| Merge main into branch | `git merge main`                 |
| Delete local branch    | `git branch -d branch-name`      |

---

## 🧭 VS Code Tips

- **Ctrl+Shift+G** → open Source Control panel.
- **Bottom-left branch name** → switch/create branches.
- **… menu** in Source Control → push/pull, publish branch.
- Diff view: click a changed file in Source Control to see differences.

---

## 🛠️ Troubleshooting

- **Port in use / server won’t start**: stop other processes or change the port in `.env`.
- **Authentication failed**: run `git config --global user.email` and ensure it matches your GitHub account; check your token/SSH setup.
- **Accidentally committed to main**: create a branch and move the commit:
  ```bash
  git checkout -b feat/move-work
  git push -u origin feat/move-work
  # open a PR; reset main if needed (ask mentor)
  ```
- **Conflicts during merge**: VS Code will highlight conflict markers `<<<<<<`/`======`/`>>>>>>`. Choose the correct changes, save, then `git add . && git commit && git push`.

---

## ✅ Example PR Checklist (for you)

- [ ] Branch name follows `feat/`, `fix/`, `chore/`, etc.
- [ ] Code compiles locally; tests pass (if any).
- [ ] Small, focused commits with clear messages.
- [ ] PR description explains what/why.
- [ ] Screenshots or notes for UI changes (if helpful).

---

## 🧯 Safety Net

When in doubt, run:

```bash
git status
```

It tells you _exactly_ where you are and what changed.

# Git Cheat Sheet

- `git status` – see what changed
- `git add .` – stage everything
- `git commit -m "message"` – save a snapshot
- `git push` – upload commits to GitHub
- `git pull` – update local repo
