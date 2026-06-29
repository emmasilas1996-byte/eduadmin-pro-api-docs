# Fees & Payments

The Fees API handles fee creation, tracking, and payment recording across all fee categories.
It is the integration point for payment gateways, receipt generation, and financial reporting.

All fee IDs follow the format `FEE-{YEAR}-{SEQUENCE}` (e.g., `FEE-2024-00088`).

---

## List Fee Records

Returns fee records with optional filters. Use this to build payment dashboards or identify
outstanding balances.

```
GET /fees
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `student_id` | string | Filter by student |
| `status` | string | One of: `pending`, `paid`, `overdue`, `waived` |
| `fee_type` | string | One of: `tuition`, `exam`, `uniform`, `library`, `other` |
| `page` | integer | Page number (default: `1`) |
| `per_page` | integer | Results per page (default: `20`) |

### Example request

```bash
curl -X GET "https://api.eduadminpro.com/v1/fees?status=overdue" \
  -H "Authorization: Bearer <your_token>"
```

### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "FEE-2024-00088",
      "student_id": "STU-2024-00042",
      "fee_type": "tuition",
      "amount": 45000.00,
      "due_date": "2024-10-01",
      "status": "overdue",
      "paid_at": null
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 12,
    "total_pages": 1
  }
}
```

---

## Create a Fee Record

Assigns a fee to a student. Fees are created with a `pending` status by default.

```
POST /fees
```

### Request body

```json
{
  "student_id": "STU-2024-00042",
  "fee_type": "tuition",
  "amount": 45000.00,
  "due_date": "2024-10-01"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `student_id` | string | Yes | Must reference an existing, active student |
| `fee_type` | string | Yes | One of: `tuition`, `exam`, `uniform`, `library`, `other` |
| `amount` | number | Yes | Amount in NGN |
| `due_date` | string | Yes | ISO 8601 date |

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "FEE-2024-00089",
    "student_id": "STU-2024-00042",
    "fee_type": "tuition",
    "amount": 45000.00,
    "due_date": "2024-10-01",
    "status": "pending",
    "paid_at": null
  }
}
```

---

## Record a Payment

Marks a fee record as paid. This is the endpoint to call after receiving payment confirmation
from your payment gateway (e.g., Paystack, Flutterwave).

```
POST /fees/{id}/pay
```

### Request body

```json
{
  "payment_method": "bank_transfer",
  "amount_paid": 45000.00,
  "reference": "PSK-TXN-20241001-00234"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `payment_method` | string | Yes | One of: `cash`, `bank_transfer`, `card`, `mobile_money` |
| `amount_paid` | number | Yes | Must match or exceed the fee amount |
| `reference` | string | No | Payment gateway reference or receipt number |

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "FEE-2024-00088",
    "student_id": "STU-2024-00042",
    "fee_type": "tuition",
    "amount": 45000.00,
    "status": "paid",
    "paid_at": "2024-10-01T14:22:10Z",
    "payment_method": "bank_transfer",
    "reference": "PSK-TXN-20241001-00234"
  },
  "message": "Payment recorded successfully"
}
```

### Error: Already paid `422`

```json
{
  "success": false,
  "message": "This fee has already been marked as paid"
}
```

---

## Integration Notes

### Paystack webhook flow

A typical payment flow with Paystack looks like this:

1. Your frontend initialises a Paystack transaction and passes the `fee_id` as metadata.
2. Paystack redirects to your callback URL on success.
3. Your server verifies the transaction with Paystack's Verify API.
4. On successful verification, call `POST /fees/{id}/pay` with the Paystack reference.

```javascript
// Example: recording payment after Paystack verification
const response = await fetch(`/v1/fees/${feeId}/pay`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    payment_method: 'card',
    amount_paid: amountInNaira,
    reference: paystackReference
  })
});
```
