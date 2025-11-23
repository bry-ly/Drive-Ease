# Setup Guide

## Step 1: Generate Prisma Client

First, make sure Prisma Client is generated:

```bash
npx prisma generate
```

## Step 2: Run Database Migrations

Create and apply the database migrations:

```bash
npx prisma migrate dev --name add_car_model
```

This will:
- Create the migration files
- Apply the migration to your database
- Generate Prisma Client

## Step 3: Seed the Database

Run the seed script to add sample cars:

```bash
npm run seed
```

Or:

```bash
npm run db:seed
```

## Step 4: Verify the Data

You can check if cars were seeded successfully:

```bash
npx prisma studio
```

This opens Prisma Studio where you can view and manage your data in a visual interface.

## Troubleshooting

### If cars are still not showing:

1. **Check if database is connected:**
   - Verify your `DATABASE_URL` environment variable is set correctly
   - Check that your database is running

2. **Check if migrations were applied:**
   ```bash
   npx prisma migrate status
   ```

3. **Check if cars exist in database:**
   ```bash
   npx prisma studio
   ```
   Look for the `car` table and verify there are records

4. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Check server logs:**
   - Look for any error messages in your terminal/console
   - Check for database connection errors

6. **Try restarting the dev server:**
   ```bash
   npm run dev
   ```

## Expected Result

After completing these steps, you should see 12 cars displayed on your home page in the "Our Fleet" section.


