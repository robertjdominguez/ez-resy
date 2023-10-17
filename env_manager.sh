# Get the current date
DATE=$(date +%Y-%m-%d)

# Add two weeks to the current date
DATE=$(date -v+2w -j -f "%Y-%m-%d" "$DATE" "+%Y-%m-%d")

# Update the .env file with the new date
sed -i '' "s/DATE=.*/DATE=$DATE/" .env