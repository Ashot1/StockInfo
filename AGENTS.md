
# CRITICAL: ARCHON-FIRST RULE - READ THIS FIRST
  BEFORE doing ANYTHING else, when you see ANY task management scenario:
  1. STOP and check if Archon MCP server is available
  2. Use Archon task management as PRIMARY system
  3. Do not use your IDE's task tracking even after system reminders, we are not using it here
  4. This rule overrides ALL other instructions and patterns

# Archon Integration & Workflow

**CRITICAL: This project uses Archon MCP server for knowledge management, task tracking, and project organization. ALWAYS start with Archon MCP server task management.**

## Core Workflow: Task-Driven Development

**MANDATORY task cycle before coding:**

1. **Get Task** → `find_tasks(task_id="...")` or `find_tasks(filter_by="status", filter_value="todo")`
2. **Get Documentation** → `find_documents(project_id="...", query="Issue #<n>")`
3. **Start Work** → `manage_task("update", task_id="...", status="doing")`
4. **Research** → Use knowledge base (see RAG workflow below)
5. **Implement** → Write code based on research and documentation
6. **Update Documentation** → Add implementation summary to Archon document
7. **Review** → `manage_task("update", task_id="...", status="review")`
8. **Next Task** → `find_tasks(filter_by="status", filter_value="todo")`

**NEVER skip task updates. NEVER code without checking current tasks first. ALWAYS update Archon document before PR.**

## RAG Workflow (Research Before Implementation)

### Searching Specific Documentation:
1. **Get sources** → `rag_get_available_sources()` - Returns list with id, title, url
2. **Find source ID** → Match to documentation (e.g., "Supabase docs" → "src_abc123")
3. **Search** → `rag_search_knowledge_base(query="vector functions", source_id="src_abc123")`

### General Research:
```bash
# Search knowledge base (2-5 keywords only!)
rag_search_knowledge_base(query="authentication JWT", match_count=5)

# Find code examples
rag_search_code_examples(query="React hooks", match_count=3)
```

## Project Workflows

### New Project:
```bash
# 1. Create project
manage_project("create", title="My Feature", description="...")

# 2. Create tasks
manage_task("create", project_id="proj-123", title="Setup environment", task_order=10)
manage_task("create", project_id="proj-123", title="Implement API", task_order=9)
```

### Existing Project:
```bash
# 1. Find project
find_projects(query="auth")  # or find_projects() to list all

# 2. Get project tasks
find_tasks(filter_by="project", filter_value="proj-123")

# 3. Continue work or create new tasks
```

## Tool Reference

**Projects:**
- `find_projects(query="...")` - Search projects
- `find_projects(project_id="...")` - Get specific project
- `manage_project("create"/"update"/"delete", ...)` - Manage projects

**Tasks:**
- `find_tasks(query="...")` - Search tasks by keyword
- `find_tasks(task_id="...")` - Get specific task
- `find_tasks(filter_by="status"/"project"/"assignee", filter_value="...")` - Filter tasks
- `manage_task("create"/"update"/"delete", ...)` - Manage tasks

**Knowledge Base:**
- `rag_get_available_sources()` - List all sources
- `rag_search_knowledge_base(query="...", source_id="...")` - Search docs
- `rag_search_code_examples(query="...", source_id="...")` - Find code

## Important Notes

- Task status flow: `todo` → `doing` → `review` → `done`
- Keep queries SHORT (2-5 keywords) for better search results
- Higher `task_order` = higher priority (0-100)
- Tasks should be 30 min - 4 hours of work
- **All task documentation stored in Archon MCP**, not local files
- Use `document_type="spec"` for task specifications
- Always link task ID in document title: `"Issue #<n>: <title>"`
- Tag documents with `["task", "issue-<n>"]` for easy retrieval


# AGENTS.md - AI Development Guidelines for StockInfo Project

> **Main Reference**: All agents and developers working on this project must follow this document as the primary source of truth for development practices, code standards, and project workflow.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Definition of Done (DoD)](#definition-of-done-dod)
6. [Testing Requirements](#testing-requirements)
7. [PR Process](#pr-process)
8. [Context Packs](#context-packs)
9. [Agent Roles](#agent-roles)

---

## Project Overview

**StockInfo** is a Next.js-based web application for analyzing and managing investments in financial markets. It provides real-time stock quotes, bonds, currency exchange rates, financial news, and a virtual portfolio management system.

### Key Features
- Real-time financial data (stocks, bonds, currencies)
- News feed from Moscow Exchange (MOEX)
- Virtual trading account with transactions
- User authentication and profile management
- Favorites system
- PWA support
- Dark/Light/System themes
- Full accessibility support (screen readers, keyboard navigation)

### Tech Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.5.4
- **Runtime**: React 19.2.3
- **Styling**: Tailwind CSS 3.4.9
- **UI Components**: Radix UI (ShadCN)
- **Animations**: Framer Motion 11.3.21
- **State Management**: React Context + TanStack Query 5.48.0
- **Backend/Database**: Supabase (Auth + PostgreSQL)
- **Charts**: Chart.js 4.4.3
- **Forms**: React Hook Form 7.52.2
- **Notifications**: React Hot Toast 2.4.1

### External APIs
1. **MOEX API** - Moscow Exchange for stocks, bonds quotes
2. **CBR-XML-DAILY** - Currency exchange rates
3. **Supabase** - Authentication and data storage

---

## Technical Architecture

### Directory Structure

```
StockInfo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (mainpages)/       # Authenticated pages layout
│   │   │   ├── home/          # Home page with portfolio
│   │   │   ├── stocks/        # Stocks list and details
│   │   │   ├── bonds/         # Bonds list and details
│   │   │   ├── currency/      # Currency exchange rates
│   │   │   └── news/          # Financial news
│   │   ├── front/             # Landing and auth pages
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── entity/            # Business logic components
│   │   ├── module/            # Complex feature modules
│   │   ├── ui/                # Reusable UI components
│   │   └── widgets/           # Composite widgets
│   ├── actions/               # Server actions
│   │   ├── Account/           # Auth and user data
│   │   └── Security/          # Financial data fetching
│   ├── hoc/                   # Higher Order Components
│   │   └── Providers/         # Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
│       ├── supabase/          # Supabase client utilities
│       ├── config.ts          # App configuration
│       └── utils.ts           # Helper functions
├── public/                    # Static assets
│   ├── Logos/                 # Financial instruments logos
│   └── manifest/              # PWA manifest
├── AI-workflow/               # AI development process docs
└── [config files]             # next.config.js, tsconfig.json, etc.

**Note**: Task documentation is stored in Archon MCP, not in local files.
```

### Key Architectural Patterns

#### 1. Server vs Client Components
- **Server Components** (default): All pages in `app/` directory, data fetching components
- **Client Components** (`'use client'`): Interactive UI, forms, state management, hooks usage
- Server Actions in `src/actions/` for data mutations

#### 2. State Management
- **Global State**: React Context Providers
  - `AuthProvider` - User authentication and main user data
  - `ReactQueryProvider` - Server state caching with TanStack Query
  - `SettingsProvider` - Local app settings
  - `ThemeProvider` - Theme management
- **Local State**: `useState`, `useReducer` for component-specific state
- **Server State**: TanStack Query for caching, refetching, optimistic updates
- **Persistent State**: LocalStorage via custom hooks (`useStorage`, `useManyStorage`)

#### 3. Data Fetching Pattern
All API calls follow the `TryCatch` wrapper pattern:

```typescript
// Pattern used in src/actions/
export async function getData() {
  return TryCatch<DataType>(async () => {
    const result = await fetch(API_URL)
    const data: DataType = await result.json()
    if (!result || !data) throw new Error('Error message')
    return { data, error: null }
  })
}
```

#### 4. Authentication Flow
- Supabase Auth with multiple providers (Email/Password, OAuth)
- Middleware protection for authenticated routes
- Three Supabase clients:
  - `client.ts` - Client-side operations
  - `server.ts` - Server Component operations
  - `service.ts` - Admin operations (uses service role key)

#### 5. Routing Strategy
- **App Router** with nested layouts
- Route groups: `(mainpages)` for authenticated pages
- Dynamic routes: `[id]` for details pages
- Parallel routes and loading states

---

## Development Workflow

### Branch Naming Convention
Format: `issue-<id>-<slug>`

Examples:
- `issue-123-auth-endpoint`
- `issue-58-portfolio-table`

### Commit Style
Use conventional commits (preferred but not strictly enforced):
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Formatting changes
- `test:` - Adding tests

**Important**: All commits and git messages must be in English, even though the UI is in Russian.

### Git Workflow
1. Create a branch from `main` following naming convention
2. Make changes and commit regularly
3. Open a PR with proper template filled
4. Pass review (required)
5. Merge to `main` after approval

**Never commit without explicit user request/confirmation**

---

## Code Standards

### TypeScript
- **Strict mode enabled** - all code must be fully typed
- No `any` types without explicit justification
- Use type inference where appropriate
- Define types in `src/types/` for shared types
- Prefer interfaces for object shapes, types for unions/intersections

### React/Next.js
- Use functional components only
- Prefer Server Components by default
- Add `'use client'` directive only when necessary:
  - Using hooks (useState, useEffect, etc.)
  - Event handlers
  - Browser APIs
  - Context consumers (except server-safe contexts)
- Use async/await in Server Components for data fetching
- Implement proper error boundaries
- Use Next.js Image component for images
- Implement proper loading states

### Styling
- **Tailwind CSS** for all styling
- Use design system variables from `globals.css`
- Responsive design with mobile-first approach
- Custom breakpoints: `300p`, `500p`, `768p`, `1024p`, `1080p`, `4k`
- Dark mode support via `next-themes`
- Use `cn()` utility for conditional classes

### File Organization
- One component per file
- Co-locate related files
- Use index files sparingly
- Keep components small and focused (< 300 lines)

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useStorage.ts`)
- **Utils**: camelCase (`formatDate`)
- **Types**: PascalCase with `T` prefix for types (`TUser`), no prefix for interfaces
- **Constants**: UPPER_SNAKE_CASE (`START_BALANCE`)
- **Files**: Match the primary export name

### Comments
- Add comments for complex logic
- Use JSDoc for functions with non-obvious behavior
- Write comments in English
- Don't comment obvious code
- **Don't comment object/type fields** - use descriptive names instead

### Accessibility
- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain sufficient color contrast
- Add alt text to images

---

## Definition of Done (DoD)

Every task must meet these criteria before being considered complete:

### Functional Requirements
- [ ] All acceptance criteria from the Task are met
- [ ] Feature works as described in Goal/DoD (check Archon document)
- [ ] No regressions in existing functionality
- [ ] Works across supported browsers (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design works on mobile, tablet, and desktop

### Code Quality
- [ ] Code follows project standards (see Code Standards section)
- [ ] TypeScript strict mode passes with no errors
- [ ] ESLint passes with no errors
- [ ] No console.logs or debug code left
- [ ] No commented-out code (unless specifically needed with explanation)
- [ ] No unused imports or variables

### Testing
- [ ] Test plan executed (manual or automated)
- [ ] Edge cases considered and tested
- [ ] Error states handled gracefully
- [ ] Loading states implemented where appropriate

### Documentation
- [ ] Archon document updated with implementation details
- [ ] Complex logic has code comments
- [ ] API changes documented
- [ ] Environment variables documented (if added)

### PR Requirements
- [ ] PR properly linked to Task (`Closes #<task-id>`)
- [ ] PR template filled completely
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] Archon document updated

---

## Testing Requirements

### Test Plan Location
- Brief test plan in Task description (Archon)
- Detailed test plan in Archon document
- Test results documented in PR and Archon document

### Manual Testing Checklist
For UI changes:
- [ ] Visual appearance matches design/expectations
- [ ] Dark and light themes work correctly
- [ ] Mobile view works correctly
- [ ] Tablet view works correctly
- [ ] Desktop view works correctly
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Animations work smoothly

For functionality changes:
- [ ] Happy path works
- [ ] Edge cases handled (empty state, max values, etc.)
- [ ] Error cases handled gracefully
- [ ] API failures handled
- [ ] Network errors handled
- [ ] Loading states work

For authentication changes:
- [ ] Logged in user flow works
- [ ] Logged out user flow works
- [ ] Protected routes are protected
- [ ] Session persistence works

### When Tests Are Not Required
If no automated tests are added, PR must explain:
- **Why**: Reason for not adding tests
- **How to verify**: Manual testing steps
- **Future plan**: When/how tests will be added (if applicable)

---

## PR Process

### PR Title
Should match the Task title or clearly describe the change.

### PR Description Template

```markdown
## Related Task
Closes Task #<task-id> (Archon)

## Summary
<!-- 3-8 bullet points describing what was done -->
- 
- 
- 

## How to Test
<!-- Step-by-step instructions or test command -->
1. 
2. 
3. 

## Implementation Details
<!-- Key technical decisions, architecture changes, or important context -->
- 
- 

## Screenshots/Videos (if UI change)
<!-- Add before/after screenshots or demo video -->

## Risks/Notes
<!-- What might break, what's not covered, limitations, or future improvements -->
- 
- 

## Checklist
- [ ] DoD completed
- [ ] Test plan executed
- [ ] Archon document updated
- [ ] No secrets/sensitive data in code
- [ ] Migrations added (if DB changes)
- [ ] Environment variables documented (if added)
```

### PR Status Flow
- **Open PR** → Task moves to **review** (in Archon)
- **PR Merged** → Task moves to **done** (in Archon)

Update task status manually using Archon tools.

### Review Requirements
- **Every PR must be reviewed** - no direct merges to main
- At least one approval required
- Reviewer must check against DoD and Archon document
- All comments must be resolved before merge

---

## Task Documentation in Archon

### What is Task Documentation?
Task documentation is stored in **Archon MCP documents** and serves as the "memory" for each task. It ensures agents and developers have complete context without relying on chat history.

### Storage Location
All task documentation is stored in **Archon MCP server** using the document management tools, NOT in local files.

### Document Type
Use `document_type="spec"` for task specifications in Archon.

### Archon Document Structure

When creating a document for a task, use this content structure:

```json
{
  "issue": "#<number>",
  "status": "Ready/In Progress/In Review/Done",
  "assignee": "Name or Agent",
  "goal": "What needs to be achieved",
  "definition_of_done": [
    "Item 1",
    "Item 2",
    "Item 3"
  ],
  "architecture": "How will this be implemented? Key technical decisions",
  "files_affected": [
    "src/...",
    "src/..."
  ],
  "test_plan": {
    "manual_steps": ["Step 1", "Step 2", "Step 3"],
    "expected_results": ["Result 1", "Result 2"],
    "edge_cases": ["Case 1", "Case 2"]
  },
  "risks": [
    "Risk 1",
    "Technical debt item 1"
  ],
  "dependencies": {
    "depends_on": ["#issue"],
    "blocks": ["#issue"]
  },
  "progress_notes": [
    {
      "date": "2025-12-28",
      "status": "Status update",
      "notes": ["Note 1", "Note 2"]
    }
  ],
  "implementation_summary": "Final summary of what was done, decisions made, how to test"
}
```

### Archon Workflow for Task Documentation

1. **Created by Planner** when task is created:
```bash
manage_document("create", 
  project_id="proj-xxx",
  title="Issue #<n>: <task-title>",
  document_type="spec",
  content={...skeleton...},
  tags=["task", "issue-<n>"]
)
```

2. **Updated by Worker** before starting work:
```bash
# Get current document
docs = find_documents(project_id="proj-xxx", query="Issue #<n>")

# Update with architecture/approach
manage_document("update",
  project_id="proj-xxx",
  document_id="doc-xxx",
  content={...updated_architecture...}
)
```

3. **Updated by Worker** during work (progress notes):
```bash
manage_document("update",
  document_id="doc-xxx",
  content={...add_progress_notes...}
)
```

4. **Updated by Worker** before PR (implementation summary):
```bash
manage_document("update",
  document_id="doc-xxx",
  content={...final_summary...}
)
```

5. **Referenced by Reviewer** during review:
```bash
# Find task documentation
docs = find_documents(project_id="proj-xxx", document_id="doc-xxx")
```

### Mandatory Archon Documentation Rule
**Every Task MUST have an Archon document**. When creating tasks, immediately create corresponding documentation:

```bash
# 1. Create task
task = manage_task("create", project_id="proj-xxx", title="Add portfolio chart")

# 2. Create documentation for the task
doc = manage_document("create",
  project_id="proj-xxx",
  title=f"Issue #{task.id}: Add portfolio chart",
  document_type="spec",
  content={...task_spec...},
  tags=["task", f"issue-{task.id}"]
)
```

---

## Agent Roles

Our development process uses three distinct agent roles. Each role has specific responsibilities and boundaries.

### 1. Planner Agent

**Goal**: Transform an Epic into actionable tasks with Archon documentation.

**Responsibilities**:
- [ ] Clarify Epic scope and boundaries
- [ ] Create or identify Archon project for the Epic
- [ ] Break Epic into 8-15 Task issues
- [ ] Define dependencies and parallel groups
- [ ] Create Archon document (spec) for each task
- [ ] Set appropriate task labels and priorities
- [ ] Move tasks to **todo** status

**Input**:
- Epic description or high-level feature request
- Current codebase state
- Technical constraints

**Output**:
- Archon project (if new Epic)
- 8-15 Tasks in Archon (todo status)
- Archon document for each task
- Dependency map
- Parallel execution groups identified

**Archon Workflow**:
```bash
# 1. Create or find project
project = manage_project("create", 
  title="Epic: Authentication System",
  description="Complete user authentication flow",
  github_repo="https://github.com/org/repo"
)

# 2. Create tasks
task1 = manage_task("create",
  project_id=project.id,
  title="Setup Supabase auth",
  description="Configure Supabase authentication providers",
  status="todo",
  task_order=10
)

# 3. Create documentation for each task
doc1 = manage_document("create",
  project_id=project.id,
  title=f"Issue #{task1.id}: Setup Supabase auth",
  document_type="spec",
  content={
    "goal": "Configure authentication providers in Supabase",
    "definition_of_done": [...],
    "architecture": "...",
    ...
  },
  tags=["task", f"issue-{task1.id}"]
)
```

**Rules**:
- One Task = One PR (ideally)
- Each task must be independently testable
- DoD must be specific and measurable
- Always create Archon document when creating task
- Don't write code unless creating templates/documentation

**Tools**: Cursor (Agent mode), Archon MCP tools

---

### 2. Worker Agent (Codex / Cursor)

**Goal**: Complete a single Task and deliver a merge-ready PR.

**Responsibilities**:
- [ ] Read Task + Archon document thoroughly
- [ ] Clarify ambiguities (update task description if needed)
- [ ] Implement all DoD items
- [ ] Execute test plan
- [ ] Update Archon document with implementation details
- [ ] Create PR with proper template
- [ ] Link PR to Task
- [ ] Move Task to **review** status

**Input**:
- Task in **todo** status from Archon
- Archon document with goal/DoD/test plan

**Output**:
- PR linked to Task
- Updated Archon document with implementation summary
- Task in **review** status

**Archon Workflow**:
```bash
# 1. Get next todo task
tasks = find_tasks(filter_by="status", filter_value="todo", per_page=5)

# 2. Get task documentation
docs = find_documents(project_id=task.project_id, query=f"Issue #{task.id}")

# 3. Start work
manage_task("update", task_id=task.id, status="doing", assignee="Worker Agent")

# 4. During work - add progress notes
manage_document("update",
  project_id=task.project_id,
  document_id=doc.id,
  content={
    ...existing_content,
    "progress_notes": [
      {
        "date": "2025-12-28",
        "status": "Implementation started",
        "notes": ["Set up component structure", "Added types"]
      }
    ]
  }
)

# 5. Before PR - add implementation summary
manage_document("update",
  project_id=task.project_id,
  document_id=doc.id,
  content={
    ...existing_content,
    "implementation_summary": "Implemented authentication flow using Supabase client. Added error handling and loading states. All tests passed.",
    "status": "In Review"
  }
)

# 6. Move to review
manage_task("update", task_id=task.id, status="review")
```

**Rules**:
- One Worker = One Task at a time
- Maximum 1-2 tasks **doing** per worker
- If blocked, move to **blocked** status with explanation
- No mixing multiple tasks in one session
- Always update Archon document before PR

---

### 3. Reviewer Agent

**Goal**: Ensure quality and consistency before merging to main.

**Responsibilities**:
- [ ] Verify PR is linked to Task
- [ ] Check implementation matches Goal/DoD from Archon document
- [ ] Review test plan execution
- [ ] Check code quality and standards
- [ ] Verify edge cases and error handling
- [ ] Confirm Archon document is updated with implementation summary
- [ ] Approve or request changes

**Input**:
- PR in **review** status
- Linked Task from Archon
- Archon document with task specification
- This `AGENTS.md` document

**Output**:
- Approval or requested changes
- Specific, actionable feedback
- Updated Task status (back to doing if changes needed)

**Archon Workflow**:
```bash
# 1. Get tasks in review
tasks = find_tasks(filter_by="status", filter_value="review")

# 2. Get task documentation
docs = find_documents(project_id=task.project_id, query=f"Issue #{task.id}")

# 3. Review documentation completeness
doc = find_documents(project_id=task.project_id, document_id=doc.id)

# Check:
# - implementation_summary is filled
# - all DoD items addressed
# - test plan results documented

# 4a. If approved - mark as done
manage_task("update", task_id=task.id, status="done")
manage_document("update",
  document_id=doc.id,
  content={...existing, "status": "Done"}
)

# 4b. If changes needed - back to doing
manage_task("update", task_id=task.id, status="doing")
```

**Review Checklist**:
- [ ] PR ↔ Task link exists
- [ ] DoD items completed (check Archon document)
- [ ] Code follows standards
- [ ] Tests/test plan documented
- [ ] No regressions introduced
- [ ] Error handling present
- [ ] Loading states implemented
- [ ] TypeScript types correct
- [ ] No console.logs or debug code
- [ ] Archon document updated with implementation summary

**Feedback Rules**:
- Be specific and actionable
- Explain why something needs to change
- Suggest solution when possible
- Reference standards or best practices
- For large PRs, request splitting

**Important**: Reviewer does NOT write code. If changes are needed, Worker must implement them.

---

## Automation & Status Management

### Task Status Transitions (Archon)
Update task status using Archon tools:

```bash
# When starting work
manage_task("update", task_id="task-xxx", status="doing")

# When ready for review
manage_task("update", task_id="task-xxx", status="review")

# When approved and merged
manage_task("update", task_id="task-xxx", status="done")
```

### WIP Limits
- Maximum 1-2 tasks per Worker in **doing** status
- If more tasks need to be started, finish current tasks first

### Blocked Status
If a task is blocked:
1. Move to **blocked** status in Archon:
```bash
manage_task("update", task_id="task-xxx", status="blocked")
```
2. Add comment to task description explaining:
   - Why it's blocked
   - What's needed to unblock
   - Who can help unblock
3. Don't count against WIP limit

---

## Environment & Setup

### Required Environment Variables
Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=<from Supabase dashboard>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Supabase dashboard>
SUPABASE_SERVICE_KEY=<from Supabase dashboard - NEVER expose to client>
NEXT_PUBLIC_SITEURL=http://localhost:3000
```

### Development Commands
```bash
# Install dependencies
yarn install

# Run development server (with Turbopack)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint

# Generate Supabase types
yarn generate:types
```

### Local Development URL
http://localhost:3000

### Database Setup
See README.md for Supabase database structure and setup instructions.

---

## Project-Specific Guidelines

### Financial Data Handling
- All prices and monetary values use `number` type
- Russian locale formatting for numbers
- Date formatting: `DD.MM.YYYY HH:MM`
- Cache MOEX API calls appropriately (60s revalidation)

### User Data
- Never log sensitive user data
- User transactions stored in Supabase
- Virtual balance calculations server-side
- Favorites and purchases in JSON fields

### Performance
- Use Next.js Image optimization
- Implement proper loading states
- Code split heavy components
- Lazy load non-critical components (use `dynamic()`)
- Optimize bundle size

### Localization
- UI is in **Russian**
- Code comments in **English**
- Git commits in **English**
- Currency: RUB (₽)

### PWA Support
- Manifest already configured
- Icons in `public/manifest/icons/`
- No offline mode (network required)

---

## Common Patterns & Examples

### Creating a New Page
1. Add route in `src/app/`
2. Create layout if needed
3. Implement as Server Component (fetch data in component)
4. Add loading.tsx for loading state
5. Add error.tsx for error boundary
6. Update navigation if needed

### Adding a Server Action
1. Create in `src/actions/[category]/`
2. Use `'use server'` directive
3. Wrap in `TryCatch` utility
4. Return `{ data, error }` format
5. Add TypeScript types
6. Call from Client Component or Server Component

### Creating a Context Provider
1. Create in `src/hoc/Providers/`
2. Export context and provider component
3. Export custom hook (`useXxxContext`)
4. Add to layout hierarchy
5. Document in AGENTS.md if global

### Adding a New Utility Hook
1. Check `src/hooks/` first - it might already exist
2. If creating new, add to `src/hooks/`
3. Use consistent naming (`useXxx`)
4. Add TypeScript types
5. Document with JSDoc

---

## Troubleshooting & FAQs

### Agent Lost Context
→ Retrieve task documentation from Archon:
```bash
# Find task
task = find_tasks(task_id="task-xxx")
# Get documentation
docs = find_documents(project_id=task.project_id, query=f"Issue #{task.id}")
```

### PR Too Large
→ Stop, split into multiple Tasks in Archon, create separate PRs

### Can't Test Something
→ Document manual testing steps in Archon document and PR

### Breaking Change Needed
→ Document in PR risks, consider deprecation path, notify in PR description

### Database Schema Change Needed
→ Create migration, update Supabase types, test with seed data, document in PR and Archon

### New Environment Variable Needed
→ Add to `.env.local`, document in AGENTS.md, add to PR description and Archon document

---

## Related Documentation

This is the main document, but refer to these for additional context:

- `AI-workflow/Overview.md` - System overview and philosophy
- `AI-workflow/Roles.md` - Detailed role descriptions
- `AI-workflow/Development_proccess.md` - Development process details
- `AI-workflow/Managments_process.md` - Task management and Kanban
- `AI-workflow/Setup_guide.md` - Initial setup instructions
- `README.md` - Project overview and local setup

---

## Version History

**Version 1.0** - Initial creation based on AI-workflow documentation and project analysis

---

**Last Updated**: 2025-12-28  
**Maintainer**: Project Team  
**Questions**: Open an Issue or ask in PR comments

