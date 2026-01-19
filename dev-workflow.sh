#!/bin/bash
# Atheryon Website Development Workflow
# Usage: ./dev-workflow.sh [command]

set -e

PROD_BRANCH="main"
DEV_BRANCH="dev"

case "$1" in
    preview)
        # Create/update PR to get preview URL
        echo "Creating preview PR..."
        git checkout $DEV_BRANCH
        git push origin $DEV_BRANCH

        # Check if PR exists
        PR_EXISTS=$(gh pr list --head $DEV_BRANCH --base $PROD_BRANCH --json number --jq '.[0].number' 2>/dev/null || echo "")

        if [ -z "$PR_EXISTS" ]; then
            gh pr create --base $PROD_BRANCH --head $DEV_BRANCH \
                --title "Design Preview" \
                --body "Preview environment for design iterations. Do not merge until ready for production."
            echo "PR created. Preview URL will appear in PR comments shortly."
        else
            echo "PR #$PR_EXISTS already exists."
            gh pr view $PR_EXISTS --web
        fi
        ;;

    status)
        # Show preview URL from PR
        echo "Checking preview status..."
        PR_NUM=$(gh pr list --head $DEV_BRANCH --base $PROD_BRANCH --json number --jq '.[0].number' 2>/dev/null || echo "")
        if [ -n "$PR_NUM" ]; then
            echo "PR #$PR_NUM"
            gh pr view $PR_NUM
        else
            echo "No active preview PR found. Run './dev-workflow.sh preview' to create one."
        fi
        ;;

    publish)
        # Merge dev to main (publish to production)
        echo "Publishing to production..."
        PR_NUM=$(gh pr list --head $DEV_BRANCH --base $PROD_BRANCH --json number --jq '.[0].number' 2>/dev/null || echo "")
        if [ -n "$PR_NUM" ]; then
            gh pr merge $PR_NUM --squash --delete-branch=false
            echo "Published to production!"
            echo "Live at: https://www.atheryon.com.au"
            # Reset dev branch to match main
            git checkout $PROD_BRANCH
            git pull origin $PROD_BRANCH
            git checkout $DEV_BRANCH
            git reset --hard $PROD_BRANCH
            git push origin $DEV_BRANCH --force
        else
            echo "No PR to publish. Create one first with './dev-workflow.sh preview'"
        fi
        ;;

    sync)
        # Sync dev with main (after direct main changes)
        echo "Syncing dev branch with main..."
        git checkout $PROD_BRANCH
        git pull origin $PROD_BRANCH
        git checkout $DEV_BRANCH
        git rebase $PROD_BRANCH
        git push origin $DEV_BRANCH --force-with-lease
        echo "Dev branch synced with main"
        ;;

    *)
        echo "Atheryon Website Development Workflow"
        echo ""
        echo "Usage: ./dev-workflow.sh [command]"
        echo ""
        echo "Commands:"
        echo "  preview   - Create/view preview PR (generates staging URL)"
        echo "  status    - Check current preview status and URL"
        echo "  publish   - Merge dev to main (deploy to production)"
        echo "  sync      - Sync dev branch with latest main"
        echo ""
        echo "Workflow:"
        echo "  1. Make changes on 'dev' branch"
        echo "  2. Run './dev-workflow.sh preview' to create staging site"
        echo "  3. Iterate: push changes, preview updates automatically"
        echo "  4. When ready: './dev-workflow.sh publish' to go live"
        echo ""
        echo "URLs:"
        echo "  Production: https://www.atheryon.com.au"
        echo "  Preview:    Auto-generated per PR (check PR comments)"
        ;;
esac
