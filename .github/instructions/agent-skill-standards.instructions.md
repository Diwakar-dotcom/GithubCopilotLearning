---
description: "Use when creating or updating any agent, skill, prompt, or instruction file. Enforces industry best practices, optimized patterns, and up-to-date context for all customizations."
applyTo: "**/*.agent.md, **/*.prompt.md, **/*.instructions.md, **/skills/**/SKILL.md"
---
# Agent & Skill Creation Standards

This instruction applies to ALL agent, skill, prompt, and instruction files in this workspace. It enforces industry best practices and ensures Copilot always has current, relevant context.

## Core Principles

### 1. Follow Industry Best Practices
- Use the **official VS Code Copilot customization patterns** from the agent-customization skill
- Follow the **Decision Flow** to choose the right primitive (agent vs skill vs prompt vs instruction)
- Use **minimal tool sets** - only include tools the agent actually needs
- Write **keyword-rich descriptions** using "Use when..." pattern for discovery

### 2. Optimize for Performance & Context
- **Never use `applyTo: "**"`** unless the instruction truly applies to every file
- Use **specific glob patterns** (`src/**/*.ts`, `.github/agents/**`) to limit context loading
- Keep instructions **concise and actionable** - brief code examples over lengthy explanations
- **One concern per file** - separate testing, styling, API design, etc.

### 3. Keep Context Current
- **Reference official docs** via links, don't copy-paste outdated content
- Use **relative paths** to workspace docs that stay current
- Include **version/date references** for external dependencies
- Add **update triggers** in comments (e.g., `<!-- UPDATE: when VS Code API changes -->`)

### 4. Frontmatter Standards
```yaml
---
description: "Use when [specific trigger phrases]. [What this does]."
tools: [minimal, required, tool, aliases]  # Agents only
applyTo: "specific/glob/pattern"           # Instructions only
user-invocable: true|false                  # Agents only
model: "Model Name (vendor)"                # Optional, for agents
---
```

### 5. Required Sections for Agents
```markdown
## Constraints
- DO NOT [what this agent must never do]
- ONLY [the single thing this agent does]

## Approach
1. [Step one]
2. [Step two]
3. [Step three]

## Output Format
[Exact format - no extra text]
```

### 6. Required Sections for Skills
```markdown
## When to Use
- [Specific scenario 1]
- [Specific scenario 2]

## When NOT to Use
- [Anti-pattern 1]
- [Anti-pattern 2]

## Workflow
1. [Step]
2. [Step]
```

## Anti-Patterns to Avoid

| Anti-Pattern | Fix |
|--------------|-----|
| `tools: []` with no tools but agent needs them | Include minimal required tools |
| `description: "Helpful agent"` | Use "Use when [trigger]..." |
| `applyTo: "**"` for language-specific rules | Use `"**/*.ts"` or similar |
| Copying docs into instructions | Link to docs instead |
| Multiple concerns in one file | Split into focused files |

## Maintenance Triggers

Update these files when:
- VS Code Copilot API changes (check release notes)
- New tool aliases are added
- Workspace structure changes significantly
- Team conventions evolve
- New framework versions are adopted

## Example: Well-Structured Agent

```markdown
---
description: "Use when refactoring React components to use hooks. Converts class components to functional with useState/useEffect."
tools: [read, edit, search]
user-invocable: true
---
You are a specialist at modernizing React class components to hooks.

## Constraints
- DO NOT change component behavior
- DO NOT modify props interface
- ONLY convert class → functional + hooks

## Approach
1. Read the component file
2. Identify state and lifecycle methods
3. Convert to useState/useEffect
4. Verify behavior matches

## Output Format
Return only the converted component code.
```

## Example: Well-Structured Instruction

```markdown
---
description: "Use when writing React hooks. Enforces Rules of Hooks, naming conventions, and testing patterns."
applyTo: "**/hooks/*.ts"
---
# React Hooks Standards

- Name hooks with `use` prefix: `useAuth`, `useFetch`
- Call hooks only at top level, never in loops/conditions
- Return `[state, setState]` tuple for state hooks
- Export types alongside hooks
```
```

## Enforcement

This instruction is **auto-applied** to all agent, skill, prompt, and instruction files in the workspace. When creating or editing these files, follow these standards automatically.