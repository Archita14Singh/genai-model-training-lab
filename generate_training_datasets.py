import os
import csv

def generate_training_datasets():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)

    # 25 Realistic Corporate Finance & Audit Records
    records = [
        # 1. Compliant routine travel
        {"id": "TXN-1001", "name": "Sarah Jenkins", "dept": "Marketing", "date": "2024-09-02", "merchant": "United Airlines", "category": "Airfare", "amount": 480.00, "limit": 600.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Standard economy flight within corporate travel budget; receipt attached and manager approved."},
        
        # 2. Compliant meal
        {"id": "TXN-1002", "name": "Sarah Jenkins", "dept": "Marketing", "date": "2024-09-03", "merchant": "Bistro Moderne", "category": "Meals & Entertainment", "amount": 65.50, "limit": 100.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Business dinner under the $100 per-head corporate meal limit with itemized receipt."},

        # 3. Policy Breach: Meal cap exceeded
        {"id": "TXN-1003", "name": "Marcus Vance", "dept": "Sales", "date": "2024-09-04", "merchant": "Le Bernardin NYC", "category": "Meals & Entertainment", "amount": 345.00, "limit": 100.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "POLICY_BREACH_MEAL_CAP", "risk": "Medium", "reason": "Single attendee dinner totaling $345.00 exceeds the $100.00 corporate meal ceiling by 245%."},

        # 4. Compliant lodging
        {"id": "TXN-1004", "name": "David Chen", "dept": "Engineering", "date": "2024-09-05", "merchant": "Marriott Downtown", "category": "Lodging", "amount": 220.00, "limit": 250.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Standard hotel room rate within metropolitan lodging threshold with folio attached."},

        # 5. Potential Duplicate (First instance)
        {"id": "TXN-1005", "name": "Marcus Vance", "dept": "Sales", "date": "2024-09-08", "merchant": "Delta Air Lines", "category": "Airfare", "amount": 1248.50, "limit": 1500.00, "receipt": "Yes", "weekend": "No", "approver": "Director",
         "label": "COMPLIANT", "risk": "Low", "reason": "Client pitch flight approved by Director; legitimate business travel segment."},

        # 6. Potential Duplicate (Duplicate of TXN-1005!)
        {"id": "TXN-1006", "name": "Marcus Vance", "dept": "Sales", "date": "2024-09-08", "merchant": "Delta Air Lines", "category": "Airfare", "amount": 1248.50, "limit": 1500.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "POTENTIAL_DUPLICATE", "risk": "High", "reason": "Exact duplicate of TXN-1005 for identical employee, date, vendor, and amount ($1,248.50)."},

        # 7. Structuring / Threshold avoidance (1 of 4)
        {"id": "TXN-1007", "name": "Elena Rostova", "dept": "Operations", "date": "2024-09-10", "merchant": "Corner Cafe Express", "category": "Meals & Entertainment", "amount": 49.50, "limit": 50.00, "receipt": "No", "weekend": "No", "approver": "Self",
         "label": "STRUCTURING_THRESHOLD", "risk": "Medium", "reason": "Part of repeated pattern claiming just under $50 receiptless threshold with missing receipts."},

        # 8. Structuring / Threshold avoidance (2 of 4)
        {"id": "TXN-1008", "name": "Elena Rostova", "dept": "Operations", "date": "2024-09-11", "merchant": "Corner Cafe Express", "category": "Meals & Entertainment", "amount": 49.00, "limit": 50.00, "receipt": "No", "weekend": "No", "approver": "Self",
         "label": "STRUCTURING_THRESHOLD", "risk": "Medium", "reason": "Consecutive transaction under $50 limit without receipt; indicates intentional threshold structuring."},

        # 9. Structuring / Threshold avoidance (3 of 4)
        {"id": "TXN-1009", "name": "Elena Rostova", "dept": "Operations", "date": "2024-09-12", "merchant": "Corner Cafe Express", "category": "Meals & Entertainment", "amount": 48.75, "limit": 50.00, "receipt": "No", "weekend": "No", "approver": "Self",
         "label": "STRUCTURING_THRESHOLD", "risk": "Medium", "reason": "Third consecutive day below receipt verification boundary without business attendee documentation."},

        # 10. Compliant software license
        {"id": "TXN-1010", "name": "David Chen", "dept": "Engineering", "date": "2024-09-14", "merchant": "GitHub Enterprise", "category": "Software Subscriptions", "amount": 250.00, "limit": 500.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Budgeted monthly engineering tool subscription with digital VAT invoice attached."},

        # 11. Unapproved weekend resort spend
        {"id": "TXN-1011", "name": "Robert Sterling", "dept": "Executive", "date": "2024-09-15", "merchant": "Ritz-Carlton South Beach", "category": "Lodging", "amount": 1890.00, "limit": 500.00, "receipt": "Yes", "weekend": "Yes", "approver": "Self",
         "label": "UNAPPROVED_WEEKEND_SPEND", "risk": "Critical", "reason": "Luxury resort stay on Saturday/Sunday self-approved without verified client agenda; exceeds lodging cap by $1,390."},

        # 12. Missing documentation on high-value hardware
        {"id": "TXN-1012", "name": "Claire Dubois", "dept": "Finance", "date": "2024-09-16", "merchant": "Apple Store Retail", "category": "Office Hardware", "amount": 2899.00, "limit": 1000.00, "receipt": "No", "weekend": "No", "approver": "Manager",
         "label": "MISSING_DOCUMENTATION", "risk": "High", "reason": "Capital equipment purchase exceeding $1,000 threshold lacks mandatory itemized store receipt and asset tag registration."},

        # 13. Compliant ground transport
        {"id": "TXN-1013", "name": "Sarah Jenkins", "dept": "Marketing", "date": "2024-09-18", "merchant": "Uber Technologies", "category": "Ground Transport", "amount": 42.50, "limit": 75.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Airport transit ride within allowable local mileage policy with e-receipt."},

        # 14. Policy Breach: Meal cap exceeded
        {"id": "TXN-1014", "name": "Marcus Vance", "dept": "Sales", "date": "2024-09-19", "merchant": "Prime 112 Steakhouse", "category": "Meals & Entertainment", "amount": 280.00, "limit": 100.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "POLICY_BREACH_MEAL_CAP", "risk": "Medium", "reason": "Client dinner claimed as solo expense exceeding $100 cap; requires attendee list for reimbursement adjustment."},

        # 15. Compliant office supplies
        {"id": "TXN-1015", "name": "Claire Dubois", "dept": "Finance", "date": "2024-09-20", "merchant": "Office Depot", "category": "Office Hardware", "amount": 145.20, "limit": 250.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Routine quarter-end audit binders and supplies within department expense allowance."},

        # 16. Compliant airfare
        {"id": "TXN-1016", "name": "David Chen", "dept": "Engineering", "date": "2024-09-22", "merchant": "Alaska Airlines", "category": "Airfare", "amount": 380.00, "limit": 600.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Domestic flight to Seattle technical conference booked 21 days in advance."},

        # 17. Unapproved weekend luxury dining
        {"id": "TXN-1017", "name": "Robert Sterling", "dept": "Executive", "date": "2024-09-22", "merchant": "Nobu Miami", "category": "Meals & Entertainment", "amount": 820.00, "limit": 100.00, "receipt": "Yes", "weekend": "Yes", "approver": "Self",
         "label": "UNAPPROVED_WEEKEND_SPEND", "risk": "Critical", "reason": "Sunday night luxury dining without client attendees or board pre-approval; self-authorized by executive."},

        # 18. Potential Duplicate (First instance)
        {"id": "TXN-1018", "name": "Claire Dubois", "dept": "Finance", "date": "2024-09-24", "merchant": "KPMG Training Institute", "category": "Software Subscriptions", "amount": 950.00, "limit": 1000.00, "receipt": "Yes", "weekend": "No", "approver": "Director",
         "label": "COMPLIANT", "risk": "Low", "reason": "Annual CPE accounting seminar approved under professional development curriculum."},

        # 19. Potential Duplicate (Duplicate of TXN-1018!)
        {"id": "TXN-1019", "name": "Claire Dubois", "dept": "Finance", "date": "2024-09-25", "merchant": "KPMG Training Institute", "category": "Software Subscriptions", "amount": 950.00, "limit": 1000.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "POTENTIAL_DUPLICATE", "risk": "High", "reason": "Matches TXN-1018 on vendor, amount ($950.00), and identical seminar enrollment code."},

        # 20. Structuring / Threshold avoidance (4 of 4)
        {"id": "TXN-1020", "name": "Elena Rostova", "dept": "Operations", "date": "2024-09-26", "merchant": "Corner Cafe Express", "category": "Meals & Entertainment", "amount": 49.80, "limit": 50.00, "receipt": "No", "weekend": "No", "approver": "Self",
         "label": "STRUCTURING_THRESHOLD", "risk": "Medium", "reason": "Fourth consecutive under-$50 claim; violates internal receipt aggregation policy."},

        # 21. Compliant lodging
        {"id": "TXN-1021", "name": "Sarah Jenkins", "dept": "Marketing", "date": "2024-09-27", "merchant": "Hilton Austin", "category": "Lodging", "amount": 195.00, "limit": 250.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Standard business room rate for marketing trade show attendance with itemized folio."},

        # 22. Missing documentation on high-value software
        {"id": "TXN-1022", "name": "David Chen", "dept": "Engineering", "date": "2024-09-28", "merchant": "AWS Cloud Services", "category": "Software Subscriptions", "amount": 4200.00, "limit": 1000.00, "receipt": "No", "weekend": "No", "approver": "Manager",
         "label": "MISSING_DOCUMENTATION", "risk": "High", "reason": "Server usage invoice exceeding departmental threshold submitted without attached usage breakdown or PO reference."},

        # 23. Compliant meals
        {"id": "TXN-1023", "name": "Elena Rostova", "dept": "Operations", "date": "2024-09-29", "merchant": "Panera Bread", "category": "Meals & Entertainment", "amount": 28.50, "limit": 100.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Working lunch during facility inspection within per-diem limit with receipt."},

        # 24. Compliant ground transport
        {"id": "TXN-1024", "name": "Marcus Vance", "dept": "Sales", "date": "2024-09-30", "merchant": "Yellow Cab Co", "category": "Ground Transport", "amount": 35.00, "limit": 75.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "COMPLIANT", "risk": "Low", "reason": "Standard city taxi fare from client office to airport with printed receipt."},

        # 25. Policy breach: Meal cap exceeded
        {"id": "TXN-1025", "name": "Sarah Jenkins", "dept": "Marketing", "date": "2024-09-30", "merchant": "The Palm Restaurant", "category": "Meals & Entertainment", "amount": 185.00, "limit": 100.00, "receipt": "Yes", "weekend": "No", "approver": "Manager",
         "label": "POLICY_BREACH_MEAL_CAP", "risk": "Medium", "reason": "Dinner for one employee exceeding $100 cap without documentation of accompanying clients."}
    ]

    # 1. Supervised Dataset (With Target Labels & Explanations)
    supervised_path = os.path.join(data_dir, "supervised_finance_audit_training_dataset.csv")
    supervised_headers = [
        "Transaction_ID", "Employee_Name", "Department", "Transaction_Date",
        "Merchant", "Expense_Category", "Amount", "Policy_Limit", "Receipt_Attached",
        "Weekend_Transaction", "Approval_Level", "Audit_Classification", "Risk_Rating", "Audit_Reasoning"
    ]
    with open(supervised_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(supervised_headers)
        for r in records:
            writer.writerow([
                r["id"], r["name"], r["dept"], r["date"],
                r["merchant"], r["category"], f"{r['amount']:.2f}", f"{r['limit']:.2f}",
                r["receipt"], r["weekend"], r["approver"],
                r["label"], r["risk"], r["reason"]
            ])
    print(f"Generated Supervised Dataset: {supervised_path} ({len(records)} rows)")

    # 2. Unsupervised Dataset (Raw Unlabeled Data for Discovery & Testing)
    unsupervised_path = os.path.join(data_dir, "unsupervised_finance_audit_raw_dataset.csv")
    unsupervised_headers = [
        "Transaction_ID", "Employee_Name", "Department", "Transaction_Date",
        "Merchant", "Expense_Category", "Amount", "Policy_Limit", "Receipt_Attached",
        "Weekend_Transaction", "Approval_Level"
    ]
    with open(unsupervised_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(unsupervised_headers)
        for r in records:
            writer.writerow([
                r["id"], r["name"], r["dept"], r["date"],
                r["merchant"], r["category"], f"{r['amount']:.2f}", f"{r['limit']:.2f}",
                r["receipt"], r["weekend"], r["approver"]
            ])
    print(f"Generated Unsupervised Dataset: {unsupervised_path} ({len(records)} rows)")

if __name__ == "__main__":
    generate_training_datasets()
