# Coolify Deployment Troubleshooting Guide

## Current Issues
You're experiencing 500 errors when trying to admin login in your Coolify deployment, even after setting up environment variables.

## Quick Fix Steps

### 1. Test Your Deployment
First, test the new debug endpoint I created:

```bash
# Test the debug endpoint
curl https://your-domain.com/api/test
```

This will show you:
- Environment variables status
- Database connection status
- Admin user count
- Platform information

### 2. Seed Your Database
If the test shows no admin users, seed your database:

```bash
# Seed the database with admin user and portfolio data
curl -X POST https://your-domain.com/api/seed
```

This creates:
- Admin user: `admin` / `admin123`
- Portfolio items

### 3. Check Coolify Environment Variables
In your Coolify dashboard:

1. Go to your application settings
2. Navigate to "Environment Variables"
3. Ensure you have:
   ```
   MONGODB_URI=mongodb+srv://tech:ow7rzHZysF8wcVkW@cluster0.szywy2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   NODE_ENV=production
   ```

### 4. Check Coolify Logs
In your Coolify dashboard:
1. Go to your application
2. Click on "Logs" tab
3. Look for any error messages related to:
   - MongoDB connection
   - bcrypt errors
   - Environment variables

## Common Coolify Issues & Solutions

### Issue 1: bcryptjs Native Dependencies
**Problem**: bcryptjs may fail to compile native dependencies in Coolify's container environment.

**Solution**: The updated code now handles bcrypt errors gracefully. If this is still an issue, we can switch to a pure JavaScript alternative.

### Issue 2: MongoDB Connection Timeouts
**Problem**: Network timeouts between Coolify and MongoDB Atlas.

**Solution**: The updated MongoDB connection now has:
- Increased timeout (10 seconds)
- Better connection pooling
- Retry logic

### Issue 3: Environment Variables Not Loading
**Problem**: Coolify might not be loading environment variables correctly.

**Solution**: 
1. Restart your application after setting environment variables
2. Check if variables are properly set in Coolify dashboard
3. Use the test endpoint to verify

### Issue 4: Memory/Resource Limits
**Problem**: Coolify containers might have resource limits.

**Solution**: Check your Coolify resource allocation and increase if needed.

## Debugging Steps

### Step 1: Check Test Endpoint
```bash
curl https://your-domain.com/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "All tests passed",
  "data": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "nodeEnv": "production",
    "mongodbUriSet": true,
    "databaseConnected": true,
    "adminCount": 1
  }
}
```

### Step 2: Check Application Logs
Look for these log messages in Coolify:
- "Login attempt initiated"
- "Database connected successfully"
- "Attempting login for username: admin"
- Any error messages

### Step 3: Test Login Directly
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## If Issues Persist

### Option 1: Switch to Pure JavaScript bcrypt Alternative
If bcryptjs continues to fail, we can replace it with a pure JavaScript alternative.

### Option 2: Use Different MongoDB Connection String
Try using a different MongoDB connection format:
```
mongodb+srv://tech:ow7rzHZysF8wcVkW@cluster0.szywy2o.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Option 3: Check MongoDB Atlas Settings
1. Ensure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0)
2. Check if your database user has proper permissions
3. Verify the cluster is active and accessible

## Next Steps

1. **Deploy the updated code** to Coolify
2. **Test the debug endpoint** first
3. **Seed the database** if needed
4. **Try the admin login** again
5. **Check logs** for any remaining errors

## Contact Information
If you continue to experience issues, please share:
1. The response from `/api/test` endpoint
2. Any error messages from Coolify logs
3. Your Coolify environment variable configuration (without sensitive data)

This will help me provide more specific solutions for your deployment. 