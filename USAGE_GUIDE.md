# AutoFlow AI - Complete Usage Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Start the System
```bash
# Start all services with Docker
docker compose up -d

# Or manually:
npm run dev          # Frontend (http://localhost:3000)
cd backend && npm run dev    # Backend API (http://localhost:3001)
cd python-service && uvicorn main:app --reload  # Python (http://localhost:8001)
cd php-service && php -S localhost:8080 -t public  # PHP (http://localhost:8080)
```

### Step 2: Access the Dashboard
Open your browser: **http://localhost:3000**

### Step 3: Create Your First Account
1. Click "Get Started" or "Sign Up"
2. Enter your name, email, and password
3. You'll be logged in automatically

---

## 📊 System Flow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                          │
│  React Dashboard │ Workflow Builder │ Execution Monitor          │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP Requests
┌────────────────────────▼────────────────────────────────────────┐
│                      API GATEWAY                                 │
│  Authentication │ Rate Limiting │ Request Routing                │
└──┬──────────────┬──────────────┬──────────────┬─────────────────┘
   │              │              │              │
   ▼              ▼              ▼              ▼
┌──────┐    ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Auth │    │ Workflow │  │ Webhook  │  │ Analytics│
│System│    │ Manager  │  │ Receiver │  │ Engine   │
└──┬───┘    └────┬─────┘  └────┬─────┘  └────┬─────┘
   │             │              │              │
   └─────────────┴──────────────┴──────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PROCESSING LAYER                               │
│  Python Service (AI/ML) │ PHP Service (Legacy) │ n8n Engine     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  PostgreSQL │ Redis Cache │ Webhook Events │ Audit Logs          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 How to Use Each Feature

### 1. **Creating Your First Workflow**

**Scenario:** Automatically process customer support inquiries

**Steps:**
1. Go to **Workflows** → Click **New Workflow**
2. Name it: "Customer Support Bot"
3. Add steps:
   - **Webhook Trigger** - Receives incoming requests
   - **Python Processing** - Validates input data
   - **AI Classification** - Categorizes the issue
   - **Condition** - Check if high priority
   - **Database** - Store the ticket
   - **Notification** - Alert the team

4. Click **Save Workflow**
5. Copy the webhook URL (looks like: `/webhooks/whk_abc123...`)

**Test It:**
```bash
curl -X POST http://localhost:3001/webhooks/whk_abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "My internet is not working"
  }'
```

**Result:**
- Ticket automatically created
- AI classified as "Technical Support" with "High" priority
- Team notified via Slack
- Execution logged in dashboard

---

### 2. **Using Webhooks**

**What are webhooks?**
Webhooks are URLs that receive data from external services (forms, apps, APIs).

**Create a webhook:**
1. Go to **Webhooks** → **Create Webhook**
2. Name: "New Lead Form"
3. Select workflow: "Lead Qualification"
4. Copy the webhook URL

**Connect to your form:**
```html
<!-- Add this to your website form -->
<form action="http://localhost:3001/webhooks/whk_xyz789" method="POST">
  <input type="text" name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Email">
  <input type="text" name="company" placeholder="Company">
  <button type="submit">Submit</button>
</form>
```

**What happens:**
1. User submits form
2. AutoFlow receives data
3. Python scores the lead (0-100)
4. If score ≥ 70: Route to sales team
5. If score < 70: Add to nurture campaign
6. Log everything

---

### 3. **Monitoring Executions**

**View execution history:**
1. Go to **Executions** page
2. See all workflow runs with status:
   - ✅ Success (green)
   - ❌ Failed (red)
   - 🔄 Running (blue)

**Click any execution to see:**
- Input data received
- Each step's output
- Processing time
- Errors (if any)

**Example execution log:**
```
Execution #1234 - Customer Support Bot
Status: ✅ Success
Duration: 2.3 seconds

Step 1: Webhook Trigger ✅ (0.1s)
  Input: { name: "John", email: "john@...", message: "..." }
  
Step 2: Python Validation ✅ (0.3s)
  Output: { valid: true, sanitized: true }
  
Step 3: AI Classification ✅ (1.8s)
  Output: { category: "Technical Support", priority: "High" }
  
Step 4: Database Store ✅ (0.1s)
  Output: { ticket_id: "TKT-4521" }
```

---

### 4. **Connecting Integrations**

**Connect Slack:**
1. Go to **Integrations**
2. Find "Slack" → Click **Connect**
3. Authorize with your Slack workspace
4. Now workflows can send notifications to Slack channels

**Connect OpenAI:**
1. Get API key from https://platform.openai.com
2. Add to `.env` file: `OPENAI_API_KEY=sk-...`
3. Restart backend
4. AI features now work

**Connect n8n:**
1. Access n8n at http://localhost:5678
2. Import workflows from `/n8n/workflows/`
3. Activate them
4. Now you have 300+ app integrations

---

## 🔄 Real-World Workflow Examples

### Example 1: **E-commerce Order Processing**

**Flow:**
```
New Order (Shopify) 
  ↓
AutoFlow Webhook
  ↓
Python: Validate order data
  ↓
AI: Detect fraud risk (0-100)
  ↓
Condition: If risk > 80 → Flag for review
  ↓
Database: Store order
  ↓
Email: Send confirmation to customer
  ↓
Slack: Notify warehouse team
```

**Setup:**
1. Create workflow "Order Processing"
2. Add webhook trigger
3. Configure Shopify to POST to webhook URL
4. Add Python step for validation
5. Add AI step for fraud detection
6. Add condition logic
7. Add email and Slack notifications

---

### Example 2: **Social Media Monitoring**

**Flow:**
```
Twitter Mention (Webhook)
  ↓
Python: Extract text and metadata
  ↓
AI: Analyze sentiment (-1 to +1)
  ↓
AI: Detect intent (complaint/question/praise)
  ↓
Condition: If sentiment < -0.5 → Urgent
  ↓
Database: Log mention
  ↓
Slack: Alert PR team if urgent
  ↓
Email: Send weekly report
```

**Benefits:**
- Catch negative mentions instantly
- Automatic sentiment tracking
- Prioritize response based on severity

---

### Example 3: **Document Processing**

**Flow:**
```
PDF Uploaded (Webhook)
  ↓
Python: Extract text from PDF
  ↓
AI: Identify document type (invoice/contract/report)
  ↓
AI: Extract key fields (date, amount, parties)
  ↓
Validation: Check required fields
  ↓
Database: Store extracted data
  ↓
Notification: Alert document owner
```

**Use cases:**
- Invoice processing
- Contract analysis
- Report summarization
- Form data extraction

---

## 📱 Dashboard Guide

### **Main Dashboard**
- **Total Workflows:** How many workflows you've created
- **Active Workflows:** Currently running workflows
- **Executions Today:** How many times workflows ran today
- **Success Rate:** Percentage of successful executions
- **API Requests:** Total API calls made
- **Webhook Events:** Events received via webhooks

### **Charts**
- **Weekly Executions:** Bar chart showing daily execution counts
- **API Requests:** Area chart showing request volume over time

### **Recent Activity**
- Last 5 workflow executions
- Quick status overview
- Click to view details

---

## 🔧 Configuration Guide

### **Environment Variables (.env)**

```bash
# API Configuration
VITE_API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/autoflow

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key

# AI Service
OPENAI_API_KEY=sk-your-openai-key
AI_PROVIDER=openai

# Webhook Security
WEBHOOK_SECRET=your-webhook-secret

# External Services
PYTHON_SERVICE_URL=http://localhost:8001
PHP_SERVICE_URL=http://localhost:8080
N8N_URL=http://localhost:5678
```

### **Database Setup**

```bash
# Create database
createdb autoflow

# Run migrations
psql autoflow < database/migrations/001_initial_schema.sql

# Verify tables
psql autoflow -c "\dt"
```

---

## 🎓 Advanced Usage

### **Custom Python Processing**

Add custom logic in `python-service/main.py`:

```python
@app.post("/api/custom-analysis")
async def custom_analysis(request: dict):
    # Your custom logic here
    data = request.get('data')
    
    # Example: Calculate custom metric
    score = calculate_metric(data)
    
    return {
        "status": "processed",
        "score": score,
        "recommendation": get_recommendation(score)
    }
```

Then use it in workflows:
1. Add "HTTP Request" step
2. URL: `http://python-service:8001/api/custom-analysis`
3. Method: POST
4. Body: Your data

---

### **Conditional Logic**

**Example:** Route based on lead score

```
IF lead_score >= 80:
  → Route to Enterprise Sales
  → Send high-priority alert
  
ELSE IF lead_score >= 50:
  → Route to SMB Sales
  → Schedule follow-up
  
ELSE:
  → Add to nurture campaign
  → Send educational content
```

**Implementation:**
1. Add "Condition" step
2. Field: `lead_score`
3. Operator: `>=`
4. Value: `80`
5. True path: Enterprise route
6. False path: Check next condition

---

### **Error Handling & Retries**

**Configure retry logic:**
1. In workflow settings, enable "Retry on failure"
2. Set max retries: 3
3. Set delay between retries: 30 seconds
4. Set final action: Send error notification

**Example error flow:**
```
Step fails → Wait 30s → Retry 1
  ↓ (still fails)
Wait 30s → Retry 2
  ↓ (still fails)
Wait 30s → Retry 3
  ↓ (still fails)
Mark as failed → Notify admin
```

---

## 📊 Monitoring & Debugging

### **View Logs**
1. Go to **Executions**
2. Click on any execution
3. See detailed step-by-step logs
4. Check input/output for each step
5. View error messages

### **Common Issues**

**Problem:** Webhook not triggering
- Check webhook URL is correct
- Verify webhook is active
- Check network connectivity
- View webhook event logs

**Problem:** AI not working
- Verify OPENAI_API_KEY is set
- Check API quota/balance
- Review Python service logs
- Test AI endpoint directly

**Problem:** Database errors
- Check DATABASE_URL is correct
- Verify database is running
- Check table permissions
- Review connection pool settings

---

## 🔐 Security Best Practices

1. **Never commit .env files** - Add to .gitignore
2. **Use strong secrets** - Min 32 characters, random
3. **Rotate tokens regularly** - Change JWT secrets monthly
4. **Validate all input** - Use Python validation service
5. **Enable HTTPS** - Use SSL certificates in production
6. **Rate limit endpoints** - Prevent abuse
7. **Monitor audit logs** - Track all actions
8. **Use webhook signatures** - Validate incoming webhooks

---

## 🚀 Production Deployment

### **Deploy to Cloud (AWS/GCP/Azure)**

1. **Set up infrastructure:**
   - PostgreSQL (RDS/Cloud SQL)
   - Redis (ElastiCache/MemoryStore)
   - Container orchestration (ECS/GKE/AKS)

2. **Configure environment:**
   - Set production environment variables
   - Use secrets manager (AWS Secrets Manager)
   - Enable monitoring (CloudWatch/Stackdriver)

3. **Deploy services:**
   - Build Docker images
   - Push to container registry
   - Deploy with load balancer
   - Set up auto-scaling

4. **Set up domain:**
   - Point DNS to load balancer
   - Configure SSL certificate
   - Set up CDN (CloudFront/CloudFlare)

---

## 📞 Getting Help

### **Documentation**
- API Docs: `/api-docs` in dashboard
- Webhook Guide: `docs/WEBHOOKS.md`
- Integration Guides: `docs/MAKE.md`, `docs/ZAPIER.md`

### **Logs**
- Frontend: Browser console
- Backend: `docker logs backend`
- Python: `docker logs python-service`
- Database: `docker logs postgres`

### **Testing**
```bash
# Test API health
curl http://localhost:3001/api/health

# Test Python service
curl http://localhost:8001/api/health

# Test webhook
curl -X POST http://localhost:3001/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## 🎯 Next Steps

1. **Start simple** - Create one basic workflow
2. **Test thoroughly** - Use webhook testing feature
3. **Monitor closely** - Watch executions page
4. **Iterate** - Add more steps and conditions
5. **Scale** - Connect more integrations
6. **Optimize** - Review performance metrics

**Remember:** The system is designed to be flexible. Start with simple automations and gradually add complexity as you become comfortable.

---

## 💡 Pro Tips

1. **Use descriptive names** - "Process Customer Inquiry" not "Workflow 1"
2. **Add descriptions** - Document what each workflow does
3. **Test with real data** - Use actual payloads from your systems
4. **Monitor success rates** - Aim for 95%+ success
5. **Set up alerts** - Get notified on failures
6. **Version control** - Export workflows as JSON for backup
7. **Document integrations** - Keep track of connected services
8. **Regular maintenance** - Review and optimize workflows monthly

---

**You're all set!** Start by creating your first workflow and see the magic happen. The system is designed to be intuitive - explore the dashboard, try different features, and don't hesitate to experiment.
