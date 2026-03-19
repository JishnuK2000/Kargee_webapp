# Backend API Documentation

This document outlines the backend API structure needed for the Kargee eCommerce platform.

## OTP Authentication System

### 1. Send OTP Endpoint

**Endpoint:** `POST /api/auth/send-otp`

**Request Body:**
```json
{
  "phone": "9876543210"
}
```

**Backend Logic (Node.js/Express Example):**
```javascript
const crypto = require('crypto');

async function sendOTP(req, res) {
  const { phone } = req.body;
  
  // Validate phone number
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }
  
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  
  // Set expiry time (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
  // Store in database
  await db.otps.create({
    phone,
    otp,
    expiresAt,
    attempts: 0,
    verified: false
  });
  
  // Send OTP via SMS (using Twilio, MSG91, or similar)
  await smsService.send({
    to: `+91${phone}`,
    message: `Your Kargee OTP is: ${otp}. Valid for 5 minutes.`
  });
  
  return res.json({ 
    success: true, 
    message: 'OTP sent successfully',
    expiresIn: 300 // seconds
  });
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresIn": 300
}
```

---

### 2. Verify OTP Endpoint

**Endpoint:** `POST /api/auth/verify-otp`

**Request Body:**
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Backend Logic:**
```javascript
const jwt = require('jsonwebtoken');

async function verifyOTP(req, res) {
  const { phone, otp } = req.body;
  
  // Find OTP record
  const otpRecord = await db.otps.findOne({
    where: { phone, verified: false },
    order: [['createdAt', 'DESC']]
  });
  
  if (!otpRecord) {
    return res.status(404).json({ error: 'OTP not found or already used' });
  }
  
  // Check expiry
  if (new Date() > otpRecord.expiresAt) {
    return res.status(400).json({ error: 'OTP has expired' });
  }
  
  // Check max attempts (prevent brute force)
  if (otpRecord.attempts >= 3) {
    return res.status(429).json({ error: 'Too many attempts. Please request a new OTP' });
  }
  
  // Verify OTP
  if (otpRecord.otp !== otp) {
    await db.otps.update(
      { attempts: otpRecord.attempts + 1 },
      { where: { id: otpRecord.id } }
    );
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  
  // Mark as verified
  await db.otps.update(
    { verified: true },
    { where: { id: otpRecord.id } }
  );
  
  // Find or create user
  let user = await db.users.findOne({ where: { phone } });
  if (!user) {
    user = await db.users.create({ phone });
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, phone: user.phone },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  
  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      phone: user.phone,
      name: user.name
    }
  });
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "phone": "9876543210",
    "name": "Customer Name"
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid OTP"
}
```

---

## Database Schema

### OTPs Table
```sql
CREATE TABLE otps (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(10) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  attempts INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_expires_at (expires_at)
);
```

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Security Best Practices

1. **Rate Limiting**: Implement rate limiting to prevent spam
   - Max 3 OTP requests per phone per 15 minutes
   - Max 3 verification attempts per OTP

2. **OTP Expiry**: Always set expiry (recommended: 5 minutes)

3. **HTTPS Only**: Always use HTTPS in production

4. **JWT Security**:
   - Use strong secret key
   - Set appropriate expiry times
   - Store securely on client (httpOnly cookies preferred)

5. **Phone Validation**: Validate phone numbers on both frontend and backend

6. **SMS Provider**: Use reliable SMS gateway (Twilio, MSG91, AWS SNS)

---

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=kargee_db
DB_USER=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRY=30d

# SMS Service (Example: Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Or MSG91
MSG91_AUTH_KEY=your-msg91-key
MSG91_SENDER_ID=KARGEE
```

---

## Frontend Integration

The frontend (`OTPLogin.tsx`) should call these endpoints:

```typescript
// Send OTP
const response = await fetch('/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone })
});

// Verify OTP
const response = await fetch('/api/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone, otp })
});

// Store token
const { token, user } = await response.json();
localStorage.setItem('authToken', token);
localStorage.setItem('user', JSON.stringify(user));
```

---

## Testing

Use these test credentials in development:

- Test Phone: `9999999999`
- Test OTP: `123456` (bypass in dev mode)

---

For production deployment, ensure:
- SSL certificate installed
- Environment variables properly set
- Database backups enabled
- Monitoring and logging configured
