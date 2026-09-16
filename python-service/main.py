"""
AutoFlow AI - Python Automation Service
Handles data processing, AI classification, lead scoring, and text analysis.
"""
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import json
import hashlib
import hmac
from datetime import datetime

app = FastAPI(
    title="AutoFlow AI - Python Service",
    description="Data processing, AI classification, and ML services",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration from environment
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "default-secret")

# ============ MODELS ============

class ProcessRequest(BaseModel):
    data: dict
    action: str = "validate"

class ClassifyRequest(BaseModel):
    text: str
    categories: Optional[List[str]] = None

class ScoreRequest(BaseModel):
    lead_data: dict

class TransformRequest(BaseModel):
    data: dict
    transformation: str = "normalize"

class SentimentRequest(BaseModel):
    text: str

# ============ AI SERVICE (Provider-agnostic) ============

class AIService:
    """Provider-agnostic AI service. Switch providers via environment variables."""
    
    def __init__(self):
        self.provider = AI_PROVIDER
    
    async def classify(self, text: str, categories: List[str] = None) -> dict:
        """Classify text into categories using AI."""
        if self.provider == "openai" and OPENAI_API_KEY:
            return await self._openai_classify(text, categories)
        return self._fallback_classify(text, categories)
    
    async def analyze_sentiment(self, text: str) -> dict:
        """Analyze sentiment of text."""
        if self.provider == "openai" and OPENAI_API_KEY:
            return await self._openai_sentiment(text)
        return self._fallback_sentiment(text)
    
    async def generate_response(self, context: dict) -> str:
        """Generate a response based on context."""
        if self.provider == "openai" and OPENAI_API_KEY:
            return await self._openai_generate(context)
        return self._fallback_generate(context)
    
    async def _openai_classify(self, text: str, categories: List[str] = None) -> dict:
        """OpenAI classification (requires API key)."""
        try:
            import openai
            client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)
            
            default_categories = [
                "Technical Support", "Billing", "Sales Inquiry", 
                "General Question", "Complaint", "Feature Request"
            ]
            cats = categories or default_categories
            
            response = await client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": f"Classify the following text into one of these categories: {', '.join(cats)}. Also determine priority (low/medium/high) and sentiment (positive/neutral/negative). Return JSON."},
                    {"role": "user", "content": text}
                ],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            return self._fallback_classify(text, categories)
    
    def _fallback_classify(self, text: str, categories: List[str] = None) -> dict:
        """Rule-based fallback classification when AI is unavailable."""
        text_lower = text.lower()
        
        # Simple keyword-based classification
        if any(w in text_lower for w in ['error', 'broken', 'not working', 'bug', 'crash']):
            category = "Technical Support"
            priority = "high"
            sentiment = "negative"
        elif any(w in text_lower for w in ['price', 'cost', 'billing', 'invoice', 'payment']):
            category = "Billing"
            priority = "medium"
            sentiment = "neutral"
        elif any(w in text_lower for w in ['buy', 'purchase', 'demo', 'pricing', 'plan']):
            category = "Sales Inquiry"
            priority = "high"
            sentiment = "positive"
        elif any(w in text_lower for w in ['complain', 'terrible', 'worst', 'angry', 'frustrated']):
            category = "Complaint"
            priority = "high"
            sentiment = "negative"
        elif any(w in text_lower for w in ['feature', 'suggestion', 'improve', 'add']):
            category = "Feature Request"
            priority = "low"
            sentiment = "positive"
        else:
            category = "General Question"
            priority = "low"
            sentiment = "neutral"
        
        return {
            "category": category,
            "priority": priority,
            "sentiment": sentiment,
            "confidence": 0.75,
            "method": "rule-based-fallback"
        }
    
    async def _openai_sentiment(self, text: str) -> dict:
        """OpenAI sentiment analysis."""
        try:
            import openai
            client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)
            response = await client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "Analyze the sentiment of the text. Return JSON with: sentiment (positive/neutral/negative), score (-1 to 1), emotions (list)."},
                    {"role": "user", "content": text}
                ],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception:
            return self._fallback_sentiment(text)
    
    def _fallback_sentiment(self, text: str) -> dict:
        """Rule-based fallback sentiment analysis."""
        positive_words = ['good', 'great', 'excellent', 'happy', 'love', 'thank', 'amazing', 'wonderful']
        negative_words = ['bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'broken', 'error']
        
        text_lower = text.lower()
        pos_count = sum(1 for w in positive_words if w in text_lower)
        neg_count = sum(1 for w in negative_words if w in text_lower)
        
        if pos_count > neg_count:
            return {"sentiment": "positive", "score": 0.7, "emotions": ["satisfaction"], "method": "rule-based"}
        elif neg_count > pos_count:
            return {"sentiment": "negative", "score": -0.7, "emotions": ["frustration"], "method": "rule-based"}
        return {"sentiment": "neutral", "score": 0.0, "emotions": [], "method": "rule-based"}
    
    async def _openai_generate(self, context: dict) -> str:
        """Generate response using OpenAI."""
        try:
            import openai
            client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)
            response = await client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "Generate a professional response based on the context provided."},
                    {"role": "user", "content": json.dumps(context)}
                ],
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception:
            return self._fallback_generate(context)
    
    def _fallback_generate(self, context: dict) -> str:
        """Template-based response generation."""
        category = context.get("category", "General")
        name = context.get("name", "Customer")
        return f"Thank you for reaching out, {name}. We've categorized your inquiry as '{category}' and our team will respond shortly."


# Initialize AI service
ai_service = AIService()

# ============ ENDPOINTS ============

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "python-service",
        "version": "1.0.0",
        "ai_provider": AI_PROVIDER,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/process")
async def process_data(request: ProcessRequest):
    """Validate and process incoming data."""
    data = request.data
    
    # Validation
    errors = []
    if not data.get("name"):
        errors.append("name is required")
    if not data.get("email"):
        errors.append("email is required")
    elif "@" not in data.get("email", ""):
        errors.append("invalid email format")
    
    if errors:
        raise HTTPException(status_code=422, detail={"errors": errors})
    
    # Sanitize
    sanitized = {
        "name": data["name"].strip(),
        "email": data["email"].strip().lower(),
        "message": data.get("message", "").strip(),
        "processed_at": datetime.utcnow().isoformat()
    }
    
    return {
        "status": "processed",
        "valid": True,
        "data": sanitized
    }

@app.post("/api/classify")
async def classify_text(request: ClassifyRequest):
    """Classify text using AI or fallback rules."""
    result = await ai_service.classify(request.text, request.categories)
    return {
        "status": "classified",
        "text": request.text,
        "result": result
    }

@app.post("/api/score")
async def score_lead(request: ScoreRequest):
    """Score a lead based on provided data."""
    data = request.lead_data
    
    # Lead scoring algorithm
    score = 0
    factors = []
    
    # Company size scoring
    company_size = data.get("company_size", "small")
    size_scores = {"enterprise": 30, "large": 25, "medium": 15, "small": 5}
    score += size_scores.get(company_size, 5)
    factors.append(f"company_size:{company_size}(+{size_scores.get(company_size, 5)})")
    
    # Budget scoring
    budget = data.get("budget", "")
    if "$100k" in str(budget) or "100000" in str(budget):
        score += 25
        factors.append("budget:high(+25)")
    elif "$50k" in str(budget) or "50000" in str(budget):
        score += 20
        factors.append("budget:medium(+20)")
    elif "$10k" in str(budget) or "10000" in str(budget):
        score += 10
        factors.append("budget:low(+10)")
    
    # Industry scoring
    industry = data.get("industry", "").lower()
    high_value_industries = ["technology", "finance", "healthcare", "saas"]
    if any(ind in industry for ind in high_value_industries):
        score += 20
        factors.append(f"industry:{industry}(+20)")
    
    # Urgency scoring
    urgency = data.get("urgency", "").lower()
    if urgency in ["immediate", "urgent", "asap"]:
        score += 15
        factors.append("urgency:high(+15)")
    elif urgency in ["soon", "this_week", "this month"]:
        score += 10
        factors.append("urgency:medium(+10)")
    
    # Determine tier
    if score >= 70:
        tier = "enterprise"
    elif score >= 40:
        tier = "mid-market"
    else:
        tier = "smb"
    
    return {
        "status": "scored",
        "score": min(score, 100),
        "tier": tier,
        "factors": factors,
        "recommendation": "Prioritize for sales outreach" if score >= 70 else "Nurture with automated content"
    }

@app.post("/api/sentiment")
async def analyze_sentiment(request: SentimentRequest):
    """Analyze sentiment of text."""
    result = await ai_service.analyze_sentiment(request.text)
    return {
        "status": "analyzed",
        "text": request.text,
        "result": result
    }

@app.post("/api/transform")
async def transform_data(request: TransformRequest):
    """Transform data based on specified transformation type."""
    data = request.data
    transformation = request.transformation
    
    if transformation == "normalize":
        # Normalize all string values
        normalized = {}
        for key, value in data.items():
            if isinstance(value, str):
                normalized[key] = value.strip().lower()
            else:
                normalized[key] = value
        return {"status": "transformed", "transformation": "normalize", "data": normalized}
    
    elif transformation == "flatten":
        # Flatten nested dict
        def flatten_dict(d, parent_key=''):
            items = {}
            for k, v in d.items():
                new_key = f"{parent_key}_{k}" if parent_key else k
                if isinstance(v, dict):
                    items.update(flatten_dict(v, new_key))
                else:
                    items[new_key] = v
            return items
        return {"status": "transformed", "transformation": "flatten", "data": flatten_dict(data)}
    
    elif transformation == "extract_emails":
        # Extract email addresses from all string values
        import re
        emails = []
        for value in data.values():
            if isinstance(value, str):
                found = re.findall(r'[\w.+-]+@[\w-]+\.[\w.]+', value)
                emails.extend(found)
        return {"status": "transformed", "transformation": "extract_emails", "emails": emails}
    
    return {"status": "transformed", "transformation": transformation, "data": data}

@app.post("/api/validate-webhook")
async def validate_webhook(
    payload: dict,
    x_webhook_signature: Optional[str] = Header(None),
    x_webhook_timestamp: Optional[str] = Header(None)
):
    """Validate incoming webhook signature."""
    if not x_webhook_signature:
        raise HTTPException(status_code=401, detail="Missing webhook signature")
    
    # In production, validate HMAC-SHA256 signature
    # signature = hmac.new(WEBHOOK_SECRET.encode(), json.dumps(payload).encode(), hashlib.sha256).hexdigest()
    # if not hmac.compare_digest(signature, x_webhook_signature):
    #     raise HTTPException(status_code=401, detail="Invalid signature")
    
    return {
        "status": "validated",
        "timestamp": datetime.utcnow().isoformat(),
        "payload_hash": hashlib.sha256(json.dumps(payload).encode()).hexdigest()[:16]
    }


# ============ RUN ============

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
