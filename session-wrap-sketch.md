# Session Wrap

Logout sequence: assess session work, calculate cost/efficiency, archive to MemPalace, report final state.

## Usage

Run this at session end. The skill automates:
1. Work summary — git log, PRs, issues closed
2. Cost/efficiency analysis — tokens × model pricing × human equivalent
3. MemPalace mining — archive learnings
4. Final report — structured output

## Work Summary Calculation

Use `git log --since="YYYY-MM-DD" main` and `gh pr list --search "created:YYYY-MM-DD"` for session metrics: commits, PR count, lines changed, issues closed.

## Cost Calculation

Model prices for comparison:

| Model | Input $/M tok | Output $/M tok |
|-------|--------------|----------------|
| DeepSeek V4 Pro | $0.28 | $0.42 |
| DeepSeek V4 Flash | $0.14 | $0.28 |
| Claude Sonnet 4.6 (est.) | $3.00 | $15.00 |
| GPT-4o | $2.50 | $10.00 |

Token estimation: ~12K input per turn + tool results. A 40-turn coding session: ~8-12M input, ~100-200K output.

## MemPalace Mining

On logout, mine the operator-log:
```bash
mkdir -p /tmp/mempalace-sessions
cp operator-log /tmp/mempalace-sessions/project-operator-log.txt
mempalace --palace .mempalace mine /tmp/mempalace-sessions --mode convos --wing <wing>
rm -rf /tmp/mempalace-sessions
```
