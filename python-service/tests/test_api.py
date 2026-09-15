"""
Tests for AutoFlow AI Python Service
"""
import pytest
from httpx import AsyncClient
from main import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_health_check(client):
    response = await client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "python-service"

@pytest.mark.asyncio
async def test_process_valid_data(client):
    response = await client.post("/api/process", json={
        "data": {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "I need help"
        }
    })
    assert response.status_code == 200
    data = response.json()
    assert data["valid"] == True
    assert data["data"]["email"] == "john@example.com"

@pytest.mark.asyncio
async def test_process_invalid_email(client):
    response = await client.post("/api/process", json={
        "data": {
            "name": "John",
            "email": "invalid-email",
            "message": "Test"
        }
    })
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_process_missing_fields(client):
    response = await client.post("/api/process", json={
        "data": {
            "name": "John"
        }
    })
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_classify_technical_support(client):
    response = await client.post("/api/classify", json={
        "text": "My internet connection is not working and I keep getting errors"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"]["category"] == "Technical Support"
    assert data["result"]["priority"] == "high"
    assert data["result"]["sentiment"] == "negative"

@pytest.mark.asyncio
async def test_classify_billing(client):
    response = await client.post("/api/classify", json={
        "text": "I have a question about my invoice and billing"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"]["category"] == "Billing"

@pytest.mark.asyncio
async def test_classify_sales(client):
    response = await client.post("/api/classify", json={
        "text": "I want to buy your enterprise plan, can I get a demo?"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"]["category"] == "Sales Inquiry"

@pytest.mark.asyncio
async def test_lead_scoring_enterprise(client):
    response = await client.post("/api/score", json={
        "lead_data": {
            "company": "Acme Corp",
            "industry": "technology",
            "company_size": "enterprise",
            "budget": "$100k",
            "urgency": "immediate"
        }
    })
    assert response.status_code == 200
    data = response.json()
    assert data["score"] >= 70
    assert data["tier"] == "enterprise"

@pytest.mark.asyncio
async def test_lead_scoring_small(client):
    response = await client.post("/api/score", json={
        "lead_data": {
            "company": "Small Biz",
            "industry": "retail",
            "company_size": "small",
            "budget": "$5k",
            "urgency": "normal"
        }
    })
    assert response.status_code == 200
    data = response.json()
    assert data["score"] < 40
    assert data["tier"] == "smb"

@pytest.mark.asyncio
async def test_sentiment_positive(client):
    response = await client.post("/api/sentiment", json={
        "text": "I love your product, it's amazing and great!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"]["sentiment"] == "positive"

@pytest.mark.asyncio
async def test_sentiment_negative(client):
    response = await client.post("/api/sentiment", json={
        "text": "This is terrible, I hate it, everything is broken"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"]["sentiment"] == "negative"

@pytest.mark.asyncio
async def test_transform_normalize(client):
    response = await client.post("/api/transform", json={
        "data": {
            "Name": "  John Doe  ",
            "Email": "JOHN@EXAMPLE.COM",
            "count": 42
        },
        "transformation": "normalize"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["name"] == "john doe"
    assert data["data"]["email"] == "john@example.com"
    assert data["data"]["count"] == 42

@pytest.mark.asyncio
async def test_transform_extract_emails(client):
    response = await client.post("/api/transform", json={
        "data": {
            "text": "Contact us at support@example.com or sales@company.org"
        },
        "transformation": "extract_emails"
    })
    assert response.status_code == 200
    data = response.json()
    assert "support@example.com" in data["emails"]
    assert "sales@company.org" in data["emails"]
