init:
	npm config set legacy-peer-deps true \
&& npm i \
&& npx husky install && npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1' \
&& gulp init
# legacy-peer-deps true for install old packages
# husky for commit linter as https://www.conventionalcommits.org/en/v1.0.0/#specification
# gulp init remove unusable folders for project
